"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Cat, Dog, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock symptom data
const gejalaDummy = [
  { id: 1, kode_gejala: "G001", nama_gejala: "Nafsu makan berkurang / tidak mau makan" },
  { id: 2, kode_gejala: "G002", nama_gejala: "Muntah-muntah" },
  { id: 3, kode_gejala: "G003", nama_gejala: "Diare / feses cair" },
  { id: 4, kode_gejala: "G004", nama_gejala: "Lemas / tidak aktif" },
  { id: 5, kode_gejala: "G005", nama_gejala: "Demam (suhu tubuh > 39.5°C)" },
  { id: 6, kode_gejala: "G006", nama_gejala: "Batuk / bersin" },
  { id: 7, kode_gejala: "G007", nama_gejala: "Keluar cairan dari hidung / mata" },
  { id: 8, kode_gejala: "G008", nama_gejala: "Gatal-gatal / sering menggaruk" },
  { id: 9, kode_gejala: "G009", nama_gejala: "Rambut rontok berlebihan" },
  { id: 10, kode_gejala: "G010", nama_gejala: "Perut kembung / membesar" },
];

const cfOptions = [
  { label: "Tidak", value: 0.0, emoji: "❌" },
  { label: "Sedikit", value: 0.2, emoji: "🤔" },
  { label: "Cukup", value: 0.4, emoji: "😟" },
  { label: "Yakin", value: 0.6, emoji: "😰" },
  { label: "Sangat Yakin", value: 0.8, emoji: "😱" },
  { label: "Pasti", value: 1.0, emoji: "🚨" },
];

type JenisHewan = "KUCING" | "ANJING";
type Step = "info" | "gejala" | "review";

export default function KonsultasiPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("info");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    nama_pemilik: "",
    nama_hewan: "",
    usia_hewan: "",
    jenis_hewan: "" as JenisHewan | "",
  });

  const [selectedGejala, setSelectedGejala] = useState<Record<number, number>>({});

  const handleCFChange = (gejalId: number, value: number) => {
    setSelectedGejala((prev) => ({ ...prev, [gejalId]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    router.push("/hasil-diagnosa");
  };

  const isInfoValid =
    form.nama_pemilik.trim() &&
    form.nama_hewan.trim() &&
    form.usia_hewan &&
    form.jenis_hewan;

  const selectedCount = Object.values(selectedGejala).filter((v) => v > 0).length;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 via-white to-emerald-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Form Konsultasi</h1>
          <p className="text-muted-foreground mt-2">
            Isi data di bawah ini untuk memulai diagnosa
          </p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {(["info", "gejala", "review"] as Step[]).map((s, i) => {
            const stepLabels = ["Info Hewan", "Pilih Gejala", "Review"];
            const isActive = s === step;
            const isDone =
              (step === "gejala" && i === 0) || (step === "review" && i <= 1);
            return (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : isDone
                      ? "bg-green-100 text-green-700"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold",
                      isActive ? "bg-white/30" : isDone ? "bg-green-200" : "bg-muted-foreground/20"
                    )}
                  >
                    {isDone ? "✓" : i + 1}
                  </span>
                  {stepLabels[i]}
                </div>
                {i < 2 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          {/* Step 1: Info */}
          {step === "info" && (
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold mb-6 text-foreground">Informasi Hewan Peliharaan</h2>
              <div className="space-y-5">
                {/* Jenis Hewan */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Jenis Hewan <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {(["KUCING", "ANJING"] as JenisHewan[]).map((j) => (
                      <button
                        key={j}
                        onClick={() => setForm((f) => ({ ...f, jenis_hewan: j }))}
                        className={cn(
                          "flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                          form.jenis_hewan === j
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/50 hover:bg-muted/30"
                        )}
                      >
                        {j === "KUCING" ? (
                          <Cat className="w-6 h-6" />
                        ) : (
                          <Dog className="w-6 h-6" />
                        )}
                        <span className="font-medium text-sm capitalize">
                          {j === "KUCING" ? "Kucing" : "Anjing"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Nama Pemilik <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.nama_pemilik}
                      onChange={(e) => setForm((f) => ({ ...f, nama_pemilik: e.target.value }))}
                      placeholder="Nama lengkap Anda"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Nama Hewan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.nama_hewan}
                      onChange={(e) => setForm((f) => ({ ...f, nama_hewan: e.target.value }))}
                      placeholder="Nama hewan peliharaan"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Usia Hewan (bulan) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={form.usia_hewan}
                    onChange={(e) => setForm((f) => ({ ...f, usia_hewan: e.target.value }))}
                    placeholder="Contoh: 12"
                    min="1"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep("gejala")}
                  disabled={!isInfoValid}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  Lanjutkan <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Gejala */}
          {step === "gejala" && (
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-semibold text-foreground">Pilih Gejala</h2>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {selectedCount} dipilih
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Pilih tingkat keyakinan Anda untuk setiap gejala yang dialami hewan.
              </p>

              <div className="space-y-4">
                {gejalaDummy.map((gejala) => (
                  <div key={gejala.id} className="p-4 rounded-xl border border-border bg-muted/20">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded-md mt-0.5 flex-shrink-0">
                        {gejala.kode_gejala}
                      </span>
                      <p className="text-sm font-medium text-foreground leading-snug">
                        {gejala.nama_gejala}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cfOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleCFChange(gejala.id, opt.value)}
                          className={cn(
                            "flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all border",
                            selectedGejala[gejala.id] === opt.value
                              ? "bg-primary text-white border-primary shadow-sm"
                              : "bg-white text-muted-foreground border-border hover:border-primary/50 hover:text-primary"
                          )}
                        >
                          <span>{opt.emoji}</span>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setStep("info")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Kembali
                </button>
                <button
                  onClick={() => setStep("review")}
                  disabled={selectedCount === 0}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
                >
                  Review <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === "review" && (
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold mb-6 text-foreground">Review & Konfirmasi</h2>

              {/* Info summary */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <h3 className="text-sm font-semibold text-green-800 mb-3">Data Hewan</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-muted-foreground">Pemilik:</span> <span className="font-medium">{form.nama_pemilik}</span></div>
                  <div><span className="text-muted-foreground">Hewan:</span> <span className="font-medium">{form.nama_hewan}</span></div>
                  <div><span className="text-muted-foreground">Jenis:</span> <span className="font-medium">{form.jenis_hewan}</span></div>
                  <div><span className="text-muted-foreground">Usia:</span> <span className="font-medium">{form.usia_hewan} bulan</span></div>
                </div>
              </div>

              {/* Selected symptoms */}
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Gejala Dipilih ({selectedCount})
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {gejalaDummy
                  .filter((g) => (selectedGejala[g.id] ?? 0) > 0)
                  .map((g) => (
                    <div
                      key={g.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20"
                    >
                      <span className="text-sm text-foreground">{g.nama_gejala}</span>
                      <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                        CF: {selectedGejala[g.id].toFixed(1)}
                      </span>
                    </div>
                  ))}
              </div>

              <div className="mt-8 flex items-center justify-between">
                <button
                  onClick={() => setStep("gejala")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Kembali
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center gap-2 px-7 py-2.5 rounded-lg bg-primary text-white font-medium text-sm hover:bg-primary/90 disabled:opacity-70 transition-all shadow-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Memproses...
                    </>
                  ) : (
                    "Proses Diagnosa"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
