const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.gejala.count();
  console.log('Gejala Count:', count);
  const gejalaList = await prisma.gejala.findMany({ take: 3 });
  console.log(gejalaList);
}

main().finally(() => prisma.$disconnect());
