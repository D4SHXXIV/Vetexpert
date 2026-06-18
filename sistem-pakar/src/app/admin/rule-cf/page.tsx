"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { Modal } from "@/components/admin/Modal";
import { Pencil, Trash2 } from "lucide-react";

interface RuleCF {
  id: number;
  penyakit_id: number;
  penyakit_nama: string;
  gejala_id: number;
  gejala_nama: string;
  cf_pakar: number;
}

const dataDummy: RuleCF[] = [
  { id: 1, penyakit_id: 1, penyakit_nama: "Panleukopenia", gejala_id: 1, gejala_nama: "Nafsu makan berkurang", cf_pakar: 0.8 },
  { id: 2, penyakit_id: 1, penyakit_nama: "Panleukopenia", gejala_id: 2, gejala_nama: "Muntah-muntah", cf_pakar: 0.9 },
  { id: 3, penyakit_id: 1, penyakit_nama: "Panleukopenia", gejala_id: 3, gejala_nama: "Diare / feses cair", cf_pakar: 0.8 },
  { id: 4, penyakit_id: 1, penyakit_nama: "Panleukopenia", gejala_id: 4, gejala_nama: "Lemas / tidak aktif", cf_pakar: 0.7 },
  { id: 5, penyakit_id: 2, penyakit_nama: "Calicivirus", gejala_id: 6, gejala_nama: "Batuk / bersin", cf_pakar: 0.8 },
  { id: 6, penyakit_id: 2, penyakit_nama: "Calicivirus", gejala_id: 7, gejala_nama: "Keluar cairan dari hidung / mata", cf_pakar: 0.9 },
  { id: 7, penyakit_id: 4, penyakit_nama: "Distemper Anjing", gejala_id: 5, gejala_nama: "Demam", cf_pakar: 0.7 },
  { id: 8, penyakit_id: 4, penyakit_nama: "Distemper Anjing", gejala_id: 12, gejala_nama: "Kejang / tremor", cf_pakar: 0.9 },
];

const defaultForm = { penyakit_id: 0, penyakit_nama: "", gejala_id: 0, gejala_nama: "", cf_pakar: 0.5 };

function CFBadge({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color = pct >= 70 ? "text-red-700 bg-red-50 border-red-200" : pct >= 40 ? "text-yellow-700 bg-yellow-50 border-yellow-200" : "text-green-700 bg-green-50 border-green-200";
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-mono font-semibold px-2 py-0.5 rounded-md border ${color}`}>
      {value.toFixed(2)}
    </span>
  );
}

export default function RuleCFPage() {
  const [data, setData] = useState<RuleCF[]>(dataDummy);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<RuleCF | null>(null);
  const [form, setForm] = useState(defaultForm);

  const openAdd = () => {
    setEditItem(null);
    setForm(defaultForm);
    setModalOpen(true);
  };

  const openEdit = (item: RuleCF) => {
    setEditItem(item);
    setForm({ penyakit_id: item.penyakit_id, penyakit_nama: item.penyakit_nama, gejala_id: item.gejala_id, gejala_nama: item.gejala_nama, cf_pakar: item.cf_pakar });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.penyakit_nama || !form.gejala_nama) return;
    if (editItem) {
      setData((d) => d.map((r) => (r.id === editItem.id ? { ...r, ...form } : r)));
    } else {
      setData((d) => [...d, { id: Date.now(), ...form }]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setData((d) => d.filter((r) => r.id !== id));
    setDeleteId(null);
  };

  const columns = [
    { key: "penyakit_nama", label: "Penyakit", render: (row: RuleCF) => (
      <span className="font-medium text-foreground">{row.penyakit_nama}</span>
    )},
    { key: "gejala_nama", label: "Gejala", render: (row: RuleCF) => (
      <span className="text-muted-foreground">{row.gejala_nama}</span>
    )},
    { key: "cf_pakar", label: "CF Pakar", render: (row: RuleCF) => <CFBadge value={row.cf_pakar} /> },
    { key: "actions", label: "Aksi", render: (row: RuleCF) => (
      <div className="flex items-center gap-1.5">
        <button onClick={() => openEdit(row)} className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors">
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => setDeleteId(row.id)} className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    )},
  ];

  return (
    <AdminLayout title="Rule CF (Basis Pengetahuan)" subtitle="Kelola nilai CF pakar untuk setiap relasi penyakit-gejala">
      <DataTable
        data={data}
        columns={columns}
        onAdd={openAdd}
        addLabel="Tambah Rule"
        searchPlaceholder="Cari penyakit atau gejala..."
        searchKey="penyakit_nama"
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? "Edit Rule CF" : "Tambah Rule CF"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Penyakit <span className="text-red-500">*</span></label>
            <input value={form.penyakit_nama} onChange={(e) => setForm((f) => ({ ...f, penyakit_nama: e.target.value }))}
              placeholder="Pilih atau ketik nama penyakit" className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Gejala <span className="text-red-500">*</span></label>
            <input value={form.gejala_nama} onChange={(e) => setForm((f) => ({ ...f, gejala_nama: e.target.value }))}
              placeholder="Pilih atau ketik nama gejala" className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Nilai CF Pakar: <span className="font-mono text-primary">{form.cf_pakar.toFixed(2)}</span>
            </label>
            <input type="range" min="0" max="1" step="0.05" value={form.cf_pakar}
              onChange={(e) => setForm((f) => ({ ...f, cf_pakar: parseFloat(e.target.value) }))}
              className="w-full accent-green-600" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0.00 (Tidak yakin)</span>
              <span>1.00 (Pasti)</span>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-border">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors">Batal</button>
            <button onClick={handleSave} disabled={!form.penyakit_nama || !form.gejala_nama}
              className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm">
              {editItem ? "Simpan" : "Tambah Rule"}
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
            <p className="font-semibold">Hapus Rule CF ini?</p>
            <p className="text-sm text-muted-foreground mt-1">Rule ini akan dihapus dari basis pengetahuan.</p>
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
