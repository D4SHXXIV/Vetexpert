export const dynamic = 'force-dynamic';

import { PrismaClient } from "@prisma/client";
import GejalaClient from "./GejalaClient";

const prisma = new PrismaClient();

export default async function GejalaPage() {
  const gejalaData = await prisma.gejala.findMany({
    orderBy: {
      kode_gejala: 'asc'
    }
  });

  return <GejalaClient initialData={gejalaData} />;
}
