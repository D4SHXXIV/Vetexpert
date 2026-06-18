import { PublicNavbar } from "@/components/public/PublicNavbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNavbar />
      <main className="flex-1">{children}</main>
      <footer className="bg-[hsl(var(--sidebar-bg))] text-[hsl(var(--sidebar-fg))] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-2">
          <p className="font-semibold text-white">VetExpert</p>
          <p className="text-sm text-[hsl(var(--sidebar-muted))]">
            Sistem Pakar Diagnosa Awal Penyakit Kucing dan Anjing
          </p>
          <p className="text-xs text-[hsl(var(--sidebar-muted))]">
            Menggunakan Metode Certainty Factor (CF) &copy; 2024
          </p>
        </div>
      </footer>
    </div>
  );
}
