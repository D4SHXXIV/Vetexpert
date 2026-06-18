"use client";

import Link from 'next/link';

export default function HasilDiagnosaPage() {
  // Mock data untuk keperluan UI. 
  // Nanti dapat diganti dengan mem-fetch data ke database berdasarkan ID Konsultasi.
  const diagnosisResult = {
    namaPenyakit: "Feline Panleukopenia (FPV)",
    persentase: 87.5,
    deskripsi: "Feline panleukopenia (FPV) adalah penyakit virus yang sangat menular dan mengancam jiwa pada kucing. Penyakit ini menyerang sel-sel darah putih, sistem kekebalan tubuh, dan saluran pencernaan.",
    solusi: "Segera bawa kucing ke dokter hewan untuk mendapatkan terapi cairan intravena, antibiotik, dan perawatan suportif intensif. Karantina kucing dari hewan lain.",
    selectedSymptoms: [
      "Muntah kuning atau berbusa",
      "Diare berdarah",
      "Demam tinggi mendadak",
      "Kehilangan nafsu makan total",
      "Lemas dan sangat lesu"
    ],
    otherDiseases: [
      { nama: "Feline Calicivirus (FCV)", persentase: 45.2 },
      { nama: "Feline Infectious Peritonitis (FIP)", persentase: 21.0 },
      { nama: "Cacingan (Helminthiasis)", persentase: 15.5 },
    ]
  };

  return (
    <div className="min-h-screen bg-green-50/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-700 rounded-full mb-4 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">Hasil Diagnosa</h1>
          <p className="mt-2 text-gray-600">Berdasarkan gejala yang Anda pilih, berikut adalah hasil analisa sistem pakar kami.</p>
        </div>

        {/* Main Diagnosis Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-green-100">
          
          {/* Top Hero Section */}
          <div className="bg-green-600 px-6 py-10 sm:px-12 sm:py-12 text-white text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 opacity-10">
              <svg width="200" height="200" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="currentColor" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 opacity-10">
              <svg width="200" height="200" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="currentColor" />
              </svg>
            </div>

            <div className="relative z-10">
              <h2 className="text-lg sm:text-xl font-medium text-green-100 mb-2">Kemungkinan Terbesar:</h2>
              <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">{diagnosisResult.namaPenyakit}</h3>
              
              <div className="flex flex-col items-center justify-center mt-6">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                  {/* Circular Progress Bar */}
                  <svg className="w-full h-full transform -rotate-90 drop-shadow-md" viewBox="0 0 36 36">
                    {/* Background Circle */}
                    <path
                      className="text-green-800"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* Progress Circle */}
                    <path
                      className="text-white"
                      strokeDasharray={`${diagnosisResult.persentase}, 100`}
                      strokeWidth="3"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="text-4xl sm:text-5xl font-bold block">{diagnosisResult.persentase}%</span>
                    <span className="text-sm font-medium text-green-100 mt-1 block">Tingkat Keyakinan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-8 sm:p-10 space-y-10">
            {/* Description & Treatment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4 text-green-700">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold">Deskripsi Penyakit</h4>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{diagnosisResult.deskripsi}</p>
              </div>

              <div className="bg-green-50 rounded-2xl p-6 border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4 text-green-700">
                  <div className="bg-green-200/50 p-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold">Penanganan Awal</h4>
                </div>
                <p className="text-green-900 leading-relaxed font-medium text-sm sm:text-base">{diagnosisResult.solusi}</p>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Selected Symptoms */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Gejala yang Dipilih
                </h4>
                <ul className="space-y-3 bg-gray-50 p-5 rounded-xl border border-gray-100">
                  {diagnosisResult.selectedSymptoms.map((symptom, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 font-medium text-sm sm:text-base">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Other Diseases Ranking */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  Kemungkinan Penyakit Lain
                </h4>
                <div className="space-y-3">
                  {diagnosisResult.otherDiseases.map((disease, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                          {idx + 1}
                        </div>
                        <span className="font-semibold text-gray-800 text-sm sm:text-base">{disease.nama}</span>
                      </div>
                      <span className="bg-green-100 px-3 py-1 rounded-full text-sm font-bold text-green-700 border border-green-200">
                        {disease.persentase}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 rounded-r-xl shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-bold text-yellow-800">Peringatan Penting</h3>
              <p className="text-sm text-yellow-700 mt-1 leading-relaxed">
                Sistem pakar ini hanya memberikan diagnosa awal berdasarkan gejala yang diamati. Sangat disarankan untuk segera mengunjungi dokter hewan terdekat guna mendapatkan penanganan medis yang akurat.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 pb-10">
          <button onClick={() => window.print()} className="bg-white text-green-700 border-2 border-green-600 font-bold py-3.5 px-8 rounded-xl hover:bg-green-50 transition-colors flex justify-center items-center gap-2 focus:ring-4 focus:ring-green-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Cetak Hasil
          </button>
          <Link href="/konsultasi" className="bg-green-600 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg hover:bg-green-700 transition-colors flex justify-center items-center gap-2 focus:ring-4 focus:ring-green-300">
            Konsultasi Ulang
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
}
