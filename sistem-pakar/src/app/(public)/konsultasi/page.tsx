import { PrismaClient } from '@prisma/client';
import KonsultasiForm from './KonsultasiForm';

// Initialize Prisma Client
// (It's generally recommended to use a shared global instance to avoid connection exhaustion in dev)
const prisma = new PrismaClient();

export const metadata = {
  title: 'Konsultasi - VetExpert',
  description: 'Konsultasi pakar kesehatan hewan',
};

export default async function KonsultasiPage() {
  // Load symptoms from the database
  const symptoms = await prisma.gejala.findMany({
    select: {
      id: true,
      kode_gejala: true,
      nama_gejala: true,
    },
    orderBy: {
      kode_gejala: 'asc',
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Konsultasi <span className="text-green-600">Kesehatan Hewan</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Silakan lengkapi formulir di bawah ini dan pilih gejala yang dialami hewan peliharaan Anda untuk mendapatkan hasil diagnosa awal berdasarkan pengetahuan pakar.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
          <KonsultasiForm symptoms={symptoms} />
        </div>
        
        {/* Info Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            * Hasil diagnosa ini bersifat sementara dan bukan pengganti saran dokter hewan profesional.
          </p>
        </div>

      </div>
    </div>
  );
}
