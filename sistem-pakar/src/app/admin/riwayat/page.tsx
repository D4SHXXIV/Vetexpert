export const dynamic = 'force-dynamic';

import { PrismaClient } from "@prisma/client";
import RiwayatClient from "./RiwayatClient";

const prisma = new PrismaClient();

export default async function RiwayatPage() {
  const riwayatData = await prisma.konsultasi.findMany({
    orderBy: {
      tanggal: 'desc'
    }
  });

  const formattedRiwayat = riwayatData.map(r => ({
    id: r.id,
    nama_pemilik: r.nama_pemilik,
    nama_hewan: r.nama_hewan,
    jenis_hewan: r.jenis_hewan,
    hasil_diagnosa: r.hasil_diagnosa,
    cf_hasil: r.cf_hasil,
    persentase: r.cf_hasil * 100,
    tanggal: r.tanggal.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  }));

  return <RiwayatClient initialData={formattedRiwayat} />;
}
