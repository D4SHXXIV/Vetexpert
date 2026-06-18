import Link from "next/link";
import { CheckCircle, AlertTriangle, ArrowLeft, ArrowRight, Cat, Stethoscope } from "lucide-react";

// Mock result - in real implementation this would come from DB/session
const hasilDummy = {
  penyakit: "Panleukopenia (Distemper Kucing)",
  kode: "P001",
  cf_hasil: 0.784,
  persentase: 78.4,
  jenis_hewan: "Kucing",
  nama_hewan: "Mochi",
  nama_pemilik: "Budi Santoso",
  tanggal: new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }),
  deskripsi:
    "Panleukopenia kucing adalah penyakit virus yang sangat menular dan dapat menyebabkan kematian. Disebabkan oleh Feline Parvovirus (FPV) yang menyerang sel-sel darah putih, membuat sistem kekebalan tubuh melemah.",
  solusi:
    "Segera bawa ke dokter hewan untuk penanganan intensif. Terapi suportif meliputi cairan infus, antibiotik untuk infeksi sekunder, dan antiemetik untuk mengatasi muntah. Pisahkan dari hewan lain untuk mencegah penularan.",
  gejala_ditemukan: [
    { nama: "Nafsu makan berkurang", cf_user: 0.8 },
    { nama: "Muntah-muntah", cf_user: 0.8 },
    { nama: "Diare / feses cair", cf_user: 0.6 },
    { nama: "Lemas / tidak aktif", cf_user: 1.0 },
    { nama: "Demam (suhu > 39.5°C)", cf_user: 0.6 },
  ],
};

function CFBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color =
    pct >= 70
      ? "bg-red-500"
      : pct >= 40
      ? "bg-yellow-500"
      : "bg-green-500";

  return (
    <div className="w-full bg-muted rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export default function HasilDiagnosaPage() {
  const pct = hasilDummy.persentase;
  const level = pct >= 70 ? "Tinggi" : pct >= 40 ? "Sedang" : "Rendah";
  const levelColor =
    pct >= 70
      ? "text-red-600 bg-red-50 border-red-200"
      : pct >= 40
      ? "text-yellow-700 bg-yellow-50 border-yellow-200"
      : "text-green-700 bg-green-50 border-green-200";

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 via-white to-emerald-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Hasil Diagnosa</h1>
          <p className="text-muted-foreground mt-1 text-sm">{hasilDummy.tanggal}</p>
        </div>

        {/* Patient info */}
        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <Cat className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{hasilDummy.nama_hewan}</p>
              <p className="text-xs text-muted-foreground">
                Pemilik: {hasilDummy.nama_pemilik} &bull; {hasilDummy.jenis_hewan}
              </p>
            </div>
          </div>
        </div>

        {/* Result card */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
            <div className="flex items-center gap-2 text-green-100 text-xs mb-1">
              <Stethoscope className="w-3.5 h-3.5" />
              Kemungkinan Penyakit
            </div>
            <h2 className="text-xl font-bold text-white">{hasilDummy.penyakit}</h2>
            <p className="text-green-200 text-xs mt-0.5">{hasilDummy.kode}</p>
          </div>

          <div className="p-6">
            {/* CF Result */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Nilai Kepercayaan (CF)</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full border ${levelColor}`}
                  >
                    {level}
                  </span>
                  <span className="text-lg font-bold text-foreground">
                    {hasilDummy.persentase.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-700"
                  style={{ width: `${hasilDummy.persentase}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">
                CF = {hasilDummy.cf_hasil.toFixed(4)} &bull; Skala 0 – 1
              </p>
            </div>

            {/* Description */}
            <div className="mb-5">
              <h3 className="text-sm font-semibold text-foreground mb-2">Deskripsi Penyakit</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {hasilDummy.deskripsi}
              </p>
            </div>

            {/* Solution */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-5">
              <div className="flex items-center gap-2 text-green-800 font-semibold text-sm mb-2">
                <CheckCircle className="w-4 h-4" />
                Solusi & Penanganan
              </div>
              <p className="text-sm text-green-700 leading-relaxed">{hasilDummy.solusi}</p>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
              <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-yellow-700 leading-relaxed">
                <strong>Peringatan:</strong> Hasil diagnosa ini hanya sebagai referensi awal.
                Konsultasikan dengan dokter hewan untuk penanganan yang tepat.
              </p>
            </div>
          </div>
        </div>

        {/* Gejala ditemukan */}
        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Gejala yang Ditemukan ({hasilDummy.gejala_ditemukan.length})
          </h3>
          <div className="space-y-3">
            {hasilDummy.gejala_ditemukan.map((g, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">{g.nama}</span>
                  <span className="text-xs text-muted-foreground font-mono">
                    CF: {g.cf_user.toFixed(1)}
                  </span>
                </div>
                <CFBar value={g.cf_user} />
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/konsultasi"
            className="flex items-center justify-center gap-2 flex-1 px-6 py-3 rounded-xl border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Konsultasi Ulang
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 flex-1 px-6 py-3 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
          >
            Selesai <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
