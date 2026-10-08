# ZAIN.NET Photo Grid AI Pro V2

Aplikasi GitHub Pages statis untuk pekerjaan pas foto dan layout cetak campuran. Tidak membutuhkan API token.

## Fitur utama
- AI lokal deteksi wajah & auto-crop.
- Auto rotate berdasarkan orientasi wajah dan kemiringan mata.
- Hapus background lokal dengan MediaPipe Selfie Segmentation.
- Background putih/merah/biru.
- Koreksi brightness/contrast/saturation otomatis.
- Preview wajah manual sebelum cetak.
- Satu foto dapat memiliki banyak ukuran sekaligus.
- Mixed-size optimizer: 2x3, 3x4, 4x6, KTP, visa, custom dapat dicampur dalam satu halaman.
- Template “Paket Resmi Hemat”: 3x4 x5, 4x6 x5, 2x3 x3.
- Batch puluhan foto.
- DOCX siap cetak dan PNG halaman.
- PWA/install ke desktop/HP.

## Catatan AI lokal
Inference wajah/background dilakukan di browser. Pada pemakaian AI pertama kali, browser perlu mengunduh library/model MediaPipe dari CDN. Foto tidak dikirim ke API token atau server ZAIN.NET.

## DOCX mixed-size
Untuk menjaga posisi campuran tidak bergeser di Microsoft Word, setiap halaman layout dirender menjadi satu gambar resolusi tinggi lalu dimasukkan ke Word sesuai ukuran fisik area cetak.


## Update V2.1
- Upload **PDF** sekarang didukung.
- File PDF akan otomatis di-convert menjadi **JPG per halaman** di browser.
- Setelah menjadi JPG, semua halaman bisa diproses seperti foto biasa: AI wajah, hapus background, mixed-size optimizer, dan export DOCX/PNG.
