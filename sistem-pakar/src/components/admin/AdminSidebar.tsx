"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Stethoscope,
  Bug,
  GitBranch,
  ClipboardList,
  X,
  PawPrint,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Data Penyakit",
    href: "/admin/penyakit",
    icon: Stethoscope,
  },
  {
    label: "Data Gejala",
    href: "/admin/gejala",
    icon: Bug,
  },
  {
    label: "Rule CF",
    href: "/admin/rule-cf",
    icon: GitBranch,
  },
  {
    label: "Riwayat Diagnosa",
    href: "/admin/riwayat",
    icon: ClipboardList,
  },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    if (confirm("Apakah Anda yakin ingin keluar dari panel admin?")) {
      try {
        const res = await fetch("/api/auth/logout", { method: "POST" });
        if (res.ok) {
          window.location.href = "/login";
        } else {
          alert("Gagal logout, silakan coba lagi.");
        }
      } catch (err) {
        console.error("Error logging out:", err);
      }
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen w-64 flex flex-col transition-transform duration-300 ease-in-out",
          "sidebar-bg sidebar-fg",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:static lg:z-auto lg:h-screen"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-[hsl(var(--sidebar-border))]">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[hsl(var(--sidebar-accent))] text-white shadow-lg">
            <PawPrint className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm leading-tight text-white truncate">VetExpert</p>
            <p className="text-xs text-[hsl(var(--sidebar-muted))] truncate">Admin Panel</p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--sidebar-muted))]">
            Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-[hsl(var(--sidebar-accent))] text-white shadow-md"
                    : "text-[hsl(var(--sidebar-fg))] hover:bg-white/10"
                )}
              >
                <Icon className={cn("w-4.5 h-4.5 flex-shrink-0", isActive ? "text-white" : "text-[hsl(var(--sidebar-muted))] group-hover:text-white")} />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-4 py-4 border-t border-[hsl(var(--sidebar-border))] space-y-1.5">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-[hsl(var(--sidebar-muted))] hover:bg-white/10 hover:text-white transition-all"
          >
            <PawPrint className="w-4 h-4" />
            <span>Halaman Publik</span>
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-300 hover:bg-red-950/30 hover:text-red-200 transition-all cursor-pointer text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Admin</span>
          </button>
        </div>
      </aside>
    </>
  );
}
