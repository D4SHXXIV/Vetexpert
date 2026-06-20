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

interface DashboardProps {
  stats: {
    totalPenyakit: number;
    totalGejala: number;
    totalRuleCF: number;
    totalDiagnosa: number;
  };
  recentDiagnosa: {
    id: number;
    pemilik: string;
    hewan: string;
    jenis: "KUCING" | "ANJING";
    penyakit: string;
    cf: number;
    tanggal: string;
  }[];
  distribusi: {
    kucingPct: number;
    anjingPct: number;
  };
}

export default function DashboardClient({ stats, recentDiagnosa, distribusi }: DashboardProps) {
  return (
    <AdminLayout title="Dashboard" subtitle="Selamat datang di panel admin VetExpert">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            title="Total Penyakit"
            value={stats.totalPenyakit}
            icon={Stethoscope}
            description="Data penyakit di sistem"
            trend={{ value: 0, positive: true }}
            color="green"
          />
          <StatCard
            title="Total Gejala"
            value={stats.totalGejala}
            icon={Bug}
            description="Data gejala di sistem"
            trend={{ value: 0, positive: true }}
            color="blue"
          />
          <StatCard
            title="Total Rule CF"
            value={stats.totalRuleCF}
            icon={GitBranch}
            description="Relasi penyakit-gejala"
            trend={{ value: 0, positive: true }}
            color="purple"
          />
          <StatCard
            title="Total Diagnosa"
            value={stats.totalDiagnosa}
            icon={ClipboardList}
            description="Konsultasi telah diproses"
            trend={{ value: 0, positive: true }}
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
                    <th className="text-left px-6 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wide">Hewan / Pemilik</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wide">Diagnosa</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wide">CF</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wide">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentDiagnosa.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-6 text-muted-foreground text-xs">Belum ada riwayat diagnosa</td>
                    </tr>
                  ) : recentDiagnosa.map((d) => (
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
                          <span className="text-xs font-mono text-muted-foreground">{d.cf.toFixed(1)}%</span>
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
                    <span>{distribusi.kucingPct.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-green-500" style={{ width: `${distribusi.kucingPct}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span className="flex items-center gap-1"><Dog className="w-3 h-3" /> Anjing</span>
                    <span>{distribusi.anjingPct.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${distribusi.anjingPct}%` }} />
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
