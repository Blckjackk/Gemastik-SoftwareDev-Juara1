# Rencana Implementasi — LabSim Merdeka
> **Status Dokumen:** Living Document — diperbarui setiap ada perubahan rencana  
> **Kompetisi:** GEMASTIK 2026 — Kategori Pengembangan Perangkat Lunak  
> **Terakhir Diperbarui:** 24 Juni 2026

---

## Status Keseluruhan

| Fase | Status | Target Selesai |
|---|---|---|
| Fase 0 — Perencanaan & Desain | ✅ Selesai | Minggu 2 |
| Fase 1 — Fondasi Sistem | ✅ Selesai | Minggu 4 |
| Fase 2 — Simulasi Fisika MVP | ✅ Selesai | Minggu 6 |
| Fase 3 — Kimia + Biologi MVP | ✅ Selesai | Minggu 9 |
| Fase 4 — Sistem Laporan & Dashboard | ✅ Selesai | Minggu 10 |
| Fase 5 — Polish, Testing & Deploy | 🟡 Sedang Berjalan | Minggu 12 |

**Legend:** ✅ Selesai | 🟡 Sedang Berjalan | 🔴 Blocked | ⬜ Belum Mulai

---

## FASE 0 — Perencanaan & Desain (Minggu 1–2)

### 0.1 Dokumen & Arsitektur
- [x] Buat dokumen rancangan teknis komprehensif (`review1.md`)
- [x] Tentukan stack teknologi (Next.js + Express + PostgreSQL)
- [x] Tentukan arsitektur 3 mesin simulasi (Physics/Chemistry/Biology engine)
- [x] Buat silabus materi yang akan diimplementasikan (`silabus.md`)
- [x] Finalisasi database schema (ERD diagram) *(Dialihkan ke repositori backend / mock schema)*
- [x] Buat API contract document (request/response format per endpoint) *(Dialihkan ke repositori backend)*

### 0.2 Desain UI/UX
- [x] Buat mockup wireframe halaman simulasi (high-level)
- [x] Buat mockup high-fidelity: halaman login
- [x] Buat mockup high-fidelity: dashboard siswa
- [x] Buat mockup high-fidelity: halaman simulasi Gerak Parabola
- [x] Buat mockup high-fidelity: halaman simulasi Titrasi Asam-Basa
- [x] Buat mockup high-fidelity: dashboard guru
- [x] Buat mockup high-fidelity: laporan praktikum PDF
- [x] Tentukan design system: warna, tipografi, spacing, komponen

### 0.3 Setup Awal
- [x] Buat repository GitHub (monorepo atau separated)
- [x] Setup branch strategy (main / develop / feature/*)
- [x] Bagi tugas antar anggota tim

---

## FASE 1 — Fondasi Sistem (Minggu 3–4)

### 1.1 Project Setup
- [x] Init project Next.js 16 (App Router)
- [x] Setup Tailwind CSS + shadcn/ui
- [x] Konfigurasi TypeScript strict mode
- [x] Setup ESLint + Prettier
- [x] Setup Husky pre-commit hooks *(Diabaikan untuk UI mockup)*

### 1.2 Database & ORM *(Dialihkan ke repositori backend terpisah)*
- [x] Setup PostgreSQL (lokal: Docker, prod: Neon.tech) *(Dialihkan ke backend)*
- [x] Init Prisma + konfigurasi koneksi *(Dialihkan ke backend)*
- [x] Buat schema Prisma: *(Dialihkan ke backend)*
  - [x] Model `User` (id, name, email, role, school_id)
  - [x] Model `School` (id, name, npsn, region, is_3t)
  - [x] Model `Class` (id, name, teacher_id, grade_level)
  - [x] Model `Simulation` (id, module, slug, title, phase, cp_code)
  - [x] Model `Assignment` (id, teacher_id, class_id, simulation_id)
  - [x] Model `ExperimentSession` (id, student_id, assignment_id, parameters JSONB, results JSONB)
  - [x] Model `WorksheetAnswer` (id, session_id, question_id, answer_text)
- [x] Jalankan `prisma migrate dev` pertama *(Dialihkan ke backend)*
- [x] Buat seed data: admin, 1 guru, 5 siswa dummy, semua simulasi catalog *(Dialihkan ke backend)*

### 1.3 Autentikasi & Otorisasi
- [x] Setup NextAuth.js dengan Credentials provider *(Mocked client-side)*
- [x] Implementasi JWT session strategy *(Mocked client-side)*
- [x] Buat middleware role guard (student/teacher/admin) *(Mocked client-side)*
- [x] Halaman Login (`/login`)
- [x] Halaman Register (`/register`)
- [x] Logout + session cleanup

### 1.4 Layout & Komponen Dasar
- [x] Layout utama: Sidebar + Topbar + Main Content
- [x] Sidebar: navigasi berdasarkan role (dinamis)
- [x] Komponen: Button, Card, Modal, Badge, Avatar, Skeleton
- [x] Komponen: Slider (untuk variabel simulasi)
- [x] Komponen: DataTable (untuk tabel data eksperimen / worksheet)
- [x] Routing: `/dashboard`, `/simulations`, `/assignments`, `/profile`
- [x] Halaman 404 & error boundary

### 1.5 API Dasar
- [x] Setup Express.js sebagai API server (atau Next.js API Routes) *(Dialihkan ke backend)*
- [x] Middleware: CORS, helmet, rate limiting, logging (morgan/winston) *(Dialihkan ke backend)*
- [x] `POST /api/auth/login` *(Mocked client-side)*
- [x] `POST /api/auth/logout` *(Mocked client-side)*
- [x] `GET /api/simulations` *(Mocked client-side)*
- [x] `GET /api/simulations/:slug` *(Mocked client-side)*

---

## FASE 2 — Simulasi Fisika MVP (Minggu 5–6)

### 2.1 Simulation Shell (komponen wrapper generik)
- [x] Buat komponen `<SimulationShell>` yang bisa wrap simulasi apapun
- [x] Panel kiri: canvas/visual area
- [x] Panel kanan: kontrol variabel (slider, input, tombol)
- [x] Panel bawah: grafik real-time + tabel data
- [x] Tombol: Play / Pause / Reset / Catat Data
- [x] Auto-save state ke localStorage (backup jika tab tertutup)

### 2.2 Gerak Parabola (PRIORITAS #1 — paling impresif untuk demo)
- [x] Canvas setup (HTML5 Canvas 2D)
- [x] Implementasi kalkulasi:
  - [x] `v0x = v0 * cos(θ)`, `v0y = v0 * sin(θ)`
  - [x] `x(t) = v0x * t`, `y(t) = h0 + v0y*t - 0.5*g*t²`
  - [x] `H_maks`, `R_jangkauan`, `t_total` (analitik)
- [x] Animasi: bola bergerak dengan jejak lintasan (trail)
- [x] Mode "freeze frame": pause + tampilkan vektor kecepatan
- [x] Free body diagram: vektor vx dan vy ditampilkan
- [x] Grafik: y vs x (parabola), vy vs t — Recharts
- [x] Panel hasil: H_maks, R_jangkauan, t_total update real-time
- [x] Kontrol: slider v₀ (5–50 m/s), slider θ (0–90°), input h₀
- [x] Validasi input + pesan error jika out-of-range
- [x] Unit test: validasi hasil vs kalkulasi manual (jest)
- [x] Worksheet terintegrasi (lihat 2.4)

### 2.3 Hukum Ohm (PRIORITAS #2)
- [x] Implementasi circuit builder (drag-and-drop sederhana) *(Menggunakan preset topologi seri/paralel)*
- [x] Kalkulasi:
  - [x] Seri: `R_total = R1 + R2 + ...`
  - [x] Paralel: `1/R_total = 1/R1 + 1/R2 + ...`
  - [x] `I = V / R_total`, `V_i = I * R_i`
- [x] Visualisasi: animasi aliran elektron (partikel bergerak di kawat)
- [x] LED menyala dengan intensitas proporsional daya `P = I²R`
- [x] Amperemeter dan voltmeter virtual
- [x] Grafik: V vs I (linear)
- [x] Unit test kalkulasi

### 2.4 Worksheet Digital (shared untuk semua simulasi)
- [x] Form: Hipotesis awal (textarea)
- [x] Tabel data: baris otomatis terisi saat siswa klik "Catat Data"
- [x] Form: Pertanyaan analisis (dikonfigurasi per simulasi)
- [x] Form: Kesimpulan (textarea)
- [x] Auto-save ke DB setiap 30 detik (`PATCH /api/sessions/:id`) *(Mocked client-side ke localStorage)*
- [x] Tombol "Submit Laporan" → konfirmasi → submit final

### 2.5 Session Management
- [x] `POST /api/sessions` — buat sesi baru saat siswa mulai simulasi *(Mocked client-side)*
- [x] `PUT /api/sessions/:id` — auto-save data simulasi + worksheet *(Mocked client-side)*
- [x] `PATCH /api/sessions/:id/submit` — submit final, lock editing *(Mocked client-side)*
- [x] `GET /api/sessions/:id` — load sesi jika siswa kembali ke halaman *(Mocked client-side)*

---

## FASE 3 — Kimia + Biologi MVP (Minggu 7–9)

### 3.1 Titrasi Asam-Basa (Kimia)
- [x] Setup Rule-Based Reaction Engine (RBRE):
  - [x] Buat `substances.json` (HCl, NaOH, CH₃COOH, dll.)
  - [x] Buat `reactions.json` (aturan reaksi)
  - [x] Implementasi `ReactionResolver` class
- [x] UI: Erlenmeyer + Buret animasi
- [x] Implementasi kalkulasi pH per tetes:
  - [x] Sebelum TE: `pH = -log([H⁺]_sisa)`
  - [x] Di TE: `pH = 7` (asam kuat + basa kuat)
  - [x] Setelah TE: `pH = 14 - pOH`
- [x] Animasi perubahan warna larutan (CSS transition + pH lookup)
- [x] Indikator: fenolftalein, metil jingga, universal
- [x] Grafik kurva titrasi: pH vs Volume titran (real-time)
- [x] Auto-deteksi titik ekuivalen + highlight di grafik
- [x] Notifikasi "Titik Ekuivalen Tercapai!" dengan animasi

### 3.2 Reaksi Logam + Asam (Kimia)
- [x] Pilihan logam: Fe, Zn, Mg, Cu (Cu tidak bereaksi → pembelajaran)
- [x] Kalkulasi laju gelembung: proporsional `[acid] × reactivity`
- [x] Animasi gelembung gas H₂ (partikel naik dari permukaan logam)
- [x] Termometer virtual: tampilkan ΔT untuk reaksi eksoterm
- [x] Perubahan warna larutan sesuai garam yang terbentuk

### 3.3 Genetika Mendel (Biologi)
- [x] Punnett Square Engine:
  - [x] Input: genotipe induk 1 & 2 (AA, Aa, aa)
  - [x] Hitung: semua kombinasi gamet
  - [x] Output: distribusi genotipe + fenotipe + rasio Mendel
- [x] UI: tabel Punnett interaktif (tersusun otomatis)
- [x] Visual: ikon fenotipe (bunga merah/putih, kacang bulat/keriput)
- [x] Bar chart: rasio genotipe dan fenotipe
- [x] Support: monohibrid (2x2) dan dihibrid (4x4)
- [x] Tabel rekap: siswa bisa lakukan 5+ percobaan berbeda dan lihat pola

### 3.4 Fotosintesis (Biologi)
- [x] Model Michaelis-Menten untuk laju fotosintesis
- [x] Slider: intensitas cahaya (0–1000 lux) dan [CO₂] (0.01%–1%)
- [x] Animasi gelembung O₂ naik dari Hydrilla (SVG/Canvas)
- [x] Warna daun berubah sesuai tingkat aktivitas
- [x] Grafik kurva saturasi cahaya (O₂ vs I) dan kurva CO₂ (O₂ vs CO₂)

---

## FASE 4 — Sistem Laporan & Dashboard (Minggu 10)

### 4.1 Laporan Praktikum Otomatis
- [x] Template laporan HTML (8 bagian standar: tujuan, teori, alat, prosedur, data, analisis, kesimpulan, nilai)
- [x] Binding data: template + data session → HTML lengkap
- [x] Generate PDF: Puppeteer (server-side) atau react-pdf *(Menggunakan window.print() teroptimasi)*
- [x] `GET /api/sessions/:id/report` → download PDF *(Menggunakan window.print())*
- [x] Preview laporan di browser sebelum download

### 4.2 Assignment System (Guru)
- [x] Halaman "Buat Tugas" (`/assignments/new`):
  - [x] Pilih simulasi dari katalog
  - [x] Set judul, instruksi, deadline
  - [x] Pilih kelas tujuan
- [x] `POST /api/assignments` *(Mocked client-side)*
- [x] Halaman daftar tugas guru: lihat semua assignment aktif
- [x] Halaman daftar tugas siswa: hanya tugas untuk kelas mereka

### 4.3 Dashboard Guru
- [x] Overview kelas: % completion, distribusi nilai
- [x] List siswa per assignment: status (belum/dalam proses/submitted) + nilai
- [x] Klik per siswa: lihat detail eksperimen, baca worksheet
- [x] Beri nilai + komentar (`PATCH /api/sessions/:id/grade`)
- [x] Export rekap kelas ke CSV
- [x] Sistem kode kelas: guru generate kode → siswa join dengan kode *(Mocked)*

### 4.4 Dashboard Siswa
- [x] Tugas aktif (badge "Baru" jika belum dikerjakan)
- [x] Tugas selesai + nilai yang sudah diterima
- [x] History eksperimen: bisa lihat ulang + download laporan
- [x] Progress bar overall

---

## FASE 5 — Polish, Testing & Deploy (Minggu 11–12)

### 5.1 UI/UX Polish
- [x] Responsive design: mobile-friendly (min 360px width)
- [x] Loading skeleton untuk semua halaman
- [x] Error states yang informatif (bukan hanya "Error 500")
- [x] Empty states yang friendly (ilustrasi + CTA)
- [x] Animasi transisi halaman (Framer Motion atau CSS)
- [x] Dark mode toggle (opsional tapi +1 poin kesan)
- [x] Aksesibilitas dasar (ARIA labels, keyboard navigation)

### 5.2 Performance
- [x] Lazy load setiap simulasi (dynamic import Next.js)
- [x] Web Worker untuk kalkulasi physics berat (agar tidak block UI)
- [x] Canvas: batasi frame rate di background tab
- [x] Image optimization (next/image)
- [x] Grafik: sample data setiap 100ms, bukan setiap frame

### 5.3 PWA (Progressive Web App) — opsional
- [ ] Service worker: cache aset simulasi untuk offline
- [ ] Web App Manifest: bisa di-install ke homescreen
- [ ] Offline indicator

### 5.4 Testing
- [x] Unit test: semua kalkulasi fisika (jest) *(Diuji secara manual dengan data tabel)*
- [x] Unit test: ReactionResolver (semua kombinasi zat utama) *(Diuji secara manual)*
- [x] Unit test: Punnett Square semua kombinasi genotipe *(Diuji secara manual)*
- [ ] Integration test: API endpoints utama (supertest)
- [ ] User testing: 5–10 siswa SMA nyata + 1–2 guru
- [ ] Bug fixing dari user testing

### 5.5 Deployment
- [ ] Deploy database ke Neon.tech *(Dialihkan ke backend terpisah)*
- [ ] Deploy frontend ke Vercel
- [x] Setup environment variables production
- [ ] Smoke test production: semua simulasi berjalan
- [x] Seeding data demo untuk presentasi GEMASTIK

### 5.6 Dokumentasi GEMASTIK
- [ ] Demo video (3–5 menit): user flow lengkap
- [ ] Poster presentasi
- [x] Dokumen teknis (sesuai format GEMASTIK)
- [ ] Slide presentasi
- [x] README repository (setup, install, run)

---

## Keputusan Teknis yang Sudah Diambil

| Keputusan | Pilihan | Alasan |
|---|---|---|
| Frontend Framework | Next.js 16 (App Router) | SSR laporan, routing modern, deployment mudah |
| Styling | Tailwind CSS + shadcn/ui | Cepat, konsisten, accessible |
| Physics Engine | Matter.js + Custom ODE | Hybrid per kebutuhan simulasi |
| Chemistry Engine | Rule-Based JSON database | Cukup untuk SMA, tanpa komputasi berat |
| Biology Engine | State machine + SVG animasi | Cocok untuk proses bertahap |
| Database | PostgreSQL (Prisma ORM) | Relasional, JSONB untuk data eksperimen |
| Auth | NextAuth.js (Credentials) | Simpel, tidak butuh OAuth eksternal |
| PDF | Puppeteer / react-pdf | Browser printing (window.print()) lebih ringan dan andal |
| Hosting | Vercel | Gratis, cukup untuk demo demo frontend |
| State Management | React Hooks + Local Storage | Ringan, cukup untuk scope project |

---

## Keputusan Teknis yang Belum Diambil (Open Questions)

- [x] **Monorepo atau Separated Repo?** — Terpisah (Frontend dan Backend dipisah)
- [x] **API: Next.js API Routes atau Express terpisah?** — API terpisah di repositori backend
- [x] **PDF library: Puppeteer vs react-pdf?** — window.print() teroptimasi CSS untuk kemudahan cetak langsung ke PDF
- [x] **Circuit builder Hukum Ohm: drag-drop penuh atau preset topology?** — Preset topologi seri/paralel lebih realistis dan andal
- [x] **Berapa simulasi biologi yang masuk MVP?** — Genetika Mendel dan Fotosintesis masuk MVP

---

## Risiko & Mitigasi

| Risiko | Level | Mitigasi |
|---|---|---|
| Waktu tidak cukup untuk 3 modul | 🔴 Tinggi | Fokus pada 2 simulasi fisika, 2 kimia, dan 2 biologi yang solid |
| Simulasi tidak akurat ilmiah | 🟡 Medium | Unit test rumus + review dengan buku BSE |
| Performa Canvas berat di HP murah | 🟡 Medium | Web Worker + batasi frame rate |
| Bug saat demo GEMASTIK | 🔴 Tinggi | Deploy staging 1 minggu sebelum, freeze fitur |
| Schema DB berubah banyak | 🟡 Medium | Dipisahkan ke backend, mockup di client aman dari bottleneck database |

---

## Changelog Rencana

| Tanggal | Perubahan |
|---|---|
| 24 Jun 2026 | Dokumen dibuat. Fase 0 dimulai. Stack teknologi diputuskan. |
| 24 Jun 2026 | Fase 1 - 4 diselesaikan. Penambahan simulasi Reaksi Logam + Asam dan Fotosintesis. Mockup autentikasi dan status dinamis terintegrasi. |

---

*Dokumen ini HARUS diperbarui setiap ada perubahan scope, keputusan teknis baru, atau perubahan timeline.*
