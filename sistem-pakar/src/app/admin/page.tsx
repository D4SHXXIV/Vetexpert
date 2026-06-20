export const dynamic = 'force-dynamic';

import { PrismaClient } from "@prisma/client";
import DashboardClient from "./DashboardClient";

const prisma = new PrismaClient();

export default async function AdminDashboardPage() {
  const [totalPenyakit, totalGejala, totalRuleCF, totalDiagnosa, rawRecent, kucingCount, anjingCount] = await Promise.all([
    prisma.penyakit.count(),
    prisma.gejala.count(),
    prisma.ruleCF.count(),
    prisma.konsultasi.count(),
    prisma.konsultasi.findMany({
      orderBy: { tanggal: 'desc' },
      take: 4,
    }),
    prisma.konsultasi.count({ where: { jenis_hewan: "KUCING" } }),
    prisma.konsultasi.count({ where: { jenis_hewan: "ANJING" } }),
  ]);

  const recentDiagnosa = rawRecent.map((d: any) => ({
    id: d.id,
    pemilik: d.nama_pemilik,
    hewan: d.nama_hewan,
    jenis: d.jenis_hewan as "KUCING" | "ANJING",
    penyakit: d.hasil_diagnosa,
    cf: parseFloat((d.cf_hasil * 100).toFixed(1)),
    tanggal: d.tanggal.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  }));

  const total = kucingCount + anjingCount;
  const distribusi = {
    kucingPct: total > 0 ? (kucingCount / total) * 100 : 0,
    anjingPct: total > 0 ? (anjingCount / total) * 100 : 0,
  };

  const stats = {
    totalPenyakit,
    totalGejala,
    totalRuleCF,
    totalDiagnosa,
  };

  return <DashboardClient stats={stats} recentDiagnosa={recentDiagnosa} distribusi={distribusi} />;
}
