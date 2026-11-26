/* AngkaNusa — data.js
 * Semua angka nyata, dikutip dari sumber resmi. Setiap seri mencantumkan
 * lembaga sumber dan tahun. Tidak ada angka karangan di berkas ini.
 * Satuan: penduduk dalam juta jiwa, uang dalam triliun rupiah (kecuali disebut lain).
 */
(function () {
  "use strict";

  var ANGKA = {
    meta: {
      siteName: "AngkaNusa",
      tagline: "Indonesia dalam Angka — portal statistik nasional",
      country: "Indonesia",
      lastUpdated: "26 November 2026",
      note: "Angka-angka di situs ini dikutip dari publikasi resmi. Lihat halaman Data & Sumber untuk rincian metodologi."
    },

    /* ---- Indikator utama (BPS, 2024) ---- */
    kpi: [
      { id: "populasi", label: "Penduduk", value: "281,6 jt", sub: "pertengahan 2024", delta: "+1,04% dari 2023", source: "BPS, 2024" },
      { id: "pdb", label: "PDB (harga berlaku)", value: "Rp22.139 T", sub: "tahun 2024", delta: "tumbuh 5,03%", source: "BPS, 2025" },
      { id: "pdbkapita", label: "PDB per kapita", value: "Rp78,6 jt", sub: "USD 4.960,3 · 2024", delta: "naik dari Rp75,0 jt (2023)", source: "BPS, 2025" },
      { id: "inflasi", label: "Inflasi (y-on-y)", value: "1,57%", sub: "tahun kalender 2024", delta: "turun dari 2,61% (2023)", source: "BPS, 2024" },
      { id: "tpt", label: "Pengangguran terbuka", value: "4,91%", sub: "Agustus 2024", delta: "turun dari 5,32% (2023)", source: "BPS, 2024" },
      { id: "miskin", label: "Penduduk miskin", value: "9,03%", sub: "Maret 2024 · 25,22 jt jiwa", delta: "turun dari 9,36% (2023)", source: "BPS, 2024" },
      { id: "ipm", label: "IPM", value: "75,02", sub: "kategori Tinggi · 2024", delta: "naik 0,63 poin dari 2023", source: "BPS, 2024" },
      { id: "uhh", label: "Umur harapan hidup", value: "74,15 thn", sub: "saat lahir · 2024", delta: "naik 0,22 tahun dari 2023", source: "BPS, 2024" }
    ],

    /* ---- Tren penduduk 2020–2024 (BPS) ---- */
    populationTrend: {
      title: "Jumlah penduduk Indonesia, 2020–2024",
      unit: "juta jiwa",
      source: "Badan Pusat Statistik (BPS), 2024 — proyeksi pertengahan tahun",
      years: [2020, 2021, 2022, 2023, 2024],
      values: [270.20, 272.68, 275.77, 278.70, 281.60]
    },

    populationGrowth: {
      title: "Laju pertumbuhan penduduk, 2021–2024",
      unit: "persen per tahun",
      source: "Badan Pusat Statistik (BPS), 2024",
      years: [2021, 2022, 2023, 2024],
      values: [0.92, 1.13, 1.06, 1.04]
    },

    /* ---- Distribusi pulau (Dukcapil Kemendagri, Semester I 2024) ---- */
    islandShare: {
      title: "Penduduk menurut pulau — Jawa menampung lebih dari separuh penduduk",
      source: "Ditjen Dukcapil Kemendagri, Data Kependudukan Bersih Semester I 2024",
      note: "Pulau Jawa: 157,39 juta jiwa (55,93%) — Dukcapil 2024. Pangsa pulau lain dihitung dari jumlah penduduk provinsi (BPS, 2024).",
      slices: [
        { label: "Jawa", value: 55.93 },
        { label: "Sumatera", value: 20.71 },
        { label: "Kalimantan", value: 5.79 },
        { label: "Sulawesi", value: 7.05 },
        { label: "Bali & Nusa Tenggara", value: 5.50 },
        { label: "Maluku & Papua", value: 5.02 }
      ]
    },

    /* ---- Provinsi terpadat (BPS, 2024; juta jiwa) ---- */
    provinces: [
      { name: "Jawa Barat", island: "Jawa", pop: 50.35, density: 1359 },
      { name: "Jawa Timur", island: "Jawa", pop: 41.81, density: 870 },
      { name: "Jawa Tengah", island: "Jawa", pop: 37.89, density: 1104 },
      { name: "Sumatera Utara", island: "Sumatera", pop: 15.59, density: null },
      { name: "Banten", island: "Jawa", pop: 12.43, density: 1329 },
      { name: "DKI Jakarta", island: "Jawa", pop: 10.68, density: 16165 },
      { name: "Lampung", island: "Sumatera", pop: 9.40, density: null },
      { name: "Sulawesi Selatan", island: "Sulawesi", pop: 9.36, density: null },
      { name: "Sumatera Selatan", island: "Sumatera", pop: 8.99, density: null },
      { name: "Riau", island: "Sumatera", pop: 6.94, density: null },
      { name: "Sumatera Barat", island: "Sumatera", pop: 5.76, density: null },
      { name: "DI Yogyakarta", island: "Jawa", pop: 3.75, density: 1193 }
    ],
    provinceSource: "Badan Pusat Statistik (BPS), 2024 — jumlah penduduk menurut provinsi; kepadatan dikutip untuk provinsi Pulau Jawa (BPS, 2024)",

    /* ---- Ekonomi ---- */
    gdpGrowth: {
      title: "Pertumbuhan ekonomi (PDB), 2021–2024",
      unit: "persen (y-on-y)",
      source: "Badan Pusat Statistik (BPS), Berita Resmi Statistik No. 17/02/Th. XXVIII, 5 Februari 2025",
      years: [2021, 2022, 2023, 2024],
      values: [3.70, 5.31, 5.05, 5.03]
    },
    gdpNominal: {
      title: "PDB atas dasar harga berlaku",
      unit: "triliun rupiah",
      source: "Badan Pusat Statistik (BPS), 2025",
      years: [2021, 2022, 2023, 2024],
      values: [16976, 19588, 20892, 22139]
    },
    inflation: {
      title: "Inflasi tahun kalender, 2021–2024",
      unit: "persen",
      source: "Badan Pusat Statistik (BPS), 2024",
      years: [2021, 2022, 2023, 2024],
      values: [1.87, 5.51, 2.61, 1.57]
    },
    unemployment: {
      title: "Tingkat Pengangguran Terbuka (TPT), Agustus 2021–2024",
      unit: "persen",
      source: "Badan Pusat Statistik (BPS), Keadaan Ketenagakerjaan Indonesia Agustus 2024",
      years: [2021, 2022, 2023, 2024],
      values: [6.49, 5.86, 5.32, 4.91]
    },
    poverty: {
      title: "Tingkat kemiskinan, Maret 2020–2024",
      unit: "persen penduduk",
      source: "Badan Pusat Statistik (BPS), Profil Kemiskinan di Indonesia Maret 2024",
      years: [2020, 2021, 2022, 2023, 2024],
      values: [9.78, 10.14, 9.54, 9.36, 9.03]
    },
    gini: { value: 0.379, year: 2024, note: "Rasio Gini Maret 2024, turun dari 0,388 pada Maret 2023", source: "BPS / Kemenkeu, 2024" },
    sectorNotes: [
      { label: "Lapangan usaha tumbuh tercepat 2024", value: "Jasa Lainnya +9,80%", source: "BPS, 2025" },
      { label: "Komponen pengeluaran tumbuh tercepat 2024", value: "Konsumsi LNPRT +12,48%", source: "BPS, 2025" },
      { label: "Perdagangan — kontribusi ke PDB", value: "13,07%", source: "BPS, 2025" },
      { label: "Penduduk bekerja, Februari 2024", value: "142,18 juta orang", source: "BPS, 2024" },
      { label: "Angkatan kerja, Agustus 2024", value: "152,11 juta orang", source: "BPS, 2024" }
    ],

    /* ---- Pembangunan manusia ---- */
    hdi: {
      title: "Indeks Pembangunan Manusia (IPM), 2020–2024",
      unit: "indeks (0–100)",
      source: "Badan Pusat Statistik (BPS), 15 November 2024",
      years: [2020, 2021, 2022, 2023, 2024],
      values: [72.81, 73.16, 73.77, 74.39, 75.02]
    },
    hdiComponents: [
      { label: "Umur Harapan Hidup (UHH)", value: "74,15 tahun", note: "naik dari 73,37 tahun pada 2020", source: "BPS, 2024" },
      { label: "Harapan Lama Sekolah (HLS)", value: "13,21 tahun", note: "setara diploma; naik dari 12,98 tahun pada 2020", source: "BPS, 2024" },
      { label: "Rata-rata Lama Sekolah (RLS)", value: "8,85 tahun", note: "naik dari 8,48 tahun pada 2020", source: "BPS, 2024" },
      { label: "Pengeluaran riil per kapita", value: "Rp12,34 jt/thn", note: "disesuaikan; naik Rp442 ribu dari 2023", source: "BPS, 2024" },
      { label: "IPM tertinggi provinsi 2024", value: "DKI Jakarta 84,15", note: "kategori Sangat Tinggi", source: "BPS, 2024" }
    ],

    /* ---- Geografi (BPS, 2024) ---- */
    geography: [
      { label: "Luas daratan", value: "1.890.180 km²", source: "BPS, 2024" },
      { label: "Jumlah pulau", value: "17.380", source: "BPS, 2024" },
      { label: "Bahasa daerah", value: "718", source: "BPS, 2024" },
      { label: "Provinsi", value: "38", source: "BPS, 2024" },
      { label: "Kepadatan penduduk", value: "149 jiwa/km²", note: "281,6 jt jiwa ÷ luas daratan", source: "BPS, 2024 (dihitung)" },
      { label: "Penduduk di Pulau Jawa", value: "55,93%", note: "157,39 juta jiwa", source: "Dukcapil Kemendagri, 2024" }
    ],

    sources: [
      { name: "Badan Pusat Statistik (BPS)", items: "Jumlah penduduk & proyeksi 2020–2024; PDB & pertumbuhan ekonomi 2024 (BRS No. 17/02/Th. XXVIII, 5 Feb 2025); inflasi; TPT Agustus 2024; Profil Kemiskinan Maret 2024; IPM 2024 (15 Nov 2024).", url: "https://www.bps.go.id" },
      { name: "Ditjen Dukcapil, Kemendagri", items: "Data Kependudukan Bersih Semester I 2024 — total 282,48 juta jiwa (administratif), distribusi per pulau dan tiga provinsi terpadat.", url: "https://dukcapil.kemendagri.go.id" },
      { name: "Kementerian Keuangan RI", items: "Rasio Gini Maret 2024 (0,379) dan garis kemiskinan Rp582.932 per kapita per bulan.", url: "https://www.kemenkeu.go.id" },
      { name: "Bank Mandiri — Office of Chief Economist", items: "Penduduk usia kerja 215,37 juta dan angkatan kerja 152,11 juta orang, Agustus 2024.", url: "https://www.bankmandiri.co.id" }
    ]
  };

  window.ANGKA = ANGKA;
})();
