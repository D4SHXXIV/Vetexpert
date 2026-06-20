"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { Modal } from "@/components/admin/Modal";
import { Pencil, Trash2, Cat, Dog } from "lucide-react";
import { savePenyakit, deletePenyakit } from "@/app/actions/admin";

type JenisHewan = "KUCING" | "ANJING";

interface Penyakit {
  id: number;
  kode_penyakit: string;
  nama_penyakit: string;
  jenis_hewan: JenisHewan;
  deskripsi: string;
  solusi: string;
}

const defaultForm: Omit<Penyakit, "id"> = {
  kode_penyakit: "",
  nama_penyakit: "",
  jenis_hewan: "KUCING",
  deskripsi: "",
  solusi: "",
};

export default function PenyakitClient({ initialData }: { initialData: Penyakit[] }) {
  const [data, setData] = useState<Penyakit[]>(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<Penyakit | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const openAdd = () => {
    setEditItem(null);
    setForm(defaultForm);
    setModalOpen(true);
  };

  const openEdit = (item: Penyakit) => {
    setEditItem(item);
    setForm({ kode_penyakit: item.kode_penyakit, nama_penyakit: item.nama_penyakit, jenis_hewan: item.jenis_hewan, deskripsi: item.deskripsi, solusi: item.solusi });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.kode_penyakit || !form.nama_penyakit) return;
    setLoading(true);
    try {
      await savePenyakit({ id: editItem?.id, ...form });
      setModalOpen(false);
    } catch (e) {
      alert("Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await deletePenyakit(id);
      setDeleteId(null);
    } catch (e) {
      alert("Terjadi kesalahan saat menghapus data");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: "kode_penyakit", label: "Kode", render: (row: Penyakit) => (
      <span className="font-mono text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-md">{row.kode_penyakit}</span>
    )},
    { key: "nama_penyakit", label: "Nama Penyakit", render: (row: Penyakit) => (
      <span className="font-medium text-foreground">{row.nama_penyakit}</span>
    )},
    { key: "jenis_hewan", label: "Hewan", render: (row: Penyakit) => (
      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${row.jenis_hewan === "KUCING" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}>
        {row.jenis_hewan === "KUCING" ? <Cat className="w-3 h-3" /> : <Dog className="w-3 h-3" />}
        {row.jenis_hewan === "KUCING" ? "Kucing" : "Anjing"}
      </span>
    )},
    { key: "deskripsi", label: "Deskripsi", render: (row: Penyakit) => (
      <span className="text-muted-foreground text-xs line-clamp-2 max-w-xs">{row.deskripsi}</span>
    )},
    { key: "actions", label: "Aksi", render: (row: Penyakit) => (
      <div className="flex items-center gap-1.5">
        <button onClick={() => openEdit(row)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors" title="Edit">
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => setDeleteId(row.id)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors" title="Hapus">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    )},
  ];

  return (
    <AdminLayout title="Data Penyakit" subtitle="Kelola basis pengetahuan penyakit hewan">
      <DataTable
        data={data}
        columns={columns}
        onAdd={openAdd}
        addLabel="Tambah Penyakit"
        searchPlaceholder="Cari penyakit..."
        searchKey="nama_penyakit"
      />

      {/* Add/Edit Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? "Edit Penyakit" : "Tambah Penyakit"} size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Kode Penyakit <span className="text-red-500">*</span></label>
              <input value={form.kode_penyakit} onChange={(e) => setForm((f) => ({ ...f, kode_penyakit: e.target.value }))}
                placeholder="P001" className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Jenis Hewan <span className="text-red-500">*</span></label>
              <select value={form.jenis_hewan} onChange={(e) => setForm((f) => ({ ...f, jenis_hewan: e.target.value as JenisHewan }))}
                className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
                <option value="KUCING">Kucing</option>
                <option value="ANJING">Anjing</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Nama Penyakit <span className="text-red-500">*</span></label>
            <input value={form.nama_penyakit} onChange={(e) => setForm((f) => ({ ...f, nama_penyakit: e.target.value }))}
              placeholder="Nama lengkap penyakit" className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Deskripsi</label>
            <textarea value={form.deskripsi} onChange={(e) => setForm((f) => ({ ...f, deskripsi: e.target.value }))}
              placeholder="Deskripsi penyakit..." rows={3}
              className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Solusi / Penanganan</label>
            <textarea value={form.solusi} onChange={(e) => setForm((f) => ({ ...f, solusi: e.target.value }))}
              placeholder="Langkah penanganan..." rows={3}
              className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" />
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-border">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">Batal</button>
            <button onClick={handleSave} disabled={!form.kode_penyakit || !form.nama_penyakit || loading}
              className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm">
              {loading ? "Menyimpan..." : (editItem ? "Simpan Perubahan" : "Tambah Penyakit")}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirm */}
      <Modal open={deleteId !== null} onClose={() => setDeleteId(null)} title="Konfirmasi Hapus" size="sm">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Hapus Penyakit?</p>
            <p className="text-sm text-muted-foreground mt-1">Tindakan ini tidak dapat dibatalkan dan akan menghapus semua rule CF terkait.</p>
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
