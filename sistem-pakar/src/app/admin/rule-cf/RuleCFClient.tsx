"use client";

import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { DataTable } from "@/components/admin/DataTable";
import { Modal } from "@/components/admin/Modal";
import { Pencil, Trash2 } from "lucide-react";
import { saveRuleCF, deleteRuleCF } from "@/app/actions/admin";

interface RuleCF {
  id: number;
  penyakit_id: number;
  penyakit_nama: string;
  gejala_id: number;
  gejala_nama: string;
  cf_pakar: number;
}

const defaultForm = { penyakit_id: 0, gejala_id: 0, cf_pakar: 0.5 };

function CFBadge({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color = pct >= 70 ? "text-red-700 bg-red-50 border-red-200" : pct >= 40 ? "text-yellow-700 bg-yellow-50 border-yellow-200" : "text-green-700 bg-green-50 border-green-200";
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-mono font-semibold px-2 py-0.5 rounded-md border ${color}`}>
      {value.toFixed(2)}
    </span>
  );
}

export default function RuleCFClient({ initialData, penyakitList, gejalaList }: { initialData: RuleCF[], penyakitList: any[], gejalaList: any[] }) {
  const [data, setData] = useState<RuleCF[]>(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editItem, setEditItem] = useState<RuleCF | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const openAdd = () => {
    setEditItem(null);
    setForm({ penyakit_id: penyakitList[0]?.id || 0, gejala_id: gejalaList[0]?.id || 0, cf_pakar: 0.5 });
    setModalOpen(true);
  };

  const openEdit = (item: RuleCF) => {
    setEditItem(item);
    setForm({ penyakit_id: item.penyakit_id, gejala_id: item.gejala_id, cf_pakar: item.cf_pakar });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.penyakit_id || !form.gejala_id) return;
    setLoading(true);
    try {
      await saveRuleCF({ id: editItem?.id, ...form });
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
      await deleteRuleCF(id);
      setDeleteId(null);
    } catch (e) {
      alert("Terjadi kesalahan saat menghapus data");
    } finally {
      setLoading(false);
    }
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
        searchPlaceholder="Cari penyakit..."
        searchKey="penyakit_nama"
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? "Edit Rule CF" : "Tambah Rule CF"}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Penyakit <span className="text-red-500">*</span></label>
            <select value={form.penyakit_id} onChange={(e) => setForm((f) => ({ ...f, penyakit_id: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
              <option value="0" disabled>Pilih Penyakit</option>
              {penyakitList.map(p => <option key={p.id} value={p.id}>{p.kode_penyakit} - {p.nama_penyakit}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Gejala <span className="text-red-500">*</span></label>
            <select value={form.gejala_id} onChange={(e) => setForm((f) => ({ ...f, gejala_id: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
              <option value="0" disabled>Pilih Gejala</option>
              {gejalaList.map(g => <option key={g.id} value={g.id}>{g.kode_gejala} - {g.nama_gejala}</option>)}
            </select>
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
            <button onClick={handleSave} disabled={!form.penyakit_id || !form.gejala_id || loading}
              className="px-6 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm">
              {loading ? "Menyimpan..." : (editItem ? "Simpan" : "Tambah Rule")}
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
            <button onClick={() => deleteId && handleDelete(deleteId)} disabled={loading} className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition-colors">
              {loading ? "Menghapus..." : "Hapus"}
            </button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
