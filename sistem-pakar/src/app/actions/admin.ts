"use server";

import { PrismaClient, JenisHewan } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Global Prisma instance to avoid connection limit in dev
const prisma = new PrismaClient();

// ==========================================
// GEJALA
// ==========================================
export async function saveGejala(data: { id?: number; kode_gejala: string; nama_gejala: string }) {
  if (data.id) {
    await prisma.gejala.update({
      where: { id: data.id },
      data: { kode_gejala: data.kode_gejala, nama_gejala: data.nama_gejala },
    });
  } else {
    await prisma.gejala.create({
      data: { kode_gejala: data.kode_gejala, nama_gejala: data.nama_gejala },
    });
  }
  revalidatePath("/admin/gejala");
  revalidatePath("/konsultasi"); // Juga revalidate halaman konsultasi
}

export async function deleteGejala(id: number) {
  await prisma.gejala.delete({ where: { id } });
  revalidatePath("/admin/gejala");
  revalidatePath("/konsultasi");
}

// ==========================================
// PENYAKIT
// ==========================================
export async function savePenyakit(data: {
  id?: number;
  kode_penyakit: string;
  nama_penyakit: string;
  jenis_hewan: JenisHewan;
  deskripsi: string;
  solusi: string;
}) {
  if (data.id) {
    await prisma.penyakit.update({
      where: { id: data.id },
      data: {
        kode_penyakit: data.kode_penyakit,
        nama_penyakit: data.nama_penyakit,
        jenis_hewan: data.jenis_hewan,
        deskripsi: data.deskripsi,
        solusi: data.solusi,
      },
    });
  } else {
    await prisma.penyakit.create({
      data: {
        kode_penyakit: data.kode_penyakit,
        nama_penyakit: data.nama_penyakit,
        jenis_hewan: data.jenis_hewan,
        deskripsi: data.deskripsi,
        solusi: data.solusi,
      },
    });
  }
  revalidatePath("/admin/penyakit");
}

export async function deletePenyakit(id: number) {
  await prisma.penyakit.delete({ where: { id } });
  revalidatePath("/admin/penyakit");
}

// ==========================================
// RULE CF
// ==========================================
export async function saveRuleCF(data: { id?: number; penyakit_id: number; gejala_id: number; cf_pakar: number }) {
  if (data.id) {
    await prisma.ruleCF.update({
      where: { id: data.id },
      data: { penyakit_id: data.penyakit_id, gejala_id: data.gejala_id, cf_pakar: data.cf_pakar },
    });
  } else {
    await prisma.ruleCF.create({
      data: { penyakit_id: data.penyakit_id, gejala_id: data.gejala_id, cf_pakar: data.cf_pakar },
    });
  }
  revalidatePath("/admin/rule-cf");
}

export async function deleteRuleCF(id: number) {
  await prisma.ruleCF.delete({ where: { id } });
  revalidatePath("/admin/rule-cf");
}

// ==========================================
// RIWAYAT KONSULTASI
// ==========================================
export async function deleteRiwayat(id: number) {
  await prisma.konsultasi.delete({ where: { id } });
  revalidatePath("/admin/riwayat");
}
