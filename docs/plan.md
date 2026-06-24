# LabSim Merdeka
### Laboratorium Virtual Interaktif Berbasis Web untuk Pembelajaran Sains Kontekstual sesuai Kurikulum Merdeka
**Divisi Pengembangan Perangkat Lunak — GEMASTIK 2026**

---

## 1. Latar Belakang

Pembelajaran sains di sekolah menuntut siswa tidak hanya memahami teori, tetapi juga mampu mengamati, bereksperimen, dan menarik kesimpulan dari proses praktikum. Namun dalam praktiknya, banyak sekolah di Indonesia masih menghadapi keterbatasan fasilitas laboratorium, mulai dari kurangnya alat dan bahan percobaan, keterbatasan ruang laboratorium, hingga mahalnya biaya perawatan dan pengadaan perangkat praktikum. Kondisi ini semakin terasa di daerah 3T, di mana akses terhadap laboratorium yang memadai masih belum merata.

Akibat keterbatasan tersebut, proses pembelajaran sains sering kali bergeser menjadi pembelajaran yang terlalu teoritis, sehingga siswa kehilangan pengalaman penting dalam memahami konsep secara kontekstual dan visual. Padahal, materi seperti fisika, kimia, dan biologi sangat bergantung pada aktivitas eksperimen untuk membantu siswa membangun pemahaman yang lebih dalam. Di sisi lain, platform virtual lab yang sudah ada umumnya belum sepenuhnya sesuai dengan kebutuhan pendidikan di Indonesia karena berbahasa asing, belum disesuaikan dengan Kurikulum Merdeka, dan belum menyediakan integrasi asesmen maupun pelaporan praktikum yang utuh.

Berdasarkan permasalahan tersebut, dibutuhkan sebuah solusi pembelajaran yang interaktif, mudah diakses, dan relevan dengan konteks pendidikan Indonesia. **LabSim Merdeka** hadir sebagai jawaban atas kebutuhan tersebut melalui pengembangan laboratorium virtual berbasis web yang memungkinkan siswa melakukan simulasi praktikum secara mandiri, fleksibel, dan sesuai dengan capaian pembelajaran Kurikulum Merdeka.

> **Relevansi dengan tema GEMASTIK 2026.** Tema GEMASTIK tahun ini mengacu pada Program Prioritas Asta Cita dan/atau *Sustainable Development Goals* (SDGs). LabSim Merdeka secara langsung menjawab **SDG 4 — Pendidikan Berkualitas**, khususnya target pemerataan akses pendidikan bermutu, serta mendukung agenda Asta Cita di bidang pemerataan kualitas pendidikan ke wilayah 3T melalui pemanfaatan teknologi digital.

## 2. Deskripsi Produk

LabSim Merdeka adalah platform virtual lab sains berbasis web yang dirancang untuk membantu siswa mempelajari konsep-konsep Fisika, Kimia, dan Biologi melalui simulasi eksperimen interaktif. Platform ini memungkinkan pengguna untuk melakukan praktikum secara digital tanpa memerlukan laboratorium fisik, sehingga proses pembelajaran tetap dapat berjalan secara menarik, aman, dan efisien. Berbeda dari media pembelajaran pasif seperti video atau animasi satu arah, LabSim Merdeka memberikan pengalaman belajar aktif di mana siswa dapat mengubah parameter eksperimen, mengamati hasil secara langsung, dan memahami hubungan sebab-akibat dalam suatu percobaan.

Setiap simulasi dikembangkan berdasarkan konteks pembelajaran Kurikulum Merdeka, sehingga eksperimen yang tersedia selaras dengan capaian pembelajaran (CP), tujuan pembelajaran (TP), serta kebutuhan materi di jenjang SMP maupun SMA — mencakup Hukum Ohm, gerak parabola, reaksi kimia, asam-basa, fotosintesis, genetika, dan sistem organ manusia. Siswa dapat mengeksplorasi variabel, mencatat hasil pengamatan, menjawab pertanyaan pemantik, serta menyusun laporan praktikum secara otomatis berdasarkan aktivitas yang telah dilakukan.

Melalui dashboard guru, pendidik dapat memilih simulasi yang sesuai, memantau aktivitas siswa, melihat hasil laporan, dan memberikan evaluasi secara lebih terstruktur — didukung fitur laporan otomatis, integrasi asesmen, dan potensi AI sebagai asisten pembelajaran.

## 3. Rumusan Masalah

1. Bagaimana merancang platform virtual lab yang benar-benar selaras dengan CP/TP Kurikulum Merdeka, bukan sekadar adaptasi simulasi generik berbahasa asing?
2. Bagaimana memastikan platform tetap dapat diakses secara lancar oleh sekolah dengan perangkat sederhana dan koneksi internet terbatas, khususnya di daerah 3T?
3. Bagaimana mengintegrasikan proses eksperimen, pencatatan hasil, asesmen, dan pelaporan praktikum dalam satu ekosistem yang utuh — bukan tools yang terpisah-pisah?
4. Bagaimana menjaga aktivitas siswa tetap berbasis inkuiri (mengamati, menduga, menguji, menyimpulkan) meskipun dilakukan secara virtual?

## 4. Tujuan Pengembangan

- Mengembangkan platform virtual lab berbasis web yang mendukung eksperimen Fisika, Kimia, dan Biologi sesuai CP Kurikulum Merdeka jenjang SMP/SMA.
- Menyediakan sistem pencatatan hasil eksperimen, asesmen, dan pelaporan praktikum otomatis bagi guru dan siswa.
- Memperluas akses praktikum sains bagi sekolah dengan keterbatasan fasilitas laboratorium, terutama di daerah 3T.
- Mendorong pembelajaran aktif (*active learning*) dan kontekstual dalam mata pelajaran sains.

## 5. Manfaat

| Bagi Siswa | Bagi Guru | Bagi Sekolah/Dinas Pendidikan |
|---|---|---|
| Pengalaman praktikum aktif tanpa risiko keselamatan (bahan kimia, listrik, dll) | Hemat waktu penyusunan & koreksi laporan praktikum lewat otomasi | Mengurangi kebutuhan investasi alat & ruang lab fisik di awal |
| Bisa mengulang eksperimen kapan pun untuk memperkuat pemahaman | Data progres siswa terpantau real-time lewat dashboard | Pemerataan kualitas pembelajaran sains antar sekolah, termasuk daerah 3T |
| Materi & bahasa sesuai konteks lokal dan kurikulum yang dipelajari | Bank simulasi yang sudah dipetakan ke CP/TP, tidak perlu menyusun sendiri | Data agregat dapat menjadi bahan evaluasi mutu pembelajaran sains daerah |

## 6. Sasaran Pengguna

- **Pengguna utama:** siswa dan guru SMP/SMA mata pelajaran IPA, Fisika, Kimia, Biologi.
- **Pengguna sekunder:** sekolah dan dinas pendidikan daerah, khususnya di wilayah 3T, sebagai alat pemerataan akses praktikum.
- **Mitra potensial jangka panjang:** Kemendikbudristek/Kemendikdasmen (integrasi dengan Platform Merdeka Mengajar), penyedia program CSR pendidikan, dan komunitas guru IPA.

## 7. Fitur Utama

1. **Modul Simulasi Eksperimen Interaktif** — siswa dapat mengubah parameter (misalnya tegangan & hambatan pada Hukum Ohm, sudut & kecepatan awal pada gerak parabola, konsentrasi larutan pada reaksi asam-basa) dan melihat hasil secara visual serta real-time.
2. **Lembar Kerja Digital & Pertanyaan Pemantik** — terintegrasi langsung di samping simulasi agar siswa mencatat hasil pengamatan sambil bereksperimen, bukan terpisah di kertas/Word.
3. **Laporan Praktikum Otomatis** — sistem menyusun draf laporan (tujuan, data hasil, grafik, kesimpulan) berdasarkan aktivitas siswa, siap diunduh dalam format PDF.
4. **Dashboard Guru** — pemilihan simulasi sesuai CP/TP, pemantauan progres kelas, rekap nilai, dan pemberian feedback per siswa.
5. **Bank Soal & Asesmen Terintegrasi** — kuis pra-praktikum (cek prasyarat konsep) dan pasca-praktikum (cek pemahaman), dengan penilaian otomatis untuk soal objektif.
6. **Mode Hemat Data (PWA/Low-Bandwidth)** — aset simulasi dioptimalkan agar tetap dapat dijalankan pada koneksi internet terbatas, dengan opsi *progressive web app* untuk akses semi-offline — krusial untuk konteks 3T.
7. **Asisten Belajar Berbasis AI (tahap lanjut)** — chatbot kontekstual berbahasa Indonesia yang membantu siswa memahami instruksi eksperimen atau memberi *hint* terarah tanpa langsung memberi jawaban akhir.
8. **Peta Penyelarasan Kurikulum** — setiap simulasi otomatis ditandai dengan CP, TP, dan fase Kurikulum Merdeka yang relevan, memudahkan guru memilih materi.

## 8. Rincian Rancangan Simulasi per Mata Pelajaran

Ketiga mata pelajaran memiliki karakteristik konsep yang berbeda, sehingga LabSim Merdeka tidak menggunakan satu mesin simulasi generik untuk semuanya, melainkan tiga pendekatan teknis yang masing-masing disesuaikan dengan sifat keilmuannya.

### 8.1 Fisika — Pendekatan: *Physics Engine* (kalkulasi dinamis real-time)

Konsep fisika SMP/SMA umumnya kuantitatif dan dinamis (gerak, gaya, listrik), sehingga simulasi dibangun di atas *physics engine* 2D (mis. Matter.js) yang menghitung posisi, kecepatan, gaya, dan arus secara real-time berdasarkan rumus fisika yang relevan — hasil simulasi konsisten dengan hukum fisika sesungguhnya, bukan animasi pra-rekam.

1. **Hukum Ohm & Rangkaian Listrik Sederhana**
   - *Variabel yang diubah siswa:* tegangan sumber (V), nilai resistor (R), susunan resistor (seri/paralel).
   - *Output:* arus (I) pada ammeter virtual, nyala lampu/LED virtual yang merepresentasikan besar arus, grafik V–I yang terplot otomatis.
   - *Konsep yang dibangun:* hubungan V = I × R, perbedaan efek susunan seri vs paralel terhadap arus total.

2. **Gerak Parabola**
   - *Variabel:* sudut elevasi, kecepatan awal peluncuran (opsional tahap lanjut: hambatan udara).
   - *Output:* lintasan real-time, jarak tempuh maksimum, tinggi maksimum, dan waktu di udara — terhitung otomatis di panel data.
   - *Konsep:* gerak 2 dimensi sebagai gabungan gerak horizontal (GLB) dan vertikal (GLBB).

3. **(Pengembangan lanjutan) Getaran Pegas — Hukum Hooke**
   - *Variabel:* konstanta pegas, massa beban, simpangan awal.
   - *Output:* animasi osilasi, grafik simpangan terhadap waktu, periode getaran.

### 8.2 Kimia — Pendekatan: *Rule-Based Reaction Engine* (basis aturan & ambang variabel)

Simulasi reaksi kimia yang akurat secara molekuler terlalu kompleks untuk dihitung real-time di browser. Karena itu, setiap kombinasi zat & variabel (konsentrasi, suhu, jenis indikator) dipetakan ke hasil visual dan data yang sudah divalidasi sesuai teori kimia SMP/SMA — tetap akurat secara konsep tanpa memerlukan simulasi molekul dinamis.

1. **Titrasi Asam-Basa**
   - *Variabel:* konsentrasi & volume larutan asam/basa, jenis indikator (PP, universal).
   - *Output:* perubahan warna larutan real-time, kurva titrasi (pH vs volume titran), titik ekuivalen yang teridentifikasi otomatis.
   - *Konsep:* reaksi netralisasi, pH, titik ekuivalen.

2. **Reaksi Logam dengan Asam (Penghasil Gas)**
   - *Variabel:* jenis logam (dari daftar terbatas), konsentrasi asam, suhu larutan.
   - *Output:* animasi laju gelembung gas, perubahan suhu pada termometer virtual untuk reaksi eksoterm.
   - *Konsep:* ciri-ciri reaksi kimia, faktor yang mempengaruhi laju reaksi (konsentrasi & suhu).

3. **(Pengembangan lanjutan) Faktor-Faktor Laju Reaksi**
   - *Variabel:* ada/tidaknya katalis, ukuran partikel reaktan.
   - *Output:* grafik perbandingan waktu reaksi antar kondisi.

### 8.3 Biologi — Pendekatan: Model Interaktif Berbasis Diagram & Animasi Bertahap

Konsep biologi SMP/SMA lebih bersifat struktural dan proses bertahap dibanding perhitungan numerik kontinu. Simulasi dibangun sebagai model interaktif berbasis SVG/animasi dengan logika *state-machine* sederhana: setiap input siswa memicu transisi visual yang merepresentasikan proses biologis secara akurat dan mudah dijelaskan guru.

1. **Fotosintesis**
   - *Variabel:* intensitas cahaya, konsentrasi CO2.
   - *Output:* laju gelembung oksigen pada tanaman air virtual (mis. Hydrilla), grafik laju fotosintesis terhadap intensitas cahaya (kurva saturasi).
   - *Konsep:* faktor-faktor yang mempengaruhi laju fotosintesis.

2. **Persilangan Genetika (Hukum Mendel)**
   - *Variabel:* genotipe induk yang dipilih siswa (mis. bunga merah RR × putih rr).
   - *Output:* diagram Punnett tersusun otomatis, rasio genotipe & fenotipe keturunan F1/F2, visualisasi sifat fisik hasil persilangan.
   - *Konsep:* dominansi-resesif, rasio Mendel, pewarisan sifat.

3. **Sistem Pernapasan Manusia**
   - *Variabel:* tingkat aktivitas fisik (istirahat → olahraga berat).
   - *Output:* animasi laju pernapasan & pertukaran O2–CO2 pada alveolus yang berubah sesuai aktivitas, grafik frekuensi napas.
   - *Konsep:* mekanisme pernapasan, hubungan aktivitas tubuh dengan kebutuhan oksigen.

### 8.4 Ringkasan Pendekatan Teknis

| Mata Pelajaran | Pendekatan Mesin Simulasi | Alasan |
|---|---|---|
| Fisika | *Physics engine* (kalkulasi dinamis real-time) | Konsep kuantitatif & dinamis (gerak, gaya, listrik) butuh perhitungan fisik akurat |
| Kimia | *Rule-based reaction engine* | Reaksi molekuler terlalu kompleks untuk real-time; cukup dipetakan ke hasil yang tervalidasi sesuai teori |
| Biologi | Model interaktif/animasi bertahap (*state-machine*) | Konsep lebih struktural & prosedural, lebih pas direpresentasikan lewat diagram & animasi terarah |

## 9. Arsitektur Sistem & Teknologi

- **Frontend:** React/Next.js + Tailwind CSS, dengan rendering simulasi menggunakan kombinasi Canvas/SVG dan *physics engine* ringan (mis. Matter.js) untuk simulasi mekanika seperti gerak parabola dan sirkuit listrik sederhana.
- **Mesin Simulasi Kimia:** *rule-based reaction engine* — basis data reaksi & ambang batas variabel (konsentrasi, suhu, pH) yang memicu animasi hasil reaksi secara visual, tanpa memerlukan komputasi kimia berat.
- **Mesin Simulasi Biologi:** model interaktif berbasis SVG/animasi bertahap (fotosintesis, pewarisan sifat, sistem organ) yang merespons input siswa (misalnya intensitas cahaya, persilangan gen).
- **Backend:** Node.js (Express) atau Laravel untuk REST API, menangani autentikasi berbasis peran (siswa/guru/admin sekolah), penyimpanan hasil eksperimen, dan logika asesmen.
- **Basis Data:** PostgreSQL/MySQL untuk data pengguna, hasil eksperimen, dan bank soal.
- **Asisten AI:** integrasi API model bahasa untuk fitur asisten belajar kontekstual (dapat dikembangkan sebagai fitur opsional pada tahap lanjut).
- **Infrastruktur:** hosting cloud dengan CDN untuk distribusi aset statis, dioptimalkan untuk latensi rendah di luar Jawa.

## 9. Alur Penggunaan (User Flow)

1. Guru memilih topik simulasi yang sesuai CP/TP dan menugaskannya ke kelas melalui dashboard.
2. Siswa login, membaca tujuan & ringkasan teori singkat sebelum memulai.
3. Siswa menjalankan simulasi, mengubah variabel, dan mengamati hasil secara interaktif.
4. Siswa mencatat data dan menjawab pertanyaan pemantik pada lembar kerja digital yang terhubung langsung dengan simulasi.
5. Sistem menyusun draf laporan praktikum otomatis berdasarkan data dan jawaban siswa.
6. Guru meninjau laporan, memberi nilai/feedback, dan memantau progres seluruh kelas melalui dashboard rekap.

## 10. Keunikan & Nilai Inovasi

Dibandingkan platform virtual lab yang sudah ada (misalnya PhET Interactive Simulations atau Labster) yang sebagian besar berbahasa asing dan generik secara kurikulum, LabSim Merdeka menonjolkan:

- **Penyelarasan eksplisit dengan CP/TP Kurikulum Merdeka per fase**, bukan sekadar terjemahan simulasi asing.
- **Ekosistem utuh**: simulasi → pencatatan data → asesmen → laporan otomatis, dalam satu alur, bukan kombinasi beberapa tools terpisah.
- **Dirancang untuk kondisi infrastruktur Indonesia** — ringan, hemat data, dan dapat diakses dari perangkat sederhana, menyasar kebutuhan riil sekolah 3T.
- **Dashboard guru untuk monitoring kelas real-time**, memberi guru kendali pedagogis yang sering tidak tersedia di platform simulasi murni.
- **Potensi asisten belajar AI berbahasa Indonesia** yang kontekstual terhadap materi yang sedang dipraktikumkan.

## 11. Dampak & Keberlanjutan

LabSim Merdeka berpotensi menjadi instrumen pemerataan pembelajaran sains, sejalan dengan SDG 4 (Pendidikan Berkualitas) dan agenda pemerataan pendidikan dalam Asta Cita. Untuk keberlanjutan jangka panjang, model yang dapat dieksplorasi antara lain:

- Kemitraan dengan Kemendikdasmen/Kemendikbudristek untuk integrasi dengan ekosistem Platform Merdeka Mengajar.
- Skema akses gratis/bersubsidi untuk sekolah negeri di daerah 3T, didukung kerja sama CSR atau hibah pendidikan.
- Keterlibatan komunitas guru IPA dalam mengembangkan dan memperkaya konten simulasi (model kontribusi terbuka/*crowdsourced content*).

## 12. Rencana Pengembangan (Roadmap)

| Tahap | Fokus |
|---|---|
| **MVP** | 3–4 simulasi inti Fisika (Hukum Ohm, gerak parabola) dengan lembar kerja & laporan otomatis dasar; uji coba terbatas di beberapa sekolah, termasuk 1 sekolah 3T sebagai studi kasus |
| **Tahap 2** | Penambahan modul Kimia & Biologi, dashboard guru lengkap, bank soal asesmen |
| **Tahap 3** | Asisten belajar AI, mode hemat data/PWA, serta eksplorasi integrasi dengan Platform Merdeka Mengajar |

## 13. Penutup

LabSim Merdeka merupakan inovasi pendidikan digital yang menjembatani keterbatasan fasilitas laboratorium dengan kebutuhan pembelajaran sains yang kontekstual, interaktif, dan sesuai kurikulum nasional. Dengan kombinasi simulasi yang selaras kurikulum, ekosistem asesmen-pelaporan yang utuh, dan desain yang mempertimbangkan kondisi infrastruktur Indonesia, platform ini diharapkan dapat meningkatkan pemahaman konsep, mendorong partisipasi aktif siswa, serta memperluas akses pembelajaran praktikum sains secara merata di seluruh Indonesia.

---
*Catatan: dokumen ini adalah draf ide untuk dikembangkan lebih lanjut menjadi proposal lengkap GEMASTIK 2026 Divisi Pengembangan Perangkat Lunak. Bagian yang masih perlu dilengkapi sebelum submission: tim & pembagian peran, mockup/wireframe antarmuka, dan bukti konsep (prototype) minimal satu modul simulasi.*