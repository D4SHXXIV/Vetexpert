"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { Modal } from "@/components/admin/Modal";
import { Eye, Cat, Dog, CheckCircle, AlertTriangle, Trash2 } from "lucide-react";
import { deleteRiwayat } from "@/app/actions/admin";

interface RiwayatDiagnosa {
  id: number;
  nama_pemilik: string;
  nama_hewan: string;
  jenis_hewan: "KUCING" | "ANJING";
  hasil_diagnosa: string;
  cf_hasil: number;
  persentase: number;
  tanggal: string;
}

function CFMeter({ pct }: { pct: number }) {
  const color = pct >= 70 ? "bg-red-500" : pct >= 40 ? "bg-yellow-500" : "bg-green-500";
  return (
    <div className="flex items-center gap-2">
      <div className="w-20 bg-muted rounded-full h-1.5 overflow-hidden">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-mono text-muted-foreground">{pct.toFixed(1)}%</span>
    </div>
  );
}

export default function RiwayatClient({ initialData }: { initialData: RiwayatDiagnosa[] }) {
  const [data, setData] = useState<RiwayatDiagnosa[]>(initialData);
  const [viewItem, setViewItem] = useState<RiwayatDiagnosa | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await deleteRiwayat(id);
      setData(data.filter(r => r.id !== id));
      setDeleteId(null);
    } catch (e) {
      alert("Gagal menghapus riwayat");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "nama_hewan", label: "Hewan / Pemilik", render: (row: RiwayatDiagnosa) => (
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${row.jenis_hewan === "KUCING" ? "bg-green-100" : "bg-blue-100"}`}>
            {row.jenis_hewan === "KUCING" ? <Cat className="w-3.5 h-3.5 text-green-600" /> : <Dog className="w-3.5 h-3.5 text-blue-600" />}
          </div>
          <div>
            <p className="font-medium text-foreground text-sm leading-tight">{row.nama_hewan}</p>
            <p className="text-xs text-muted-foreground">{row.nama_pemilik}</p>
          </div>
        </div>
      ),
    },
    {
      key: "jenis_hewan", label: "Jenis", render: (row: RiwayatDiagnosa) => (
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${row.jenis_hewan === "KUCING" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}>
          {row.jenis_hewan === "KUCING" ? "Kucing" : "Anjing"}
        </span>
      ),
    },
    {
      key: "hasil_diagnosa", label: "Diagnosa", render: (row: RiwayatDiagnosa) => (
        <span className="font-medium text-foreground">{row.hasil_diagnosa}</span>
      ),
    },
    { key: "persentase", label: "Nilai CF", render: (row: RiwayatDiagnosa) => <CFMeter pct={row.persentase} /> },
    { key: "tanggal", label: "Tanggal", render: (row: RiwayatDiagnosa) => <span className="text-xs text-muted-foreground">{row.tanggal}</span> },
    {
      key: "actions", label: "Aksi", render: (row: RiwayatDiagnosa) => (
        <div className="flex items-center gap-1.5">
          <button onClick={() => setViewItem(row)} className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors" title="Lihat Detail">
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setDeleteId(row.id)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors" title="Hapus">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout title="Riwayat Diagnosa" subtitle="Histori seluruh sesi konsultasi">
      <DataTable
        data={data}
        columns={columns}
        searchPlaceholder="Cari nama hewan..."
        searchKey="nama_hewan"
      />

      {/* Detail Modal */}
      <Modal open={viewItem !== null} onClose={() => setViewItem(null)} title="Detail Hasil Diagnosa" size="md">
        {viewItem && (
          <div className="space-y-5">
            {/* Patient info */}
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${viewItem.jenis_hewan === "KUCING" ? "bg-green-100" : "bg-blue-100"}`}>
                {viewItem.jenis_hewan === "KUCING" ? <Cat className="w-5 h-5 text-green-600" /> : <Dog className="w-5 h-5 text-blue-600" />}
              </div>
              <div>
                <p className="font-semibold text-foreground">{viewItem.nama_hewan}</p>
                <p className="text-xs text-muted-foreground">Pemilik: {viewItem.nama_pemilik} &bull; {viewItem.tanggal}</p>
              </div>
            </div>

            {/* Result */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center gap-2 text-green-800 font-semibold text-sm mb-1">
                <CheckCircle className="w-4 h-4" />
                Hasil Diagnosa
              </div>
              <p className="text-lg font-bold text-foreground">{viewItem.hasil_diagnosa}</p>
            </div>

            {/* CF */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-foreground">Nilai Certainty Factor</span>
                <span className="font-bold text-foreground">{viewItem.persentase.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-2.5 rounded-full ${viewItem.persentase >= 70 ? "bg-red-500" : viewItem.persentase >= 40 ? "bg-yellow-500" : "bg-green-500"}`}
                  style={{ width: `${viewItem.persentase}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">CF = {viewItem.cf_hasil.toFixed(4)}</p>
            </div>

            <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
              <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-yellow-700">Hasil ini adalah estimasi awal. Konsultasikan dengan dokter hewan untuk penanganan tepat.</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirm */}
      <Modal open={deleteId !== null} onClose={() => setDeleteId(null)} title="Konfirmasi Hapus" size="sm">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="font-semibold">Hapus Riwayat ini?</p>
            <p className="text-sm text-muted-foreground mt-1">Riwayat diagnosis ini akan dihapus secara permanen.</p>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">Batal</button>
            <button onClick={() => deleteId && handleDelete(deleteId)} disabled={loading} className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition-colors">
              {loading ? "Menghapus..." : "Hapus"}
            </button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
