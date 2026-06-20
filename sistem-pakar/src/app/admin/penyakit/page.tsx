export const dynamic = 'force-dynamic';

import { PrismaClient } from "@prisma/client";
import PenyakitClient from "./PenyakitClient";

const prisma = new PrismaClient();

export default async function PenyakitPage() {
  const penyakitData = await prisma.penyakit.findMany({
    orderBy: {
      kode_penyakit: 'asc'
    }
  });

  return <PenyakitClient initialData={penyakitData} />;
}
