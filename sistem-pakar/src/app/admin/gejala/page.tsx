"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { Modal } from "@/components/admin/Modal";
import { Pencil, Trash2 } from "lucide-react";

interface Gejala {
  id: number;
  kode_gejala: string;
  nama_gejala: string;
}

const dataDummy: Gejala[] = [
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
  { id: 11, kode_gejala: "G011", nama_gejala: "Sering buang air kecil / kesulitan BAK" },
  { id: 12, kode_gejala: "G012", nama_gejala: "Kejang / tremor" },
];

const defaultForm = { kode_gejala: "", nama_gejala: "" };

export default function GejalaPage() {
  const [data, setData] = useState<Gejala[]>(dataDummy);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<Gejala | null>(null);
  const [form, setForm] = useState(defaultForm);

  const openAdd = () => {
    setEditItem(null);
    setForm(defaultForm);
    setModalOpen(true);
  };

  const openEdit = (item: Gejala) => {
    setEditItem(item);
    setForm({ kode_gejala: item.kode_gejala, nama_gejala: item.nama_gejala });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.kode_gejala || !form.nama_gejala) return;
    if (editItem) {
      setData((d) => d.map((g) => (g.id === editItem.id ? { ...g, ...form } : g)));
    } else {
      setData((d) => [...d, { id: Date.now(), ...form }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setData((d) => d.filter((g) => g.id !== id));
    setDeleteId(null);
  };

  const columns = [
    {
      key: "kode_gejala", label: "Kode", render: (row: Gejala) => (
        <span className="font-mono text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md">{row.kode_gejala}</span>
      ),
    },
    {
      key: "nama_gejala", label: "Nama Gejala", render: (row: Gejala) => (
        <span className="font-medium text-foreground">{row.nama_gejala}</span>
      ),
    },
    {
      key: "actions", label: "Aksi", render: (row: Gejala) => (
        <div className="flex items-center gap-1.5">
          <button onClick={() => openEdit(row)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors">
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setDeleteId(row.id)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout title="Data Gejala" subtitle="Kelola daftar gejala penyakit hewan">
      <DataTable
        data={data}
        columns={columns}
        onAdd={openAdd}
        addLabel="Tambah Gejala"
        searchPlaceholder="Cari gejala..."
        searchKey="nama_gejala"
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? "Edit Gejala" : "Tambah Gejala"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Kode Gejala <span className="text-red-500">*</span></label>
            <input value={form.kode_gejala} onChange={(e) => setForm((f) => ({ ...f, kode_gejala: e.target.value }))}
              placeholder="G001" className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Nama Gejala <span className="text-red-500">*</span></label>
            <input value={form.nama_gejala} onChange={(e) => setForm((f) => ({ ...f, nama_gejala: e.target.value }))}
              placeholder="Deskripsi gejala..." className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-border">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">Batal</button>
            <button onClick={handleSave} disabled={!form.kode_gejala || !form.nama_gejala}
              className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm">
              {editItem ? "Simpan" : "Tambah Gejala"}
            </button>
          </div>
        </div>
      </Modal>

      <Modal open={deleteId !== null} onClose={() => setDeleteId(null)} title="Konfirmasi Hapus" size="sm">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Hapus Gejala?</p>
            <p className="text-sm text-muted-foreground mt-1">Gejala ini akan dihapus beserta seluruh rule CF terkait.</p>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">Batal</button>
            <button onClick={() => deleteId && handleDelete(deleteId)} className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors">Hapus</button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
