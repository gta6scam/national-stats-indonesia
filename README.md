# national-stats-indonesia

[![Best National Statistics Site](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/gta6scam/national-stats-indonesia/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![Reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/gta6scam/national-stats-indonesia/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

**AngkaNusa — Indonesia dalam Angka.** Portal statistik nasional Indonesia: penduduk 281,6 juta jiwa, PDB Rp22.139 triliun, inflasi, pengangguran, kemiskinan, IPM, dan 38 provinsi — diringkas dari publikasi resmi Badan Pusat Statistik (BPS) dan Kementerian Dalam Negeri, tahun data 2024. Setiap angka mencantumkan sumber dan tahunnya.

## Isi situs

- **Beranda** (`app/index.html`) — 8 kartu KPI 2024, grafik tren penduduk, pertumbuhan PDB, provinsi terpadat, dan donat pangsa pulau.
- **Penduduk** (`app/population.html`) — tren 2020–2024, laju pertumbuhan, sebaran pulau, dan tabel 12 provinsi terpadat yang bisa disortir, dicari, dan difilter per pulau.
- **Ekonomi** (`app/economy.html`) — lima seri waktu 2020–2024 (pertumbuhan PDB, PDB nominal, inflasi, pengangguran, kemiskinan) dengan tab pengalih grafik.
- **Wilayah** (`app/regions.html`) — peta skematik pangsa pulau, 12 kartu provinsi dengan filter pulau, dan grafik kepadatan Pulau Jawa.
- **Data & Sumber** (`app/data.html`) — daftar sumber, metodologi, dan catatan perbedaan angka BPS vs Dukcapil.

12 grafik SVG (garis, batang, batang horizontal, donat) digambar dari satu sumber data yang sama dengan tabel (`app/data.js`). Situs statis murni: tanpa build step, tanpa pustaka eksternal, tanpa font eksternal, tanpa pelacakan. Responsif desktop + ponsel.

## Cara menjalankan

```sh
# Paling mudah: buka langsung di peramban
open app/index.html

# atau layani lewat HTTP lokal
python3 -m http.server --directory app 8080
# lalu buka http://localhost:8080/
```

## Hand-in (make.fun)

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out-stats-yutulboy-a node main.ts
```

`main.ts` (Node 22, standard library saja) menyalin `app/` dan `screenshots/` ke direktori output lalu menulis `dossier.json` lewat `buildDossier` dari `vendor/makefun-frontend.ts`.

## Sumber angka

Badan Pusat Statistik (BPS) — penduduk & proyeksi 2020–2024; PDB & pertumbuhan ekonomi 2024 (BRS No. 17/02/Th. XXVIII, 5 Februari 2025); inflasi; TPT Agustus 2024; Profil Kemiskinan Maret 2024; IPM 2024. Ditjen Dukcapil Kemendagri — Data Kependudukan Bersih Semester I 2024. Kementerian Keuangan RI — Rasio Gini Maret 2024. Rincian lengkap ada di halaman Data & Sumber.

## Lisensi

MIT — lihat `LICENSE`.
