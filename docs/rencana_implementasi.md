# Rencana Implementasi — LabSim Merdeka
> **Status Dokumen:** Living Document — diperbarui setiap ada perubahan rencana  
> **Kompetisi:** GEMASTIK 2026 — Kategori Pengembangan Perangkat Lunak  
> **Terakhir Diperbarui:** 24 Juni 2026

---

## Status Keseluruhan

| Fase | Status | Target Selesai |
|---|---|---|
| Fase 0 — Perencanaan & Desain | 🟡 Sedang Berjalan | Minggu 2 |
| Fase 1 — Fondasi Sistem | ⬜ Belum Mulai | Minggu 4 |
| Fase 2 — Simulasi Fisika MVP | ⬜ Belum Mulai | Minggu 6 |
| Fase 3 — Kimia + Biologi MVP | ⬜ Belum Mulai | Minggu 9 |
| Fase 4 — Sistem Laporan & Dashboard | ⬜ Belum Mulai | Minggu 10 |
| Fase 5 — Polish, Testing & Deploy | ⬜ Belum Mulai | Minggu 12 |

**Legend:** ✅ Selesai | 🟡 Sedang Berjalan | 🔴 Blocked | ⬜ Belum Mulai

---

## FASE 0 — Perencanaan & Desain (Minggu 1–2)

### 0.1 Dokumen & Arsitektur
- [x] Buat dokumen rancangan teknis komprehensif (`review1.md`)
- [x] Tentukan stack teknologi (Next.js + Express + PostgreSQL)
- [x] Tentukan arsitektur 3 mesin simulasi (Physics/Chemistry/Biology engine)
- [x] Buat silabus materi yang akan diimplementasikan (`silabus.md`)
- [ ] Finalisasi database schema (ERD diagram)
- [ ] Buat API contract document (request/response format per endpoint)

### 0.2 Desain UI/UX
- [x] Buat mockup wireframe halaman simulasi (high-level)
- [ ] Buat mockup high-fidelity: halaman login
- [ ] Buat mockup high-fidelity: dashboard siswa
- [ ] Buat mockup high-fidelity: halaman simulasi Gerak Parabola
- [ ] Buat mockup high-fidelity: halaman simulasi Titrasi Asam-Basa
- [ ] Buat mockup high-fidelity: dashboard guru
- [ ] Buat mockup high-fidelity: laporan praktikum PDF
- [ ] Tentukan design system: warna, tipografi, spacing, komponen

### 0.3 Setup Awal
- [ ] Buat repository GitHub (monorepo atau separated)
- [ ] Setup branch strategy (main / develop / feature/*)
- [ ] Bagi tugas antar anggota tim

---

## FASE 1 — Fondasi Sistem (Minggu 3–4)

### 1.1 Project Setup
- [ ] Init project Next.js 14 (App Router)
- [ ] Setup Tailwind CSS + shadcn/ui
- [ ] Konfigurasi TypeScript strict mode
- [ ] Setup ESLint + Prettier
- [ ] Setup Husky pre-commit hooks

### 1.2 Database & ORM
- [ ] Setup PostgreSQL (lokal: Docker, prod: Neon.tech)
- [ ] Init Prisma + konfigurasi koneksi
- [ ] Buat schema Prisma:
  - [ ] Model `User` (id, name, email, role, school_id)
  - [ ] Model `School` (id, name, npsn, region, is_3t)
  - [ ] Model `Class` (id, name, teacher_id, grade_level)
  - [ ] Model `Simulation` (id, module, slug, title, phase, cp_code)
  - [ ] Model `Assignment` (id, teacher_id, class_id, simulation_id)
  - [ ] Model `ExperimentSession` (id, student_id, assignment_id, parameters JSONB, results JSONB)
  - [ ] Model `WorksheetAnswer` (id, session_id, question_id, answer_text)
- [ ] Jalankan `prisma migrate dev` pertama
- [ ] Buat seed data: admin, 1 guru, 5 siswa dummy, semua simulasi catalog

### 1.3 Autentikasi & Otorisasi
- [ ] Setup NextAuth.js dengan Credentials provider
- [ ] Implementasi JWT session strategy
- [ ] Buat middleware role guard (student/teacher/admin)
- [ ] Halaman Login (`/login`)
- [ ] Halaman Register (`/register`) — atau hanya admin yang bisa buat akun
- [ ] Logout + session cleanup

### 1.4 Layout & Komponen Dasar
- [ ] Layout utama: Sidebar + Topbar + Main Content
- [ ] Sidebar: navigasi berdasarkan role
- [ ] Komponen: Button, Card, Modal, Badge, Avatar, Skeleton
- [ ] Komponen: Slider (untuk variabel simulasi)
- [ ] Komponen: DataTable (untuk tabel data eksperimen)
- [ ] Routing: `/dashboard`, `/simulations`, `/assignments`, `/profile`
- [ ] Halaman 404 & error boundary

### 1.5 API Dasar
- [ ] Setup Express.js sebagai API server (atau Next.js API Routes)
- [ ] Middleware: CORS, helmet, rate limiting, logging (morgan/winston)
- [ ] `POST /api/auth/login`
- [ ] `POST /api/auth/logout`
- [ ] `GET /api/simulations` — list catalog simulasi
- [ ] `GET /api/simulations/:slug` — detail simulasi

---

## FASE 2 — Simulasi Fisika MVP (Minggu 5–6)

### 2.1 Simulation Shell (komponen wrapper generik)
- [ ] Buat komponen `<SimulationShell>` yang bisa wrap simulasi apapun
- [ ] Panel kiri: canvas/visual area
- [ ] Panel kanan: kontrol variabel (slider, input, tombol)
- [ ] Panel bawah: grafik real-time + tabel data
- [ ] Tombol: Play / Pause / Reset / Catat Data
- [ ] Auto-save state ke localStorage (backup jika tab tertutup)

### 2.2 Gerak Parabola (PRIORITAS #1 — paling impresif untuk demo)
- [ ] Canvas setup (HTML5 Canvas 2D)
- [ ] Implementasi kalkulasi:
  - [ ] `v0x = v0 * cos(θ)`, `v0y = v0 * sin(θ)`
  - [ ] `x(t) = v0x * t`, `y(t) = h0 + v0y*t - 0.5*g*t²`
  - [ ] `H_maks`, `R_jangkauan`, `t_total` (analitik)
- [ ] Animasi: bola bergerak dengan jejak lintasan (trail)
- [ ] Mode "freeze frame": pause + tampilkan vektor kecepatan
- [ ] Free body diagram: vektor vx dan vy ditampilkan
- [ ] Grafik: y vs x (parabola), vy vs t — Chart.js atau Recharts
- [ ] Panel hasil: H_maks, R_jangkauan, t_total update real-time
- [ ] Kontrol: slider v₀ (5–50 m/s), slider θ (0–90°), input h₀
- [ ] Validasi input + pesan error jika out-of-range
- [ ] Unit test: validasi hasil vs kalkulasi manual (jest)
- [ ] Worksheet terintegrasi (lihat 2.4)

### 2.3 Hukum Ohm (PRIORITAS #2)
- [ ] Implementasi circuit builder (drag-and-drop sederhana)
  - [ ] Alternatif simpler: pilih topologi dari preset (seri/paralel)
- [ ] Kalkulasi:
  - [ ] Seri: `R_total = R1 + R2 + ...`
  - [ ] Paralel: `1/R_total = 1/R1 + 1/R2 + ...`
  - [ ] `I = V / R_total`, `V_i = I * R_i`
- [ ] Visualisasi: animasi aliran elektron (partikel bergerak di kawat)
- [ ] LED menyala dengan intensitas proporsional daya `P = I²R`
- [ ] Amperemeter dan voltmeter virtual
- [ ] Grafik: V vs I (linear)
- [ ] Unit test kalkulasi

### 2.4 Worksheet Digital (shared untuk semua simulasi)
- [ ] Form: Hipotesis awal (textarea)
- [ ] Tabel data: baris otomatis terisi saat siswa klik "Catat Data"
- [ ] Form: Pertanyaan analisis (dikonfigurasi per simulasi)
- [ ] Form: Kesimpulan (textarea)
- [ ] Auto-save ke DB setiap 30 detik (`PATCH /api/sessions/:id`)
- [ ] Tombol "Submit Laporan" → konfirmasi → submit final

### 2.5 Session Management
- [ ] `POST /api/sessions` — buat sesi baru saat siswa mulai simulasi
- [ ] `PUT /api/sessions/:id` — auto-save data simulasi + worksheet
- [ ] `PATCH /api/sessions/:id/submit` — submit final, lock editing
- [ ] `GET /api/sessions/:id` — load sesi jika siswa kembali ke halaman

---

## FASE 3 — Kimia + Biologi MVP (Minggu 7–9)

### 3.1 Titrasi Asam-Basa (Kimia)
- [ ] Setup Rule-Based Reaction Engine (RBRE):
  - [ ] Buat `substances.json` (HCl, NaOH, CH₃COOH, dll.)
  - [ ] Buat `reactions.json` (aturan reaksi)
  - [ ] Implementasi `ReactionResolver` class
- [ ] UI: Erlenmeyer + Buret animasi
- [ ] Implementasi kalkulasi pH per tetes:
  - [ ] Sebelum TE: `pH = -log([H⁺]_sisa)`
  - [ ] Di TE: `pH = 7` (asam kuat + basa kuat)
  - [ ] Setelah TE: `pH = 14 - pOH`
- [ ] Animasi perubahan warna larutan (CSS transition + pH lookup)
- [ ] Indikator: fenolftalein, metil jingga, universal
- [ ] Grafik kurva titrasi: pH vs Volume titran (real-time)
- [ ] Auto-deteksi titik ekuivalen + highlight di grafik
- [ ] Notifikasi "Titik Ekuivalen Tercapai!" dengan animasi

### 3.2 Reaksi Logam + Asam (Kimia)
- [ ] Pilihan logam: Fe, Zn, Mg, Cu (Cu tidak bereaksi → pembelajaran)
- [ ] Kalkulasi laju gelembung: proporsional `[acid] × reactivity`
- [ ] Animasi gelembung gas H₂ (partikel naik dari permukaan logam)
- [ ] Termometer virtual: tampilkan ΔT untuk reaksi eksoterm
- [ ] Perubahan warna larutan sesuai garam yang terbentuk

### 3.3 Genetika Mendel (Biologi)
- [ ] Punnett Square Engine:
  - [ ] Input: genotipe induk 1 & 2 (AA, Aa, aa)
  - [ ] Hitung: semua kombinasi gamet
  - [ ] Output: distribusi genotipe + fenotipe + rasio Mendel
- [ ] UI: tabel Punnett interaktif (tersusun otomatis)
- [ ] Visual: ikon fenotipe (bunga merah/putih, kacang bulat/keriput)
- [ ] Bar chart: rasio genotipe dan fenotipe
- [ ] Support: monohibrid (2x2) dan dihibrid (4x4)
- [ ] Tabel rekap: siswa bisa lakukan 5+ percobaan berbeda dan lihat pola

### 3.4 Fotosintesis (Biologi — jika waktu memungkinkan)
- [ ] Model Michaelis-Menten untuk laju fotosintesis
- [ ] Slider: intensitas cahaya (0–1000 lux) dan [CO₂] (0.01%–1%)
- [ ] Animasi gelembung O₂ naik dari Hydrilla (SVG)
- [ ] Warna daun berubah sesuai tingkat aktivitas
- [ ] Grafik kurva saturasi cahaya

---

## FASE 4 — Sistem Laporan & Dashboard (Minggu 10)

### 4.1 Laporan Praktikum Otomatis
- [ ] Template laporan HTML (8 bagian standar: tujuan, teori, alat, prosedur, data, analisis, kesimpulan, nilai)
- [ ] Binding data: template + data session → HTML lengkap
- [ ] Generate PDF: Puppeteer (server-side) atau react-pdf
- [ ] `GET /api/sessions/:id/report` → download PDF
- [ ] Preview laporan di browser sebelum download

### 4.2 Assignment System (Guru)
- [ ] Halaman "Buat Tugas" (`/assignments/new`):
  - [ ] Pilih simulasi dari katalog
  - [ ] Set judul, instruksi, deadline
  - [ ] Pilih kelas tujuan
- [ ] `POST /api/assignments`
- [ ] Halaman daftar tugas guru: lihat semua assignment aktif
- [ ] Halaman daftar tugas siswa: hanya tugas untuk kelas mereka

### 4.3 Dashboard Guru
- [ ] Overview kelas: % completion, distribusi nilai
- [ ] List siswa per assignment: status (belum/dalam proses/submitted) + nilai
- [ ] Klik per siswa: lihat detail eksperimen, baca worksheet
- [ ] Beri nilai + komentar (`PATCH /api/sessions/:id/grade`)
- [ ] Export rekap kelas ke CSV
- [ ] Sistem kode kelas: guru generate kode → siswa join dengan kode

### 4.4 Dashboard Siswa
- [ ] Tugas aktif (badge "Baru" jika belum dikerjakan)
- [ ] Tugas selesai + nilai yang sudah diterima
- [ ] History eksperimen: bisa lihat ulang + download laporan
- [ ] Progress bar overall

---

## FASE 5 — Polish, Testing & Deploy (Minggu 11–12)

### 5.1 UI/UX Polish
- [ ] Responsive design: mobile-friendly (min 360px width)
- [ ] Loading skeleton untuk semua halaman
- [ ] Error states yang informatif (bukan hanya "Error 500")
- [ ] Empty states yang friendly (ilustrasi + CTA)
- [ ] Animasi transisi halaman (Framer Motion atau CSS)
- [ ] Dark mode toggle (opsional tapi +1 poin kesan)
- [ ] Aksesibilitas dasar (ARIA labels, keyboard navigation)

### 5.2 Performance
- [ ] Lazy load setiap simulasi (dynamic import Next.js)
- [ ] Web Worker untuk kalkulasi physics berat (agar tidak block UI)
- [ ] Canvas: batasi frame rate di background tab
- [ ] Image optimization (next/image)
- [ ] Grafik: sample data setiap 100ms, bukan setiap frame

### 5.3 PWA (Progressive Web App) — opsional
- [ ] Service worker: cache aset simulasi untuk offline
- [ ] Web App Manifest: bisa di-install ke homescreen
- [ ] Offline indicator

### 5.4 Testing
- [ ] Unit test: semua kalkulasi fisika (jest)
- [ ] Unit test: ReactionResolver (semua kombinasi zat utama)
- [ ] Unit test: Punnett Square semua kombinasi genotipe
- [ ] Integration test: API endpoints utama (supertest)
- [ ] User testing: 5–10 siswa SMA nyata + 1–2 guru
- [ ] Bug fixing dari user testing

### 5.5 Deployment
- [ ] Deploy database ke Neon.tech
- [ ] Deploy frontend + API ke Vercel (atau Railway untuk API terpisah)
- [ ] Setup environment variables production
- [ ] Konfigurasi domain (subdomain .vercel.app sudah cukup)
- [ ] Smoke test production: semua simulasi berjalan
- [ ] Seeding data demo untuk presentasi GEMASTIK

### 5.6 Dokumentasi GEMASTIK
- [ ] Demo video (3–5 menit): user flow lengkap
- [ ] Poster presentasi
- [ ] Dokumen teknis (sesuai format GEMASTIK)
- [ ] Slide presentasi
- [ ] README repository (setup, install, run)

---

## Keputusan Teknis yang Sudah Diambil

| Keputusan | Pilihan | Alasan |
|---|---|---|
| Frontend Framework | Next.js 14 (App Router) | SSR laporan, routing modern, deployment mudah |
| Styling | Tailwind CSS + shadcn/ui | Cepat, konsisten, accessible |
| Physics Engine | Matter.js + Custom ODE | Hybrid per kebutuhan simulasi |
| Chemistry Engine | Rule-Based JSON database | Cukup untuk SMA, tanpa komputasi berat |
| Biology Engine | State machine + SVG animasi | Cocok untuk proses bertahap |
| Database | PostgreSQL (Prisma ORM) | Relasional, JSONB untuk data eksperimen |
| Auth | NextAuth.js (Credentials) | Simpel, tidak butuh OAuth eksternal |
| PDF | Puppeteer / react-pdf | TBD saat implementasi |
| Hosting | Vercel + Neon.tech | Gratis, cukup untuk demo lomba |
| State Management | Zustand + React Query | Ringan, cukup untuk scope project |

---

## Keputusan Teknis yang Belum Diambil (Open Questions)

- [ ] **Monorepo atau Separated Repo?** — Turbo repo vs 2 repo terpisah
- [ ] **API: Next.js API Routes atau Express terpisah?** — Simpler: API Routes dulu
- [ ] **PDF library: Puppeteer vs react-pdf?** — Puppeteer lebih fleksibel tapi berat
- [ ] **Circuit builder Hukum Ohm: drag-drop penuh atau preset topology?** — Preset lebih realistis untuk waktu lomba
- [ ] **Berapa simulasi biologi yang masuk MVP?** — Mendel pasti, Fotosintesis TBD, Pernapasan mungkin Fase 2

---

## Risiko & Mitigasi

| Risiko | Level | Mitigasi |
|---|---|---|
| Waktu tidak cukup untuk 3 modul | 🔴 Tinggi | Fokus 2 sim fisika + 1 kimia + 1 biologi dulu |
| Simulasi tidak akurat ilmiah | 🟡 Medium | Unit test rumus + review dengan buku BSE |
| Performa Canvas berat di HP murah | 🟡 Medium | Web Worker + batasi frame rate |
| Bug saat demo GEMASTIK | 🔴 Tinggi | Deploy staging 1 minggu sebelum, freeze fitur |
| Schema DB berubah banyak | 🟡 Medium | Prisma migration sejak awal, bukan alter table manual |

---

## Changelog Rencana

| Tanggal | Perubahan |
|---|---|
| 24 Jun 2026 | Dokumen dibuat. Fase 0 dimulai. Stack teknologi diputuskan. |

---

*Dokumen ini HARUS diperbarui setiap ada perubahan scope, keputusan teknis baru, atau perubahan timeline.*
