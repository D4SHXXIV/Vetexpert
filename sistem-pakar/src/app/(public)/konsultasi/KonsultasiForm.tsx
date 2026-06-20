// src/app/(public)/konsultasi/KonsultasiForm.tsx
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface Symptom {
  id: number;
  kode_gejala: string;
  nama_gejala: string;
}

interface KonsultasiFormProps {
  symptoms: Symptom[];
}

export default function KonsultasiForm({ symptoms }: KonsultasiFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    namaPemilik: "",
    namaHewan: "",
    usiaHewan: "",
    jenisHewan: "KUCING",
  });

  const [selectedSymptoms, setSelectedSymptoms] = useState<{
    [key: number]: number;
  }>({});

  const [loading, setLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSymptomCheck = (id: number, checked: boolean) => {
    const updated = { ...selectedSymptoms };
    if (checked) {
      updated[id] = 1.0; // Default to 'Sangat Yakin'
    } else {
      delete updated[id];
    }
    setSelectedSymptoms(updated);
  };

  const handleConfidenceChange = (id: number, value: number) => {
    setSelectedSymptoms({ ...selectedSymptoms, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (Object.keys(selectedSymptoms).length === 0) {
      alert("Silakan pilih minimal satu gejala.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/diagnosa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, selectedSymptoms }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat diagnosa');
      }

      // Redirect ke halaman hasil diagnosa
      if (data.konsultasi_id) {
        router.push(`/hasil-diagnosa/${data.konsultasi_id}`);
      }

    } catch (error: any) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Patient Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Nama Pemilik</label>
          <input
            type="text"
            name="namaPemilik"
            value={formData.namaPemilik}
            onChange={handleInputChange}
            required
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            placeholder="Masukkan nama Anda"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Nama Hewan</label>
          <input
            type="text"
            name="namaHewan"
            value={formData.namaHewan}
            onChange={handleInputChange}
            required
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            placeholder="Masukkan nama hewan"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Usia Hewan (Bulan/Tahun)</label>
          <input
            type="text"
            name="usiaHewan"
            value={formData.usiaHewan}
            onChange={handleInputChange}
            required
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            placeholder="Contoh: 2 Tahun"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Jenis Hewan</label>
          <select
            name="jenisHewan"
            value={formData.jenisHewan}
            onChange={handleInputChange}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition bg-white"
          >
            <option value="KUCING">Kucing</option>
            <option value="ANJING">Anjing</option>
          </select>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Symptoms Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Pilih Gejala</h2>
          <p className="text-sm text-gray-500 mt-1">
            Pilih gejala yang dialami hewan Anda dan tentukan tingkat keyakinannya.
          </p>
        </div>

        {symptoms.length === 0 ? (
          <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500">Data gejala tidak ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {symptoms.map((symptom) => {
              const isSelected = selectedSymptoms[symptom.id] !== undefined;

              return (
                <div
                  key={symptom.id}
                  className={`p-4 border rounded-xl transition-all shadow-sm ${
                    isSelected
                      ? "border-green-500 bg-green-50/50 ring-1 ring-green-500"
                      : "border-gray-200 bg-white hover:border-green-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id={`symptom-${symptom.id}`}
                      checked={isSelected}
                      onChange={(e) => handleSymptomCheck(symptom.id, e.target.checked)}
                      className="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded cursor-pointer"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`symptom-${symptom.id}`}
                        className="font-medium text-gray-800 cursor-pointer block select-none"
                      >
                        <span className="text-green-700 text-sm font-bold mr-1">{symptom.kode_gejala}</span> 
                        {symptom.nama_gejala}
                      </label>

                      {isSelected && (
                        <div className="mt-3">
                          <label className="text-xs text-gray-500 mb-1 block">Tingkat Keyakinan:</label>
                          <select
                            value={selectedSymptoms[symptom.id]}
                            onChange={(e) =>
                              handleConfidenceChange(symptom.id, parseFloat(e.target.value))
                            }
                            className="w-full text-sm p-2 border border-green-300 rounded-md bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                          >
                            <option value={1.0}>Sangat Yakin (1.0)</option>
                            <option value={0.8}>Yakin (0.8)</option>
                            <option value={0.6}>Cukup Yakin (0.6)</option>
                            <option value={0.4}>Sedikit Yakin (0.4)</option>
                            <option value={0.2}>Tidak Tahu (0.2)</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span>{loading ? "Memproses..." : "Diagnosa Sekarang"}</span>
          {!loading && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>

      {/* Placeholder ref untuk kompatibilitas */}
      <div ref={resultRef} />
    </form>
  );
}
