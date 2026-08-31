<p align="center">
  <img src="sistem-pakar/public/favicon.ico" alt="VetExpert Logo" width="80" />
</p>

<h1 align="center">🐾 VetExpert</h1>

<p align="center">
  <strong>Sistem Pakar Diagnosa Awal Penyakit Kucing dan Anjing Berbasis Web dengan Metode Certainty Factor</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/MySQL-8-4479A1?logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss" alt="Tailwind CSS" />
</p>

---

## 📖 Deskripsi Program

**VetExpert** adalah aplikasi web sistem pakar yang dirancang untuk membantu pemilik hewan peliharaan melakukan diagnosa awal penyakit pada **kucing** dan **anjing**. Sistem ini menggunakan metode **Forward Chaining** untuk menemukan kandidat penyakit berdasarkan gejala yang dipilih pengguna, kemudian menghitung tingkat kepastian (certainty) menggunakan metode **Certainty Factor (CF)**.

Aplikasi ini dibangun sebagai proyek **Ujian Akhir Semester (UAS)** mata kuliah **Sistem Pakar** pada Semester 6.

---

## 🔍 Overview

VetExpert menyediakan dua sisi utama:

1. **Sisi Publik** — Pengguna umum (pemilik hewan) dapat melakukan konsultasi diagnosa dengan memilih gejala yang dialami hewan peliharaan mereka. Sistem kemudian menganalisis gejala tersebut dan menampilkan hasil diagnosa beserta persentase kepastian.

2. **Sisi Admin** — Administrator (pakar/dokter hewan) dapat mengelola seluruh basis pengetahuan sistem, termasuk data penyakit, gejala, rule CF, serta melihat riwayat konsultasi pengguna.

### Alur Kerja Sistem

```
Pengguna Input Gejala
        │
        ▼
┌─────────────────────┐
│   Forward Chaining   │ ── Mencari kandidat penyakit berdasarkan gejala
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Certainty Factor    │ ── Menghitung CF: CF(H,E) = CF_pakar × CF_user
│  Calculation         │    CF_combine = CF_old + CF_new × (1 − CF_old)
└─────────┬───────────┘
          │
          ▼
   Hasil Diagnosa
  (Penyakit + Persentase CF + Solusi)
```

---

## 🛠️ Tech Stack

### Frontend

| Teknologi | Versi | Keterangan |
|---|---|---|
| [Next.js](https://nextjs.org/) | 16 | React framework dengan App Router & Server Components |
| [React](https://react.dev/) | 19 | Library UI deklaratif |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Superset JavaScript dengan static typing |
| [Tailwind CSS](https://tailwindcss.com/) | 4 | Utility-first CSS framework |
| [Radix UI](https://www.radix-ui.com/) | Latest | Headless UI primitives (Dialog, Select, Dropdown, dll.) |
| [Lucide React](https://lucide.dev/) | Latest | Icon library |
| [class-variance-authority](https://cva.style/) | 0.7 | Variant-based component styling |

### Backend & Database

| Teknologi | Keterangan |
|---|---|
| [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) | REST API endpoint (Route Handlers) |
| [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) | Server-side mutations & data fetching |
| [Prisma ORM](https://www.prisma.io/) | ORM untuk query database dengan type safety |
| [MySQL](https://www.mysql.com/) | Relational Database Management System |

### Tools & DevOps

| Tool | Keterangan |
|---|---|
| [ESLint](https://eslint.org/) | Linting & code quality |
| [PostCSS](https://postcss.org/) | CSS processing |
| [Git](https://git-scm.com/) | Version control |
| [Node.js](https://nodejs.org/) | JavaScript runtime |

---

## 📁 Struktur Folder

```
Vetexpert/
├── prisma/
│   └── schema.prisma              # Definisi skema database Prisma
├── sistem-pakar/                   # Direktori utama aplikasi Next.js
│   ├── prisma/
│   │   └── schema.prisma
│   ├── public/                     # Aset statis (gambar, ikon)
│   ├── src/
│   │   ├── app/
│   │   │   ├── (public)/           # Route group: halaman publik
│   │   │   │   ├── page.tsx        # Landing page / Homepage
│   │   │   │   ├── konsultasi/     # Halaman form konsultasi
│   │   │   │   ├── hasil-diagnosa/ # Halaman hasil diagnosa
│   │   │   │   └── layout.tsx      # Layout publik (navbar)
│   │   │   ├── admin/              # Route group: halaman admin
│   │   │   │   ├── page.tsx        # Dashboard admin
│   │   │   │   ├── DashboardClient.tsx
│   │   │   │   ├── gejala/         # CRUD data gejala
│   │   │   │   ├── penyakit/       # CRUD data penyakit
│   │   │   │   ├── rule-cf/        # CRUD rule Certainty Factor
│   │   │   │   ├── riwayat/        # Riwayat konsultasi
│   │   │   │   └── layout.tsx      # Layout admin (sidebar)
│   │   │   ├── api/
│   │   │   │   ├── auth/           # API endpoint autentikasi
│   │   │   │   └── diagnosa/       # API endpoint proses diagnosa
│   │   │   ├── actions/
│   │   │   │   └── admin.ts        # Server Actions untuk admin CRUD
│   │   │   ├── login/              # Halaman login admin
│   │   │   ├── globals.css         # Global styles & design tokens
│   │   │   └── layout.tsx          # Root layout
│   │   ├── components/
│   │   │   ├── admin/              # Komponen UI admin
│   │   │   │   ├── AdminHeader.tsx
│   │   │   │   ├── AdminLayout.tsx
│   │   │   │   ├── AdminSidebar.tsx
│   │   │   │   ├── DataTable.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   └── StatCard.tsx
│   │   │   └── public/             # Komponen UI publik
│   │   │       └── PublicNavbar.tsx
│   │   ├── lib/
│   │   │   ├── auth.ts             # Utility autentikasi (JWT/token)
│   │   │   └── utils.ts            # Utility umum (cn helper, dll.)
│   │   ├── services/
│   │   │   └── diagnosis.service.ts # Logic diagnosa (FC + CF)
│   │   ├── utils/
│   │   │   ├── certainty-factor.ts  # Implementasi algoritma CF
│   │   │   └── forward-chaining.ts  # Implementasi algoritma Forward Chaining
│   │   └── middleware.ts            # Middleware autentikasi route admin
│   ├── package.json
│   └── tsconfig.json
├── Data.md                          # Knowledge base (data penyakit, gejala, rule)
├── sistem_pakar_hewan (1).sql       # SQL dump database
└── README.md
```

---

## ✨ Fitur Utama

### 🩺 Konsultasi Diagnosa (Publik)
- Form input data hewan peliharaan (nama pemilik, nama hewan, usia, jenis hewan)
- Pemilihan gejala berdasarkan jenis hewan (kucing/anjing)
- Input tingkat keyakinan user (CF User) untuk setiap gejala
- Proses diagnosa otomatis dengan **Forward Chaining + Certainty Factor**
- Tampilan hasil diagnosa dengan **persentase kepastian** dan **solusi penanganan**

### 📊 Dashboard Admin
- **Statistik ringkasan** — Total penyakit, gejala, rule CF, dan konsultasi
- **Manajemen Penyakit** — CRUD data penyakit (kode, nama, jenis hewan, deskripsi, solusi)
- **Manajemen Gejala** — CRUD data gejala (kode, nama gejala)
- **Manajemen Rule CF** — CRUD relasi penyakit-gejala beserta nilai CF pakar
- **Riwayat Konsultasi** — Melihat seluruh riwayat diagnosa pengguna

### 🔐 Autentikasi
- Login admin dengan session cookie
- Middleware proteksi route `/admin`
- Auto-redirect jika sudah login / belum login

---

## 👥 User Roles

| Role | Akses | Deskripsi |
|---|---|---|
| **Pengguna Umum** | Halaman publik (`/`, `/konsultasi`, `/hasil-diagnosa`) | Pemilik hewan yang ingin melakukan konsultasi diagnosa awal. Tidak perlu login. |
| **Admin** | Halaman admin (`/admin/*`) | Pakar/pengelola sistem yang mengelola basis pengetahuan dan memantau riwayat konsultasi. Harus login melalui `/login`. |

---

## 🗄️ Database

Aplikasi menggunakan **MySQL** sebagai database relasional, dengan **Prisma ORM** sebagai abstraksi query.

### Entity Relationship Diagram (ERD)

```mermaid
erDiagram
    Penyakit ||--o{ RuleCF : "memiliki"
    Gejala ||--o{ RuleCF : "memiliki"
    Gejala ||--o{ DetailKonsultasi : "dipilih di"
    Konsultasi ||--o{ DetailKonsultasi : "memiliki"

    Penyakit {
        int id PK
        string kode_penyakit UK
        string nama_penyakit
        enum jenis_hewan
        text deskripsi
        text solusi
        datetime createdAt
        datetime updatedAt
    }

    Gejala {
        int id PK
        string kode_gejala UK
        string nama_gejala
        datetime createdAt
        datetime updatedAt
    }

    RuleCF {
        int id PK
        int penyakit_id FK
        int gejala_id FK
        float cf_pakar
    }

    Konsultasi {
        int id PK
        datetime tanggal
        string nama_pemilik
        string nama_hewan
        string usia_hewan
        enum jenis_hewan
        string hasil_diagnosa
        float cf_hasil
    }

    DetailKonsultasi {
        int id PK
        int konsultasi_id FK
        int gejala_id FK
        float cf_user
    }
```

### Tabel Utama

| Tabel | Deskripsi |
|---|---|
| `penyakit` | Menyimpan data penyakit hewan (10 penyakit: 5 kucing, 5 anjing) |
| `gejala` | Menyimpan data gejala (39 gejala) |
| `rule_cf` | Basis pengetahuan: relasi penyakit-gejala dengan nilai CF pakar (49 rule) |
| `konsultasi` | Sesi konsultasi/diagnosa pengguna |
| `detail_konsultasi` | Detail gejala yang dipilih per sesi konsultasi |

---

## 🧠 Metode Inferensi

### 1. Forward Chaining

Forward Chaining digunakan untuk mencari **kandidat penyakit** berdasarkan gejala yang dipilih pengguna. Algoritma mencocokkan gejala input dengan rule yang ada di basis pengetahuan.

### 2. Certainty Factor (CF)

Certainty Factor digunakan untuk menghitung **tingkat kepastian** diagnosa. Rumus yang digunakan:

```
CF(H,E) = CF_pakar × CF_user
CF_combine = CF_old + CF_new × (1 − CF_old)
```

**Skala CF Pakar:**

| Nilai CF | Keterangan |
|---|---|
| 1.0 | Sangat Yakin |
| 0.8 – 0.9 | Yakin |
| 0.6 – 0.7 | Cukup Yakin |
| 0.4 – 0.5 | Sedikit Yakin |

---

## 📊 Knowledge Base

| Komponen | Jumlah |
|---|---|
| Penyakit | 10 (5 kucing, 5 anjing) |
| Gejala | 39 |
| Relasi Penyakit-Gejala | 49 |
| Rule IF-THEN | 20 |
| Data CF Pakar | 49 |

### Daftar Penyakit

| Kode | Penyakit | Hewan |
|---|---|---|
| P001 | Calicivirus | Kucing |
| P002 | Panleukopenia | Kucing |
| P003 | Scabies | Kucing |
| P004 | FIV (Feline Immunodeficiency Virus) | Kucing |
| P005 | FeLV (Feline Leukemia Virus) | Kucing |
| P006 | Parvovirus | Anjing |
| P007 | Distemper | Anjing |
| P008 | Demodex | Anjing |
| P009 | Rabies | Anjing |
| P010 | Pneumonia | Anjing |

---

## ⚙️ Instalasi & Menjalankan Proyek

### Prasyarat

- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/) v8+
- [Git](https://git-scm.com/)

### Langkah-langkah

1. **Clone repository**

   ```bash
   git clone https://github.com/D4SHXXIV/Sistem-Pakar-Diagnosa-Awal-Penyakit-Kucing-dan-Anjing-Berbasis-Web-dengan-Metode-Certainty-Factor.git
   cd Vetexpert/sistem-pakar
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Konfigurasi environment**

   Buat file `.env` di folder `sistem-pakar/` dan isi dengan konfigurasi berikut:

   ```env
   DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/sistem_pakar_hewan"
   JWT_SECRET="your-secret-key"
   ```

4. **Setup database**

   ```bash
   # Migrasi & generate Prisma Client
   npx prisma db push
   npx prisma generate

   # (Opsional) Seed data awal
   node seed.js
   ```

   Atau import SQL dump secara manual:

   ```bash
   mysql -u root -p sistem_pakar_hewan < ../sistem_pakar_hewan\ \(1\).sql
   ```

5. **Jalankan development server**

   ```bash
   npm run dev
   ```

6. **Buka di browser**

   ```
   http://localhost:3000
   ```

---

## 📸 Screenshot

> _Screenshot aplikasi dapat ditambahkan di sini._

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan akademis — **Ujian Akhir Semester (UAS) Sistem Pakar, Semester 6**.

---

<p align="center">
  Dibuat dengan ❤️ menggunakan <strong>Next.js</strong>, <strong>Prisma</strong>, dan <strong>Certainty Factor</strong>
</p>
