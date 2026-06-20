export const dynamic = 'force-dynamic';

import { PrismaClient } from "@prisma/client";
import RuleCFClient from "./RuleCFClient";

const prisma = new PrismaClient();

export default async function RuleCFPage() {
  const [ruleData, penyakitList, gejalaList] = await Promise.all([
    prisma.ruleCF.findMany({
      include: { penyakit: true, gejala: true },
      orderBy: { id: 'desc' }
    }),
    prisma.penyakit.findMany({ orderBy: { kode_penyakit: 'asc' } }),
    prisma.gejala.findMany({ orderBy: { kode_gejala: 'asc' } })
  ]);

  const formattedRuleData = ruleData.map(r => ({
    id: r.id,
    penyakit_id: r.penyakit_id,
    penyakit_nama: r.penyakit.nama_penyakit,
    gejala_id: r.gejala_id,
    gejala_nama: r.gejala.nama_gejala,
    cf_pakar: r.cf_pakar
  }));

  return <RuleCFClient initialData={formattedRuleData} penyakitList={penyakitList} gejalaList={gejalaList} />;
}
