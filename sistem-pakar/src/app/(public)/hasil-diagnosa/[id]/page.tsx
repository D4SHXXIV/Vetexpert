import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import ActionButtons from './ActionButtons';

const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return {
    title: `Hasil Diagnosa #${id} - VetExpert`,
    description: 'Detail hasil diagnosa kesehatan hewan peliharaan Anda.',
  };
}

export default async function HasilDiagnosaDetailPage({ params }: Props) {
  const { id } = await params;
  const konsultasiId = parseInt(id, 10);

  if (isNaN(konsultasiId)) {
    notFound();
  }

  const konsultasi = await prisma.konsultasi.findUnique({
    where: { id: konsultasiId },
    include: {
      detail_konsultasi: {
        include: {
          gejala: true,
        },
      },
    },
  });

  if (!konsultasi) {
    notFound();
  }

  // Fetch the matched disease details
  const penyakit = await prisma.penyakit.findFirst({
    where: {
      nama_penyakit: konsultasi.hasil_diagnosa,
    },
  });

  const persentase = (konsultasi.cf_hasil * 100).toFixed(2);
  const jenisHewanLabel = konsultasi.jenis_hewan === 'KUCING' ? 'Kucing' : 'Anjing';
  const cfForSvg = Math.min(Math.max(konsultasi.cf_hasil * 100, 0), 100);

  const getConfidenceBadge = (cf: number) => {
    if (cf >= 0.8) return { label: 'Sangat Yakin', cls: 'bg-green-100 text-green-800 border-green-200' };
    if (cf >= 0.6) return { label: 'Yakin', cls: 'bg-blue-100 text-blue-800 border-blue-200' };
    if (cf >= 0.4) return { label: 'Cukup Yakin', cls: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    return { label: 'Kurang Yakin', cls: 'bg-orange-100 text-orange-800 border-orange-200' };
  };

  const confidence = getConfidenceBadge(konsultasi.cf_hasil);

  const getCfUserLabel = (cf: number) => {
    if (cf >= 0.8) return 'Sangat Yakin';
    if (cf >= 0.6) return 'Yakin';
    if (cf >= 0.4) return 'Cukup Yakin';
    if (cf >= 0.2) return 'Sedikit Yakin';
    return 'Tidak Tahu';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-10 px-4 sm:px-6 lg:px-8 print:bg-white print:py-0 print:px-0">
      
      {/* Screen View (Hidden during print) */}
      <div className="max-w-4xl mx-auto space-y-6 print:hidden">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600 transition-colors">Beranda</Link>
          <span>/</span>
          <Link href="/konsultasi" className="hover:text-green-600 transition-colors">Konsultasi</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Hasil Diagnosa #{konsultasiId}</span>
        </nav>

        {/* Main Result Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

          {/* Green Header */}
          <div className="bg-gradient-to-br from-green-600 to-emerald-700 px-6 py-10 sm:px-12 text-white relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-white/5 rounded-full" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
              {/* Circular Progress */}
              <div className="flex-shrink-0 relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90 drop-shadow-md" viewBox="0 0 36 36">
                  <path
                    className="text-green-800/60"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-white"
                    strokeDasharray={`${cfForSvg}, 100`}
                    strokeWidth="3"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-extrabold leading-none">{persentase}%</span>
                  <span className="text-xs font-medium text-green-100 mt-1">Keyakinan</span>
                </div>
              </div>

              {/* Disease Name & Meta */}
              <div className="text-center sm:text-left">
                <p className="text-green-200 text-xs font-medium uppercase tracking-widest mb-1">
                  Kemungkinan Penyakit Terbesar
                </p>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
                  {konsultasi.hasil_diagnosa}
                </h1>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(konsultasi.tanggal).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                    🐾 {jenisHewanLabel}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${confidence.cls}`}>
                    {confidence.label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-8">

            {/* Patient Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: 'Nama Pemilik', value: konsultasi.nama_pemilik, icon: '👤' },
                { label: 'Nama Hewan', value: konsultasi.nama_hewan, icon: '🐾' },
                { label: 'Usia Hewan', value: konsultasi.usia_hewan, icon: '📅' },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{item.icon} {item.label}</p>
                  <p className="font-semibold text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Description & Solution */}
            {penyakit && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900">Deskripsi Penyakit</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{penyakit.deskripsi}</p>
                </div>

                <div className="bg-green-50 rounded-2xl p-6 border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-200/60 p-2 rounded-lg">
                      <svg className="h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-gray-900">Solusi Penanganan</h3>
                  </div>
                  <p className="text-green-900 text-sm leading-relaxed font-medium">{penyakit.solusi}</p>
                </div>
              </div>
            )}

            <hr className="border-gray-100" />

            {/* Selected Symptoms */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Gejala yang Dilaporkan
                <span className="ml-auto text-sm font-normal text-gray-400">
                  {konsultasi.detail_konsultasi.length} gejala
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {konsultasi.detail_konsultasi.map((detail) => (
                  <div
                    key={detail.id}
                    className="flex items-center justify-between gap-3 p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex-shrink-0 w-7 h-7 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-green-700">{detail.gejala.kode_gejala}</span>
                        <p className="text-sm font-medium text-gray-800 truncate">{detail.gejala.nama_gejala}</p>
                      </div>
                    </div>
                    <span className="flex-shrink-0 text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {getCfUserLabel(detail.cf_user)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="h-6 w-6 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-800">Peringatan Penting</h4>
            <p className="text-sm text-amber-700 mt-1 leading-relaxed">
              Hasil diagnosa ini bersifat sementara dan hanya sebagai referensi awal berdasarkan metode <em>Certainty Factor</em>. Sangat disarankan untuk segera mengunjungi dokter hewan profesional guna mendapatkan penanganan medis yang akurat.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <ActionButtons />

      </div>

      {/* Print-Only Layout (A4 format clinical report, Hidden on screen) */}
      <div className="hidden print:block p-8 bg-white text-black font-sans leading-relaxed text-sm">
        
        {/* Header Laporan */}
        <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
          <h1 className="text-xl font-bold uppercase tracking-wider">Laporan Hasil Diagnosa Awal</h1>
          <h2 className="text-lg font-semibold text-gray-700">VetExpert - Sistem Pakar Kesehatan Hewan</h2>
          <p className="text-xs text-gray-500 mt-1">Metode Certainty Factor (CF) | Website: VetExpert</p>
        </div>

        {/* Metadata / Info Pasien & Pemilik */}
        <div className="mb-6">
          <h3 className="text-xs font-bold border-b border-gray-300 pb-1 mb-3 uppercase tracking-wide text-green-800">
            I. Informasi Pasien & Pemilik
          </h3>
          <table className="w-full text-left border-collapse text-xs">
            <tbody>
              <tr className="border-b border-gray-100">
                <th className="py-2 w-1/3 text-gray-600">ID Konsultasi</th>
                <td className="py-2 font-semibold">#{konsultasiId}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <th className="py-2 text-gray-600">Tanggal Konsultasi</th>
                <td className="py-2">
                  {new Date(konsultasi.tanggal).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })} WIB
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <th className="py-2 text-gray-600">Nama Pemilik</th>
                <td className="py-2 font-medium">{konsultasi.nama_pemilik}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <th className="py-2 text-gray-600">Nama Hewan / Pasien</th>
                <td className="py-2 font-medium">{konsultasi.nama_hewan}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <th className="py-2 text-gray-600">Jenis Hewan</th>
                <td className="py-2">{jenisHewanLabel}</td>
              </tr>
              <tr className="border-b border-gray-100">
                <th className="py-2 text-gray-600">Usia Hewan</th>
                <td className="py-2">{konsultasi.usia_hewan}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Hasil Diagnosa */}
        <div className="mb-6">
          <h3 className="text-xs font-bold border-b border-gray-300 pb-1 mb-3 uppercase tracking-wide text-green-800">
            II. Kesimpulan Diagnosa
          </h3>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Kemungkinan Penyakit Terbesar:</p>
            <h4 className="text-base font-bold text-gray-900 mb-1">{konsultasi.hasil_diagnosa}</h4>
            <div className="flex gap-4 text-xs font-semibold mt-2">
              <span>Nilai CF Hasil: <span className="text-green-700 font-bold">{konsultasi.cf_hasil}</span></span>
              <span>Tingkat Keyakinan: <span className="text-green-700 font-bold">{persentase}% ({confidence.label})</span></span>
            </div>
          </div>
        </div>

        {/* Deskripsi & Solusi */}
        {penyakit && (
          <div className="mb-6 space-y-4">
            <div>
              <h3 className="text-xs font-bold border-b border-gray-300 pb-1 mb-2 uppercase tracking-wide text-green-800">
                III. Deskripsi Penyakit
              </h3>
              <p className="text-gray-700 text-xs leading-relaxed text-justify">{penyakit.deskripsi}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold border-b border-gray-300 pb-1 mb-2 uppercase tracking-wide text-green-800">
                IV. Solusi Penanganan Awal
              </h3>
              <p className="text-gray-700 text-xs leading-relaxed text-justify font-medium">{penyakit.solusi}</p>
            </div>
          </div>
        )}

        {/* Gejala Dilaporkan */}
        <div className="mb-8">
          <h3 className="text-xs font-bold border-b border-gray-300 pb-1 mb-3 uppercase tracking-wide text-green-800">
            V. Gejala yang Dilaporkan
          </h3>
          <table className="w-full text-left border border-gray-200 border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-2 border-r border-gray-200 w-12 text-center">No</th>
                <th className="p-2 border-r border-gray-200 w-20">Kode</th>
                <th className="p-2 border-r border-gray-200">Gejala</th>
                <th className="p-2">Tingkat Keyakinan</th>
              </tr>
            </thead>
            <tbody>
              {konsultasi.detail_konsultasi.map((detail, index) => (
                <tr key={detail.id} className="border-b border-gray-200">
                  <td className="p-2 border-r border-gray-200 text-center">{index + 1}</td>
                  <td className="p-2 border-r border-gray-200 font-semibold">{detail.gejala.kode_gejala}</td>
                  <td className="p-2 border-r border-gray-200">{detail.gejala.nama_gejala}</td>
                  <td className="p-2">{getCfUserLabel(detail.cf_user)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Laporan */}
        <div className="mt-12 flex justify-between items-start text-xs pt-6 border-t border-gray-200">
          <div>
            <p className="text-gray-500 italic">* Laporan ini dibuat secara otomatis oleh Sistem Pakar VetExpert.</p>
            <p className="text-gray-500 italic">Hasil diagnosa ini bersifat sementara sebelum pemeriksaan klinis oleh Dokter Hewan.</p>
          </div>
          <div className="text-center w-48">
            <p className="mb-16">Dicetak oleh Pemilik,</p>
            <div className="border-b border-gray-400 w-32 mx-auto mb-1"></div>
            <p className="font-semibold text-gray-800">{konsultasi.nama_pemilik}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
