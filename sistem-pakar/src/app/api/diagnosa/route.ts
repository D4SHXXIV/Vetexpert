import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formData, selectedSymptoms } = body;

    // selectedSymptoms is an object: { [gejalaId]: cf_user }
    const symptomIds = Object.keys(selectedSymptoms).map(Number);

    if (symptomIds.length === 0) {
      return NextResponse.json(
        { error: 'Pilih minimal satu gejala' },
        { status: 400 }
      );
    }

    // Ambil rule_cf yang sesuai dengan gejala yang dipilih, beserta data penyakitnya
    // Hanya filter penyakit yang sesuai dengan jenis hewan yang dipilih
    const rules = await prisma.ruleCF.findMany({
      where: {
        gejala_id: { in: symptomIds },
        penyakit: { jenis_hewan: formData.jenisHewan },
      },
      include: {
        penyakit: true,
      },
    });

    // Struktur untuk menyimpan perhitungan CF per penyakit
    const cfPerPenyakit: Record<number, { penyakit: any; cf_combine: number }> = {};

    for (const rule of rules) {
      const penyakitId = rule.penyakit_id;
      const cfPakar = rule.cf_pakar;
      const cfUser = selectedSymptoms[rule.gejala_id];

      // CF(H, E) = CF Pakar * CF User
      const cfHE = cfPakar * cfUser;

      if (!cfPerPenyakit[penyakitId]) {
        cfPerPenyakit[penyakitId] = {
          penyakit: rule.penyakit,
          cf_combine: cfHE, // Gejala pertama
        };
      } else {
        // Kombinasi gejala berikutnya
        const cfOld = cfPerPenyakit[penyakitId].cf_combine;
        cfPerPenyakit[penyakitId].cf_combine = cfOld + cfHE * (1 - cfOld);
      }
    }

    // Ubah ke array dan urutkan berdasarkan cf_combine tertinggi
    const hasilDiagnosis = Object.values(cfPerPenyakit)
      .map((item) => ({
        ...item.penyakit,
        persentase: (item.cf_combine * 100).toFixed(2),
        cf_hasil: item.cf_combine,
      }))
      .sort((a, b) => b.cf_hasil - a.cf_hasil);

    let penyakitUtama = null;

    if (hasilDiagnosis.length > 0) {
      penyakitUtama = hasilDiagnosis[0];
    } else {
      // Jika tidak ada rule yang cocok
      return NextResponse.json({
        hasil: null,
        message: 'Tidak dapat mendiagnosa penyakit berdasarkan gejala tersebut.',
      });
    }

    // Simpan riwayat ke database (sesuai schema yang ada)
    const konsultasi = await prisma.konsultasi.create({
      data: {
        nama_pemilik: formData.namaPemilik,
        nama_hewan: formData.namaHewan,
        usia_hewan: formData.usiaHewan,
        jenis_hewan: formData.jenisHewan,
        hasil_diagnosa: penyakitUtama.nama_penyakit,
        cf_hasil: penyakitUtama.cf_hasil,
        detail_konsultasi: {
          create: symptomIds.map((id) => ({
            gejala_id: id,
            cf_user: selectedSymptoms[id],
          })),
        },
      },
    });

    return NextResponse.json({
      hasil: penyakitUtama,
      semua_hasil: hasilDiagnosis,
      konsultasi_id: konsultasi.id,
    });
  } catch (error) {
    console.error('Error saat diagnosa:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
