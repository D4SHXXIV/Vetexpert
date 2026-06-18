"use client";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { StatCard } from "@/components/admin/StatCard";
import {
  Stethoscope,
  Bug,
  GitBranch,
  ClipboardList,
  Cat,
  Dog,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const recentDiagnosa = [
  { id: 1, pemilik: "Budi Santoso", hewan: "Mochi", jenis: "KUCING", penyakit: "Panleukopenia", cf: 78.4, tanggal: "18 Jun 2024" },
  { id: 2, pemilik: "Siti Rahayu", hewan: "Rex", jenis: "ANJING", penyakit: "Distemper Anjing", cf: 65.2, tanggal: "17 Jun 2024" },
  { id: 3, pemilik: "Ahmad Fauzi", hewan: "Kitty", jenis: "KUCING", penyakit: "Ringworm", cf: 52.8, tanggal: "16 Jun 2024" },
  { id: 4, pemilik: "Dewi Lestari", hewan: "Max", jenis: "ANJING", penyakit: "Parvovirus", cf: 88.1, tanggal: "15 Jun 2024" },
];

export default function AdminDashboardPage() {
  return (
    <AdminLayout title="Dashboard" subtitle="Selamat datang di panel admin VetExpert">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            title="Total Penyakit"
            value={24}
            icon={Stethoscope}
            description="12 Kucing · 12 Anjing"
            trend={{ value: 4.2, positive: true }}
            color="green"
          />
          <StatCard
            title="Total Gejala"
            value={48}
            icon={Bug}
            description="Data gejala dalam basis pengetahuan"
            trend={{ value: 8.0, positive: true }}
            color="blue"
          />
          <StatCard
            title="Total Rule CF"
            value={186}
            icon={GitBranch}
            description="Relasi penyakit-gejala"
            trend={{ value: 12.5, positive: true }}
            color="purple"
          />
          <StatCard
            title="Total Diagnosa"
            value={312}
            icon={ClipboardList}
            description="Konsultasi berhasil diproses"
            trend={{ value: 23.1, positive: true }}
            color="orange"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent diagnosa */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-foreground">Riwayat Diagnosa Terbaru</h2>
                <p className="text-xs text-muted-foreground mt-0.5">4 konsultasi terakhir</p>
              </div>
              <Link
                href="/admin/riwayat"
                className="flex items-center gap-1 text-xs text-primary hover:underline font-medium"
              >
                Lihat semua <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wide">Pemilik / Hewan</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wide">Diagnosa</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wide">CF</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wide">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentDiagnosa.map((d) => (
                    <tr key={d.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${d.jenis === "KUCING" ? "bg-green-100" : "bg-blue-100"}`}>
                            {d.jenis === "KUCING" ? (
                              <Cat className="w-3.5 h-3.5 text-green-600" />
                            ) : (
                              <Dog className="w-3.5 h-3.5 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-foreground leading-tight">{d.hewan}</p>
                            <p className="text-xs text-muted-foreground">{d.pemilik}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-foreground font-medium">{d.penyakit}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-muted rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full ${d.cf >= 70 ? "bg-red-500" : d.cf >= 40 ? "bg-yellow-500" : "bg-green-500"}`}
                              style={{ width: `${d.cf}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono text-muted-foreground">{d.cf}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-muted-foreground">{d.tanggal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-border shadow-sm p-6">
            <h2 className="font-semibold text-foreground mb-4">Akses Cepat</h2>
            <div className="space-y-2">
              {[
                { label: "Tambah Penyakit Baru", href: "/admin/penyakit", icon: Stethoscope, color: "text-green-600 bg-green-50" },
                { label: "Tambah Gejala Baru", href: "/admin/gejala", icon: Bug, color: "text-blue-600 bg-blue-50" },
                { label: "Kelola Rule CF", href: "/admin/rule-cf", icon: GitBranch, color: "text-purple-600 bg-purple-50" },
                { label: "Lihat Riwayat", href: "/admin/riwayat", icon: ClipboardList, color: "text-orange-600 bg-orange-50" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color}`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>

            {/* Distribution */}
            <div className="mt-6 pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                Distribusi Diagnosa
              </h3>
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span className="flex items-center gap-1"><Cat className="w-3 h-3" /> Kucing</span>
                    <span>58%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-green-500" style={{ width: "58%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span className="flex items-center gap-1"><Dog className="w-3 h-3" /> Anjing</span>
                    <span>42%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-blue-500" style={{ width: "42%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
