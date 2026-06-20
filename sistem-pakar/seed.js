const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('Mulai proses seeding data dari Data.md...');
  
  // Baca file Data.md
  const dataPath = path.join(__dirname, '..', 'Data.md');
  const markdown = fs.readFileSync(dataPath, 'utf-8');

  // Bersihkan data lama (Hati-hati: ini akan menghapus data yang ada!)
  console.log('Menghapus data lama...');
  await prisma.ruleCF.deleteMany({});
  await prisma.detailKonsultasi.deleteMany({});
  await prisma.konsultasi.deleteMany({});
  await prisma.gejala.deleteMany({});
  await prisma.penyakit.deleteMany({});

  // 1. Parsing Penyakit
  const penyakitMatches = [...markdown.matchAll(/\|\s*(P\d{3})\s*\|\s*([^\|]+?)\s*\|\s*(Kucing|Anjing)\s*\|/gi)];
  const penyakitMap = {}; // Untuk menyimpan ID berdasarkan kode_penyakit

  console.log(`Menyimpan ${penyakitMatches.length} data Penyakit...`);
  for (const match of penyakitMatches) {
    const kode = match[1].trim();
    const nama = match[2].trim();
    const hewan = match[3].trim().toUpperCase();

    const p = await prisma.penyakit.create({
      data: {
        kode_penyakit: kode,
        nama_penyakit: nama,
        jenis_hewan: hewan,
        deskripsi: `Deskripsi untuk ${nama}`,
        solusi: `Solusi untuk ${nama}`,
      }
    });
    penyakitMap[kode] = p.id;
    penyakitMap[nama.toLowerCase()] = p; // Untuk lookup by name later
  }

  // 2. Parsing Gejala
  const gejalaSection = markdown.split('**2\\. Data Gejala**')[1].split('**3\\. Relasi Penyakit-Gejala**')[0];
  const gejalaMatches = [...gejalaSection.matchAll(/\|\s*(G\d{3})\s*\|\s*([^\|]+?)\s*\|/gi)];
  const gejalaMap = {}; // Untuk menyimpan ID berdasarkan nama gejala

  console.log(`Menyimpan ${gejalaMatches.length} data Gejala...`);
  for (const match of gejalaMatches) {
    const kode = match[1].trim();
    const nama = match[2].trim();

    const g = await prisma.gejala.create({
      data: {
        kode_gejala: kode,
        nama_gejala: nama,
      }
    });
    gejalaMap[nama.toLowerCase()] = g.id;
  }

  // 3. Parsing Rule CF
  const cfSection = markdown.split('**6\\. Certainty Factor**')[1];
  
  // Mencari setiap block penyakit di section 6
  const regexBlock = /\*\*(P\d{3})\s*\\\-\s*(.*?)\*\*([\s\S]*?)(?=\*\*(P\d{3})|\*\*Ringkasan Dataset Final\*\*)/gi;
  const blocks = [...cfSection.matchAll(regexBlock)];

  let totalRules = 0;
  console.log('Menyimpan rule CF pakar...');
  for (const block of blocks) {
    const kodePenyakit = block[1].trim();
    const namaPenyakit = block[2].trim();
    const tableContent = block[3];

    const penyakitId = penyakitMap[kodePenyakit];
    if (!penyakitId) {
      console.log(`Penyakit ${kodePenyakit} tidak ditemukan.`);
      continue;
    }

    // Parsing baris tabel
    const barisMatches = [...tableContent.matchAll(/\|\s*([^\|]+?)\s*\|\s*([\d\.]+)\s*\|/gi)];
    for (const baris of barisMatches) {
      const namaGejala = baris[1].trim().replace(/\*/g, ''); // bersihkan bintang jika ada
      const cfPakar = parseFloat(baris[2].trim());

      // Jika barisnya adalah header tabel, abaikan
      if (namaGejala.toLowerCase() === 'gejala' || isNaN(cfPakar)) continue;

      const gejalaId = gejalaMap[namaGejala.toLowerCase()];
      if (!gejalaId) {
        console.log(`Gejala "${namaGejala}" tidak ditemukan untuk penyakit ${kodePenyakit}.`);
        continue;
      }

      await prisma.ruleCF.create({
        data: {
          penyakit_id: penyakitId,
          gejala_id: gejalaId,
          cf_pakar: cfPakar
        }
      });
      totalRules++;
    }
  }

  console.log(`Berhasil menyimpan ${totalRules} rule CF!`);
  console.log('Proses Seeding Selesai!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
