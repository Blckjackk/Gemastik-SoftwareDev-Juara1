# Silabus Simulasi — LabSim Merdeka
> **Dokumen ini:** Daftar lengkap materi simulasi yang akan diimplementasikan  
> **Referensi Kurikulum:** Kurikulum Merdeka — Fase D (SMP Kelas VII–IX) & Fase E (SMA Kelas X)  
> **Terakhir Diperbarui:** 24 Juni 2026

---

## Legenda Status

| Simbol | Arti |
|---|---|
| 🟢 **MVP** | Target dikerjakan untuk demo GEMASTIK |
| 🔵 **Tahap 2** | Dikerjakan setelah MVP selesai (jika ada waktu) |
| ⚪ **Roadmap** | Rencana jangka panjang pasca kompetisi |

---

## MODUL 1 — FISIKA

**Pendekatan Mesin:** Numeric Physics Engine (Matter.js + Custom ODE Solver)

### 1.1 Mekanika & Kinematika

| # | Nama Simulasi | Fase Kur. Merdeka | Status | Variabel Utama | CP/Konsep |
|---|---|---|---|---|---|
| F-01 | **Gerak Parabola** | Fase E (Fisika X) | 🟢 MVP | v₀, θ, h₀ | Kinematika 2D, superposisi gerak lurus dan jatuh bebas |
| F-02 | **Gerak Lurus Berubah Beraturan (GLBB)** | Fase E (Fisika X) | 🔵 Tahap 2 | v₀, a, t | GLB vs GLBB, grafik v-t dan s-t |
| F-03 | **Hukum Newton I, II, III** | Fase E (Fisika X) | 🟢 MVP | m, F_applied, μ | Kelembaman, F=ma, aksi-reaksi |
| F-04 | **Bidang Miring & Katrol** | Fase E (Fisika X) | 🔵 Tahap 2 | θ, m, μ | Gaya normal, dekomposisi gaya |
| F-05 | **Gerak Melingkar** | Fase E (Fisika XI) | ⚪ Roadmap | r, v, m | Gaya sentripetal, percepatan sentripetal |

### 1.2 Getaran & Gelombang

| # | Nama Simulasi | Fase Kur. Merdeka | Status | Variabel Utama | CP/Konsep |
|---|---|---|---|---|---|
| F-06 | **Getaran Pegas (SHM)** | Fase E (Fisika X) | 🟢 MVP | k, m, A | Konstanta pegas, periode, frekuensi, energi SHM |
| F-07 | **Bandul Sederhana** | Fase D (IPA IX) | 🔵 Tahap 2 | L, θ | Periode bandul, pengaruh panjang tali vs massa |
| F-08 | **Gelombang Transversal & Longitudinal** | Fase E (Fisika XI) | ⚪ Roadmap | λ, f, A | Karakteristik gelombang, kecepatan rambat |
| F-09 | **Resonansi Bunyi (Kolom Udara)** | Fase E (Fisika XI) | ⚪ Roadmap | L, f | Panjang gelombang, nada harmonik |

### 1.3 Listrik & Magnet

| # | Nama Simulasi | Fase Kur. Merdeka | Status | Variabel Utama | CP/Konsep |
|---|---|---|---|---|---|
| F-10 | **Hukum Ohm & Rangkaian Listrik** | Fase D (IPA IX) & Fase E | 🟢 MVP | V, R1, R2, topologi | V=IR, rangkaian seri/paralel, daya listrik |
| F-11 | **Rangkaian RC (Kapasitor)** | Fase E (Fisika XII) | ⚪ Roadmap | R, C, V₀ | Pengisian/pengosongan kapasitor |
| F-12 | **Hukum Coulomb** | Fase E (Fisika XII) | ⚪ Roadmap | q₁, q₂, r | Gaya elektrostatik, medan listrik |

### 1.4 Energi & Termodinamika

| # | Nama Simulasi | Fase Kur. Merdeka | Status | Variabel Utama | CP/Konsep |
|---|---|---|---|---|---|
| F-13 | **Energi Kinetik & Potensial** | Fase D & E | 🔵 Tahap 2 | m, h, v | Konservasi energi mekanik |
| F-14 | **Tumbukan Elastis & Tidak Elastis** | Fase E (Fisika X) | 🔵 Tahap 2 | m₁, m₂, v₁, v₂ | Hukum kekekalan momentum |
| F-15 | **Kalor & Perubahan Wujud** | Fase D (IPA VIII) | ⚪ Roadmap | m, Q, c | Kalor jenis, kalor lebur/uap |

---

## MODUL 2 — KIMIA

**Pendekatan Mesin:** Rule-Based Reaction Engine (RBRE) — database aturan reaksi JSON

### 2.1 Asam, Basa & Garam

| # | Nama Simulasi | Fase Kur. Merdeka | Status | Variabel Utama | CP/Konsep |
|---|---|---|---|---|---|
| K-01 | **Titrasi Asam-Basa** | Fase E (Kimia XI) | 🟢 MVP | C_asam, V_asam, C_basa, indikator | Netralisasi, pH, titik ekuivalen, kurva titrasi |
| K-02 | **Uji pH Larutan** | Fase D (IPA VII) | 🔵 Tahap 2 | Jenis larutan, indikator | Sifat asam/basa, pH meter virtual |
| K-03 | **Hidrolisis Garam** | Fase E (Kimia XI) | ⚪ Roadmap | Jenis garam | Sifat larutan garam, pH larutan garam |
| K-04 | **Larutan Buffer** | Fase E (Kimia XI) | ⚪ Roadmap | C_asam lemah, C_garam | Kapasitas buffer, pH buffer |

### 2.2 Laju Reaksi

| # | Nama Simulasi | Fase Kur. Merdeka | Status | Variabel Utama | CP/Konsep |
|---|---|---|---|---|---|
| K-05 | **Reaksi Logam + Asam (Laju Reaksi)** | Fase E (Kimia XI) | 🟢 MVP | Jenis logam, [HCl], suhu | Faktor laju reaksi: konsentrasi, suhu, luas permukaan |
| K-06 | **Pengaruh Katalis** | Fase E (Kimia XI) | 🔵 Tahap 2 | Ada/tidaknya katalis, suhu | Energi aktivasi, peran katalis |
| K-07 | **Pengaruh Luas Permukaan** | Fase E (Kimia XI) | 🔵 Tahap 2 | Ukuran partikel (bubuk/bongkah) | Laju reaksi vs luas permukaan |

### 2.3 Kesetimbangan Kimia

| # | Nama Simulasi | Fase Kur. Merdeka | Status | Variabel Utama | CP/Konsep |
|---|---|---|---|---|---|
| K-08 | **Kesetimbangan Dinamis** | Fase E (Kimia XI) | ⚪ Roadmap | [Reaktan], [Produk], T | Konstanta kesetimbangan, Kc |
| K-09 | **Azas Le Chatelier** | Fase E (Kimia XI) | ⚪ Roadmap | Perubahan T, P, konsentrasi | Pergeseran kesetimbangan |

### 2.4 Redoks & Elektrokimia

| # | Nama Simulasi | Fase Kur. Merdeka | Status | Variabel Utama | CP/Konsep |
|---|---|---|---|---|---|
| K-10 | **Sel Elektrokimia (Sel Volta)** | Fase E (Kimia XII) | ⚪ Roadmap | Jenis elektroda, elektrolit | Potensial sel, deret Volta |
| K-11 | **Elektrolisis** | Fase E (Kimia XII) | ⚪ Roadmap | Arus, waktu, elektroda | Hukum Faraday, produk elektrolisis |

### 2.5 Database Zat Kimia (Chemical Substance DB)

Zat-zat yang akan ada dalam database RBRE (prioritas MVP):

**Asam:**
- HCl (Asam Klorida) — asam kuat
- H₂SO₄ (Asam Sulfat) — asam kuat
- CH₃COOH (Asam Asetat) — asam lemah
- HNO₃ (Asam Nitrat) — asam kuat

**Basa:**
- NaOH (Natrium Hidroksida) — basa kuat
- KOH (Kalium Hidroksida) — basa kuat
- Ca(OH)₂ (Kalsium Hidroksida) — basa kuat lemah larut
- NH₃/NH₄OH (Amonia) — basa lemah

**Logam:**
- Fe (Besi) — bereaksi dengan HCl, H₂SO₄
- Zn (Seng) — bereaksi, lebih reaktif dari Fe
- Mg (Magnesium) — sangat reaktif
- Cu (Tembaga) — tidak bereaksi dengan HCl (pembelajaran penting!)
- Al (Aluminium) — bereaksi

**Indikator:**
- Fenolftalein (PP): tidak berwarna → merah muda (pH 8.2–10)
- Metil Jingga: merah → kuning (pH 3.1–4.4)
- Metil Merah: merah → kuning (pH 4.4–6.2)
- Bromtimol Biru: kuning → biru (pH 6.0–7.6)
- Indikator Universal: pelangi pH 1–14

---

## MODUL 3 — BIOLOGI

**Pendekatan Mesin:** Interactive State Machine + SVG Animation

### 3.1 Fisiologi Tumbuhan

| # | Nama Simulasi | Fase Kur. Merdeka | Status | Variabel Utama | CP/Konsep |
|---|---|---|---|---|---|
| B-01 | **Fotosintesis** | Fase D (IPA VIII) | 🟢 MVP | Intensitas cahaya, [CO₂], suhu | Faktor laju fotosintesis, titik kompensasi, titik saturasi |
| B-02 | **Respirasi Aerob vs Anaerob** | Fase D (IPA IX) | 🔵 Tahap 2 | Ketersediaan O₂, substrat | Perbandingan ATP yang dihasilkan, produk sampingan |
| B-03 | **Transpirasi & Osmosis** | Fase D (IPA VIII) | ⚪ Roadmap | Kelembaban udara, suhu, kecepatan angin | Laju transpirasi, tekanan osmotik |

### 3.2 Genetika & Hereditas

| # | Nama Simulasi | Fase Kur. Merdeka | Status | Variabel Utama | CP/Konsep |
|---|---|---|---|---|---|
| B-04 | **Persilangan Mendel (Monohibrid)** | Fase D (IPA IX) | 🟢 MVP | Genotipe P1, P2 (AA/Aa/aa) | Dominansi-resesif, rasio 3:1 dan 1:1, Punnett square |
| B-05 | **Persilangan Dihibrid** | Fase D (IPA IX) | 🔵 Tahap 2 | Genotipe P1, P2 (AABB, dll.) | Rasio 9:3:3:1, hukum Mendel II (asortasi bebas) |
| B-06 | **Penyimpangan Rasio Mendel** | Fase E (Biologi XI) | ⚪ Roadmap | Jenis interaksi gen | Epistasis, kriptomeri, polimeri |
| B-07 | **Golongan Darah ABO** | Fase D (IPA IX) | 🔵 Tahap 2 | Genotipe orang tua | Kodominansi, pewarisan golongan darah |

### 3.3 Fisiologi Manusia

| # | Nama Simulasi | Fase Kur. Merdeka | Status | Variabel Utama | CP/Konsep |
|---|---|---|---|---|---|
| B-08 | **Sistem Pernapasan** | Fase D (IPA VIII) | 🟢 MVP | Tingkat aktivitas fisik | Frekuensi napas, volume tidal, pertukaran gas di alveolus |
| B-09 | **Sistem Peredaran Darah** | Fase D (IPA VIII) | 🔵 Tahap 2 | Aktivitas fisik, tekanan darah | Siklus jantung, peredaran besar/kecil |
| B-10 | **Pencernaan Makanan** | Fase D (IPA VIII) | ⚪ Roadmap | Jenis makanan, enzim | Peran enzim, organ pencernaan, pH optimal enzim |
| B-11 | **Sistem Saraf & Refleks** | Fase E (Biologi XI) | ⚪ Roadmap | Jenis stimulus | Gerak biasa vs gerak refleks, busur refleks |
| B-12 | **Sistem Ekskresi** | Fase E (Biologi XI) | ⚪ Roadmap | Asupan air, aktivitas | Pembentukan urin, glomerulus, reabsorpsi |

### 3.4 Ekologi

| # | Nama Simulasi | Fase Kur. Merdeka | Status | Variabel Utama | CP/Konsep |
|---|---|---|---|---|---|
| B-13 | **Dinamika Populasi (Predator-Prey)** | Fase E (Biologi X) | ⚪ Roadmap | Populasi awal, laju reproduksi | Model Lotka-Volterra, keseimbangan ekosistem |
| B-14 | **Siklus Biogeokimia** | Fase E (Biologi X) | ⚪ Roadmap | – | Siklus karbon, nitrogen, air |

---

## Ringkasan Target MVP untuk GEMASTIK

| Modul | Simulasi MVP | Jumlah |
|---|---|---|
| **Fisika** | F-01 Gerak Parabola, F-03 Hukum Newton, F-06 Getaran Pegas, F-10 Hukum Ohm | **4 simulasi** |
| **Kimia** | K-01 Titrasi Asam-Basa, K-05 Reaksi Logam+Asam | **2 simulasi** |
| **Biologi** | B-01 Fotosintesis, B-04 Persilangan Mendel, B-08 Sistem Pernapasan | **3 simulasi** |
| **TOTAL** | | **9 simulasi** |

> ⚠️ **Catatan Realistis:** Jika waktu tidak cukup, prioritaskan:
> 1. F-01 Gerak Parabola (paling impresif, paling kompleks visualnya)
> 2. F-10 Hukum Ohm (relevan SMP+SMA)  
> 3. K-01 Titrasi Asam-Basa (killer feature kimia)
> 4. B-04 Persilangan Mendel (logic-heavy, membuktikan engine)
>
> **Minimum viable untuk demo:** 4 simulasi (1 per modul + 1 bonus), tapi sistem laporan + dashboard harus tetap ada.

---

## Mapping ke Capaian Pembelajaran (CP) Kurikulum Merdeka

### Fase D — IPA SMP (Kelas VII–IX)

| Elemen CP | Topik | Simulasi |
|---|---|---|
| Pemahaman Sains | Gaya dan Gerak | F-03 Hukum Newton |
| Pemahaman Sains | Getaran dan Gelombang | F-06 Getaran Pegas, F-07 Bandul |
| Pemahaman Sains | Listrik dan Magnet | F-10 Rangkaian Listrik |
| Pemahaman Sains | Zat dan Perubahannya | K-02 Uji pH, K-05 Reaksi Logam |
| Pemahaman Sains | Sistem Organ Manusia | B-08 Pernapasan, B-09 Peredaran Darah |
| Pemahaman Sains | Pewarisan Sifat | B-04 Mendel Monohibrid |
| Pemahaman Sains | Fotosintesis | B-01 Fotosintesis |

### Fase E — Fisika SMA (Kelas X)

| Elemen CP | Topik | Simulasi |
|---|---|---|
| Pemahaman Fisika | Kinematika dan Dinamika | F-01 Parabola, F-03 Newton, F-04 Bidang Miring |
| Pemahaman Fisika | Usaha dan Energi | F-13 Energi Mekanik |
| Pemahaman Fisika | Momentum | F-14 Tumbukan |
| Pemahaman Fisika | Getaran Harmonik | F-06 Pegas, F-07 Bandul |

### Fase E — Kimia SMA (Kelas X–XII)

| Elemen CP | Topik | Simulasi |
|---|---|---|
| Pemahaman Kimia | Larutan dan Sifatnya | K-01 Titrasi, K-02 pH, K-03 Hidrolisis |
| Pemahaman Kimia | Laju Reaksi | K-05 Logam+Asam, K-06 Katalis |
| Pemahaman Kimia | Kesetimbangan | K-08 Kesetimbangan, K-09 Le Chatelier |

### Fase E — Biologi SMA (Kelas X–XII)

| Elemen CP | Topik | Simulasi |
|---|---|---|
| Pemahaman Biologi | Metabolisme Sel | B-01 Fotosintesis, B-02 Respirasi |
| Pemahaman Biologi | Genetika | B-04 Monohibrid, B-05 Dihibrid, B-06 Penyimpangan |
| Pemahaman Biologi | Sistem Organ | B-08 Pernapasan, B-09 Peredaran Darah |
| Pemahaman Biologi | Ekologi | B-13 Dinamika Populasi |

---

## Catatan Desain Pedagogi

Setiap simulasi dirancang mengikuti **siklus inkuiri ilmiah**:

```
1. TUJUAN & HIPOTESIS
   Siswa membaca tujuan eksperimen dan menuliskan hipotesis awal
   
2. EKSPLORASI (Simulasi)
   Siswa manipulasi variabel bebas, amati perubahan variabel terikat
   
3. PENCATATAN DATA
   Data otomatis terekam; siswa bisa tambahkan ke tabel manual
   
4. ANALISIS
   Siswa menjawab pertanyaan panduan yang mendorong interpretasi data
   
5. KESIMPULAN
   Siswa merumuskan kesimpulan sesuai data yang diperoleh
   
6. LAPORAN
   Sistem generate laporan otomatis dari seluruh proses di atas
```

Setiap simulasi juga memiliki **pertanyaan pemantik** yang mendorong siswa untuk melampaui hafalan dan menuju pemahaman konseptual, contoh:
- "Apa yang terjadi jika sudut lemparan diperbesar dari 45° menjadi 60°? Mengapa?"
- "Apakah tembaga bereaksi dengan HCl? Apa yang kamu simpulkan dari pengamatan ini?"
- "Mengapa menaikkan intensitas cahaya terus-menerus tidak meningkatkan laju fotosintesis?"

---

*Silabus ini akan berkembang sesuai dengan kemajuan implementasi dan feedback dari pengujian dengan pengguna nyata.*
