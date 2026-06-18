import Link from "next/link";
import { PawPrint, Stethoscope, ShieldCheck, ArrowRight, Cat, Dog } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 py-20 sm:py-32">
        {/* Decorative blobs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-200/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <PawPrint className="w-3.5 h-3.5" />
            Sistem Pakar Berbasis Certainty Factor
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6">
            Diagnosa Dini
            <span className="block bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              Penyakit Hewan Peliharaan
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10 leading-relaxed">
            Kenali gejala penyakit kucing & anjing kesayangan Anda lebih awal. Sistem pakar
            kami membantu memberikan perkiraan diagnosa awal secara cepat dan akurat.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/konsultasi"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-white font-semibold shadow-lg hover:bg-primary/90 hover:shadow-primary/30 hover:shadow-xl transition-all duration-200 group"
            >
              Mulai Konsultasi
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/admin"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white border border-border text-foreground font-semibold hover:bg-muted/50 transition-colors shadow-sm"
            >
              Panel Admin
            </Link>
          </div>

          {/* Animal icons */}
          <div className="flex items-center justify-center gap-8 mt-16">
            <div className="flex flex-col items-center gap-2 p-6 bg-white rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
              <Cat className="w-10 h-10 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Kucing</span>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="flex flex-col items-center gap-2 p-6 bg-white rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
              <Dog className="w-10 h-10 text-emerald-600" />
              <span className="text-sm font-medium text-muted-foreground">Anjing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-3">Kenapa VetExpert?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Dibangun dengan algoritma Certainty Factor untuk memberikan hasil diagnosa yang terukur dan dapat dipercaya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Stethoscope,
                title: "Basis Pengetahuan Pakar",
                desc: "Data gejala dan penyakit dikurasi langsung dari dokter hewan berpengalaman.",
                color: "text-green-600 bg-green-50",
              },
              {
                icon: ShieldCheck,
                title: "Metode CF Terukur",
                desc: "Certainty Factor menghasilkan nilai kepercayaan yang transparan untuk setiap diagnosa.",
                color: "text-blue-600 bg-blue-50",
              },
              {
                icon: ArrowRight,
                title: "Hasil Instan",
                desc: "Dapatkan estimasi diagnosa dan solusi penanganan awal dalam hitungan detik.",
                color: "text-purple-600 bg-purple-50",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl border border-border bg-white hover:shadow-md transition-shadow group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${f.color} group-hover:scale-110 transition-transform`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <PawPrint className="w-12 h-12 text-white/80 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Hewan Peliharaan Anda Tidak Sehat?
          </h2>
          <p className="text-green-100 mb-8 text-lg">
            Jangan tunda! Segera lakukan konsultasi dan ketahui kemungkinan penyakitnya.
          </p>
          <Link
            href="/konsultasi"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-green-700 font-semibold hover:bg-green-50 transition-colors shadow-lg"
          >
            Mulai Sekarang <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
