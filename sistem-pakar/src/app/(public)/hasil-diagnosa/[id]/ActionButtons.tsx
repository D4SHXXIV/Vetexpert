"use client";

import Link from 'next/link';

export default function ActionButtons() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 pb-10">
      <button
        id="btn-cetak"
        onClick={handlePrint}
        className="inline-flex items-center justify-center gap-2 bg-white text-green-700 border-2 border-green-500 font-bold py-3.5 px-8 rounded-xl hover:bg-green-50 transition-colors focus:ring-4 focus:ring-green-100 cursor-pointer"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        Cetak Hasil
      </button>
      <Link
        id="btn-konsultasi-ulang"
        href="/konsultasi"
        className="inline-flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg hover:bg-green-700 transition-colors focus:ring-4 focus:ring-green-300"
      >
        Konsultasi Ulang
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
