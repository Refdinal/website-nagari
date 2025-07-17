const pool = require("../config/db");

const getIndexTahun = async (tahun) => {
  const skor = await pool.query(
    `
    SELECT sum(skor) AS skor
    FROM indexdesa
    WHERE tahun = $1
    `,
    [tahun]
  );
  const max_skor = await pool.query(
    `
    SELECT sum(max_skor) AS max_skor 
    FROM indexdesa
    WHERE tahun = $1
    `,
    [tahun]
  );
  const index = await pool.query(
    `
    WITH t_year AS (SELECT * FROM indexdesa WHERE tahun = $1)

    SELECT ROUND(SUM(skor) * 1.0 / SUM(max_skor), 2) AS index_desa
    FROM t_year

    `,
    [tahun]
  );
  const skor_desa = skor.rows;
  const max_skor_desa = max_skor.rows;
  const index_desa = index.rows;

  return { skor_desa, max_skor_desa, index_desa };
};
const checkYear = async (tahun) => {
  const check = await pool.query(
    `
    SELECT * FROM indexdesa WHERE tahun = $1
    `,
    [tahun]
  );
  return check.rows;
};

const getDataTahun = async (tahun) =>
  await pool.query(
    `
    SELECT * FROM indexdesa WHERE tahun = $1 ORDER BY nomor
    `,
    [tahun]
  );

const deleteDataTahun = async (tahun) => {
  const deleteData = await pool.query(
    `
    DELETE FROM indexdesa WHERE tahun = $1
    `,
    [tahun]
  );
  return deleteData;
};

const insertDataTahun = async (tahun) => {
  const data = await pool.query(
    `
INSERT INTO indexdesa (nomor, tahun, dimensi, sub_dimensi, indikator, aspek_penilaian, max_skor, skor) VALUES ( 31, $1 , 'I. Dimensi Layanan Dasar', '1-A. Sub-Dimensi Pendidikan', '3. Akses Terhadap SMP/MTs/Sederajat', 'Kemudahan Akses', 5, 1),
 ( 32, $1 , 'I. Dimensi Layanan Dasar', '1-A. Sub-Dimensi Pendidikan', '3. Akses Terhadap SMP/MTs/Sederajat', 'Angka Partisipasi Murni(APM)', 5, 1),
 ( 41, $1 , 'I. Dimensi Layanan Dasar', '1-A. Sub-Dimensi Pendidikan', '4. Akses Terhadap SMA/SMK/MA/MAK/Sederajat', 'Kemudahan Akses', 5, 1),
 ( 42, $1 , 'I. Dimensi Layanan Dasar', '1-A. Sub-Dimensi Pendidikan', '4. Akses Terhadap SMA/SMK/MA/MAK/Sederajat', 'Angka Partisipasi Murni(APM)', 5, 1),
 ( 51, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '5. Layanan Sarana Kesehatan', 'Kemudahan Akses', 5, 1),
 ( 61, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '6. Fasilitas Kesehatan, Pos Kesehatan Desa, Pondok Bersalin Desa, atau pos Pelayanan Terpadu', 'Ketersedian', 5, 1),
 ( 62, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '6. Fasilitas Kesehatan, Pos Kesehatan Desa, Pondok Bersalin Desa, atau pos Pelayanan Terpadu', 'Kemudahan Akses', 5, 1),
 ( 71, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '7. Aktivitas Posyandu', 'Ketersedian', 5, 1),
 ( 72, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '7. Aktivitas Posyandu', 'Jumlah Aktivitas Rutin', 5, 1),
 ( 73, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '7. Aktivitas Posyandu', 'Kemudahan Akses', 5, 1),
 ( 81, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '8. Layanan Dokter', 'Ketersediaan Layanan Dokter', 5, 1),
 ( 82, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '8. Layanan Dokter', 'Hari Operasional', 5, 1),
 ( 83, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '8. Layanan Dokter', 'Penyedia Layanan', 5, 1),
 ( 84, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '8. Layanan Dokter', 'Penyedia Transportasi Penunjang', 5, 1),
 ( 91, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '9. Layanan Bidan', 'Ketersediaan Layanan Dokter', 5, 1),
 ( 92, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '9. Layanan Bidan', 'Hari Operasional', 5, 1),
 ( 93, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '9. Layanan Bidan', 'Penyedia Layanan', 5, 1),
 ( 94, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '9. Layanan Bidan', 'Penyedia Transportasi Penunjang', 5, 1),
 ( 101, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '10. Layanan Tenaga Kesehatan', 'Ketersediaan Layanan Dokter', 5, 1),
 ( 102, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '10. Layanan Tenaga Kesehatan', 'Hari Operasional', 5, 1),
 ( 103, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '10. Layanan Tenaga Kesehatan', 'Penyedia Layanan', 5, 1),
 ( 104, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '10. Layanan Tenaga Kesehatan', 'Penyedia Transportasi Penunjang', 5, 1),
 ( 111, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '11. Jaminan Kesehatan Nasional', 'Persentase Kepesertaan Jaminan Kesehatan Nasional', 5, 1),
 ( 112, $1 , 'I. Dimensi Layanan Dasar', '1-B. Sub-Dimensi Kesehatan', '11. Jaminan Kesehatan Nasional', 'Kegiatan Sosialisasi dan/atau Advokasi', 5, 1),
 ( 121, $1 , 'I. Dimensi Layanan Dasar', '1-C. Sub-Dimensi Utilitas Dasar', '12. Air Minum', 'Hari Operasional Penyediaan Air Minum di Desa Dalam Kurun Waktu satu Minggu', 5, 1),
 ( 122, $1 , 'I. Dimensi Layanan Dasar', '1-C. Sub-Dimensi Utilitas Dasar', '12. Air Minum', 'Ketersedian Air Minum Untuk Warga Desa', 5, 1),
 ( 123, $1 , 'I. Dimensi Layanan Dasar', '1-C. Sub-Dimensi Utilitas Dasar', '12. Air Minum', 'Kemudahan Air Minum Untuk Warga di Desa', 5, 1),
 ( 124, $1 , 'I. Dimensi Layanan Dasar', '1-C. Sub-Dimensi Utilitas Dasar', '12. Air Minum', 'Bagaimana Kualitas Air Minum di Desa (Tidak untuk berbau, berwarna & berasa)', 5, 1),
 ( 125, $1 , 'I. Dimensi Layanan Dasar', '1-C. Sub-Dimensi Utilitas Dasar', '13. Persentase Rumah Tidak Layak Huni', 'Persentase Keanggotaan', 5, 1),
 ( 141, $1 , 'II. Dimensi Sosial', 'II-A. Sub-Dimensi Aktivitas', '14. Kearifan Sosial/Budaya', 'Kearifan Budaya/Sosial', 5, 1),
 ( 142, $1 , 'II. Dimensi Sosial', 'II-A. Sub-Dimensi Aktivitas', '14. Kearifan Sosial/Budaya', 'Kearifan Budaya/Sosial Masih Dipertahankan/dilestarikan', 5, 1),
 ( 151, $1 , 'II. Dimensi Sosial', 'II-A. Sub-Dimensi Aktivitas', '15. Frekuensi Gotong Royong', 'Kegiatan Gotong Royong', 5, 1),
 ( 152, $1 , 'II. Dimensi Sosial', 'II-A. Sub-Dimensi Aktivitas', '15. Frekuensi Gotong Royong', 'Frekuensi kegiatan Gotong Royong', 5, 1),
 ( 153, $1 , 'II. Dimensi Sosial', 'II-A. Sub-Dimensi Aktivitas', '15. Frekuensi Gotong Royong', 'Keterlibatan Warga Gotong Royong', 5, 1),
 ( 161, $1 , 'II. Dimensi Sosial', 'II-A. Sub-Dimensi Aktivitas', '16. Kegiatan Olahraga', 'Frekuensi Kegiatan Olahraga Dalam 1 Bulan', 5, 1),
 ( 171, $1 , 'II. Dimensi Sosial', 'II-A. Sub-Dimensi Aktivitas', '17. Mitigasi dan Penanganan Konflik Sosial', 'Penyelesaian Konflik Secara Damai', 5, 1),
 ( 172, $1 , 'II. Dimensi Sosial', 'II-A. Sub-Dimensi Aktivitas', '17. Mitigasi dan Penanganan Konflik Sosial', 'Peran Aparat Keamanan Menjadi Mediator', 5, 1),
 ( 173, $1 , 'II. Dimensi Sosial', 'II-A. Sub-Dimensi Aktivitas', '17. Mitigasi dan Penanganan Konflik Sosial', 'Peran Aparat Pemerintah', 5, 1),
 ( 174, $1 , 'II. Dimensi Sosial', 'II-A. Sub-Dimensi Aktivitas', '17. Mitigasi dan Penanganan Konflik Sosial', 'Peran Tokoh Masyarakat', 5, 1),
 ( 175, $1 , 'II. Dimensi Sosial', 'II-A. Sub-Dimensi Aktivitas', '17. Mitigasi dan Penanganan Konflik Sosial', 'Peran Tokoh Agama', 5, 1),
 ( 181, $1 , 'II. Dimensi Sosial', 'II-A. Sub-Dimensi Aktivitas', '18. Satuan Keamanan Lingkungan', 'Terdapat Satuan Keamanan Lingkungan', 5, 1),
 ( 182, $1 , 'II. Dimensi Sosial', 'II-A. Sub-Dimensi Aktivitas', '18. Satuan Keamanan Lingkungan', 'Terdapat Aktivitas Satuan Keamanan Lingkungan', 5, 1),
 ( 191, $1 , 'II. Dimensi Sosial', 'II-B. Sub-Dimensi Fasilitas Masyarakat', '19. Taman Bacaan Masyarakat/Perpustakaan Desa', 'Terdapat taman bacaan masyarakat/perpustakaan', 5, 1),
 ( 192, $1 , 'II. Dimensi Sosial', 'II-B. Sub-Dimensi Fasilitas Masyarakat', '19. Taman Bacaan Masyarakat/Perpustakaan Desa', 'Hari Operasional', 5, 1),
 ( 201, $1 , 'II. Dimensi Sosial', 'II-B. Sub-Dimensi Fasilitas Masyarakat', '20. Fasilitas Olahraga', 'Ketersedian Fasilitas dan kondisi/keadaan', 5, 1),
 ( 211, $1 , 'II. Dimensi Sosial', 'II-B. Sub-Dimensi Fasilitas Masyarakat', '21. Keberadaan Ruang Publik Terbuka', 'Keberadaan Fasilitas/Keadaan Ruang Publik Terbuka', 5, 1),
 ( 221, $1 , 'III.Dimensi Ekonomi', 'III-A. Sub-Dimensi Produksi Desa', '22. Keragaman Aktivitas Ekonomi', 'Keragaman Aktivitas Ekonomi', 5, 1),
 ( 222, $1 , 'III.Dimensi Ekonomi', 'III-A. Sub-Dimensi Produksi Desa', '22. Keragaman Aktivitas Ekonomi', 'Keaktifan Aktivitas Ekonomi', 5, 1),
 ( 231, $1 , 'III.Dimensi Ekonomi', 'III-A. Sub-Dimensi Produksi Desa', '23. Produk Unggulan Desa', 'Ketersediaan Produk Unggulan Desa', 5, 1),
 ( 232, $1 , 'III.Dimensi Ekonomi', 'III-A. Sub-Dimensi Produksi Desa', '23. Produk Unggulan Desa', 'Cakupan Pasar Produk Unggulan', 5, 1),
 ( 233, $1 , 'III.Dimensi Ekonomi', 'III-A. Sub-Dimensi Produksi Desa', '23. Produk Unggulan Desa', 'Ketersediaan Merek Dagang', 5, 1),
 ( 241, $1 , 'III.Dimensi Ekonomi', 'III-A. Sub-Dimensi Produksi Desa', '24. Ekonomi Kreatif', 'Terdapat Kearifan Lokal atau Kebudayaan sebagai Kegiatan Ekonomi', 5, 1),
 ( 251, $1 , 'III.Dimensi Ekonomi', 'III-A. Sub-Dimensi Produksi Desa', '25. Kerjasama Desa', 'Telah Dilakukan Kerjasama Desa dengan Desa Lainnya', 5, 1),
 ( 252, $1 , 'III.Dimensi Ekonomi', 'III-A. Sub-Dimensi Produksi Desa', '25. Kerjasama Desa', 'Telah Dilakukan Kerjasama Desa dengan Pihak Ketiga', 5, 1),
 ( 261, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '26. Akses Terhadap Pendidikan Non-Formal, Pusat Keterampilan, atau Kursus', 'Ketersediaan Pendidikan Non-Formal, Pusat Keterampilan, atau Kursus', 5, 1),
 ( 262, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '26. Akses Terhadap Pendidikan Non-Formal, Pusat Keterampilan, atau Kursus', 'Keterlibatan pendidikan Non-Formal, Pusat Keterampilan, atau Kursus', 5, 1),
 ( 271, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '27. Pasar Rakyat', 'Ketersediaan', 5, 1),
 ( 272, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '27. Pasar Rakyat', 'Kemudahan Akses', 5, 1),
 ( 281, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '28. Toko/Pertokoan', 'Ketersediaan', 5, 1),
 ( 282, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '28. Toko/Pertokoan', 'Kemudahan Akses', 5, 1),
 ( 291, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '29. Kedai/Rumah Makan', 'Ketersediaan', 5, 1),
 ( 292, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '29. Kedai/Rumah Makan', 'Kemudahan Akses', 5, 1),
 ( 301, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '30. Penginapan', 'Ketersediaan', 5, 1),
 ( 302, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '30. Penginapan', 'Kemudahan Akses', 5, 1),
 ( 311, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '31. Layanan Pos dan Logistik', 'Ketersediaan', 5, 1),
 ( 312, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '31. Layanan Pos dan Logistik', 'Kemudahan Akses', 5, 1),
 ( 321, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '32. Lembaga Ekonomi', 'Terdapat BUM Desa/ BUM Desa Bersama', 5, 1),
 ( 322, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '32. Lembaga Ekonomi', 'BUM Desa/BUM Desa Bersama Berbadan Hukum', 5, 1),
 ( 323, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '32. Lembaga Ekonomi', 'Hari Operasional', 5, 1),
 ( 324, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '32. Lembaga Ekonomi', 'Ketersediaan Lembaga Ekonomi Lainnya', 5, 1),
 ( 325, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '32. Lembaga Ekonomi', 'Ketersediaan KUD', 5, 1),
 ( 326, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '32. Lembaga Ekonomi', 'Ketersediaan UMKM', 5, 1),
 ( 331, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '33. Layanan Keuangan', 'Tersedia Layanan Perbangkan', 5, 1),
 ( 332, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '33. Layanan Keuangan', 'Hari Operasional', 5, 1),
 ( 333, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '33. Layanan Keuangan', 'Layanan Fasilitas Kredit KUR', 5, 1),
 ( 334, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '33. Layanan Keuangan', 'Layanan Fasilitas Kredit KKP-E', 5, 1),
 ( 335, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '33. Layanan Keuangan', 'Layanan Fasilitas Kredit KUK', 5, 1),
 ( 336, $1 , 'III.Dimensi Ekonomi', 'III-B. Sub-Dimensi Fasilitas Pendukung Ekonomi', '33. Layanan Keuangan', 'Status Layanan Fasilitas Kredit', 5, 1),
 ( 341, $1 , 'IV. Dimensi Lingkungan', 'IV-A Sub-Dimensi Pengelolaan Lingkungan', '34. Kearifan Lingkungan', 'Upaya Menjaga/ Mempertahankan/ Melestarikan kearifan lingkunga', 5, 1),
 ( 342, $1 , 'IV. Dimensi Lingkungan', 'IV-A Sub-Dimensi Pengelolaan Lingkungan', '34. Kearifan Lingkungan', 'Peraturan / regulasi yang mengatur terkait pelestarian lingkungan Desa', 5, 1),
 ( 343, $1 , 'IV. Dimensi Lingkungan', 'IV-A Sub-Dimensi Pengelolaan Lingkungan', '34. Kearifan Lingkungan', 'Kegiatan Pelestarian Lingkungan Berbasis Kearifan Lokal', 5, 1),
 ( 344, $1 , 'IV. Dimensi Lingkungan', 'IV-A Sub-Dimensi Pengelolaan Lingkungan', '34. Kearifan Lingkungan', 'Pemanfaatan Energi Baru Terbarukan', 5, 1),
 ( 351, $1 , 'IV. Dimensi Lingkungan', 'IV-A Sub-Dimensi Pengelolaan Lingkungan', '35. Sistem Pengelolaan Sampah', 'Tempat Pembuangan Sampah', 5, 1),
 ( 352, $1 , 'IV. Dimensi Lingkungan', 'IV-A Sub-Dimensi Pengelolaan Lingkungan', '35. Sistem Pengelolaan Sampah', 'Pengelolaan Sampah', 5, 1),
 ( 353, $1 , 'IV. Dimensi Lingkungan', 'IV-A Sub-Dimensi Pengelolaan Lingkungan', '35. Sistem Pengelolaan Sampah', 'Pemanfaatan Sampah', 5, 1),
 ( 361, $1 , 'IV. Dimensi Lingkungan', 'IV-A Sub-Dimensi Pengelolaan Lingkungan', '36. Tingkat Pencemaran Lingkungan', 'Kejadian Pencemaran Lingkungan', 5, 1),
 ( 371, $1 , 'IV. Dimensi Lingkungan', 'IV-A Sub-Dimensi Pengelolaan Lingkungan', '37. Sistem Pembuangan Air Limbah Rumah Tangga', 'Tersedia dan Memiliki Jamban', 5, 1),
 ( 372, $1 , 'IV. Dimensi Lingkungan', 'IV-A Sub-Dimensi Pengelolaan Lingkungan', '37. Sistem Pembuangan Air Limbah Rumah Tangga', 'Keberfungsian Jamban', 5, 1),
 ( 373, $1 , 'IV. Dimensi Lingkungan', 'IV-A Sub-Dimensi Pengelolaan Lingkungan', '37. Sistem Pembuangan Air Limbah Rumah Tangga', 'Tersedia Septick Tank', 5, 1),
 ( 374, $1 , 'IV. Dimensi Lingkungan', 'IV-A Sub-Dimensi Pengelolaan Lingkungan', '37. Sistem Pembuangan Air Limbah Rumah Tangga', 'Pembuangan Air Limbah Cair Rumah', 5, 1),
 ( 381, $1 , 'IV. Dimensi Lingkungan', 'IV-B Sub-Dimensi Penanggulangan Bencana', '38. Penanggulangan Bencana', 'Aspek Informasi Kebencanaan', 5, 1),
 ( 382, $1 , 'IV. Dimensi Lingkungan', 'IV-B Sub-Dimensi Penanggulangan Bencana', '38. Penanggulangan Bencana', 'Fasilitas Mitigasi Bencana', 5, 1),
 ( 383, $1 , 'IV. Dimensi Lingkungan', 'IV-B Sub-Dimensi Penanggulangan Bencana', '38. Penanggulangan Bencana', 'Akses Menuju Fasilitas Bencana', 5, 1),
 ( 384, $1 , 'IV. Dimensi Lingkungan', 'IV-B Sub-Dimensi Penanggulangan Bencana', '38. Penanggulangan Bencana', 'Aktifitas Mitigasi dan atau Rehabilitasi Bencana', 5, 1),
 ( 385, $1 , 'IV. Dimensi Lingkungan', 'IV-B Sub-Dimensi Penanggulangan Bencana', '38. Penanggulangan Bencana', 'Fasilitas Aspek Tanggap Darurat Bencana', 5, 1),
 ( 391, $1 , 'V. Dimensi Aksesibilitas', 'V-A Sub-Dimensi Kondisi Akses Jalan', '39. Kondisi Jalan Desa', 'Jenis Permukaan Jalan', 5, 1),
 ( 392, $1 , 'V. Dimensi Aksesibilitas', 'V-A Sub-Dimensi Kondisi Akses Jalan', '39. Kondisi Jalan Desa', 'Kualitas Jalan', 5, 1),
 ( 401, $1 , 'V. Dimensi Aksesibilitas', 'V-A Sub-Dimensi Kondisi Akses Jalan', '40. Kondisi Penerangan Jalan', 'Penerangan Jalan Utama', 5, 1),
 ( 402, $1 , 'V. Dimensi Aksesibilitas', 'V-A Sub-Dimensi Kondisi Akses Jalan', '40. Kondisi Penerangan Jalan', 'Hari Operasional PJU', 5, 1),
 ( 411, $1 , 'V. Dimensi Aksesibilitas', 'V-B Sub-Dimensi Kemudahan Akses', '41. Keberadaan Angkutan Perdesaan, Angkutan Lokal, atau angkutan yang sejenis', 'Angkutan Perdesaan, Angkutan Lokal, atau Angkutan yang Sejenis', 5, 1),
 ( 412, $1 , 'V. Dimensi Aksesibilitas', 'V-B Sub-Dimensi Kemudahan Akses', '41. Keberadaan Angkutan Perdesaan, Angkutan Lokal, atau angkutan yang sejenis', 'Hari Operasional', 5, 1),
 ( 421, $1 , 'V. Dimensi Aksesibilitas', 'V-B Sub-Dimensi Kemudahan Akses', '42. Akses Listrik', 'Pelayanan Listrik', 5, 1),
 ( 422, $1 , 'V. Dimensi Aksesibilitas', 'V-B Sub-Dimensi Kemudahan Akses', '42. Akses Listrik', 'Lama Durasi Layanan Listrik', 5, 1),
 ( 431, $1 , 'V. Dimensi Aksesibilitas', 'V-B Sub-Dimensi Kemudahan Akses', '43. Layanan Telekomunikasi', 'Akses Telepon', 5, 1),
 ( 432, $1 , 'V. Dimensi Aksesibilitas', 'V-B Sub-Dimensi Kemudahan Akses', '43. Layanan Telekomunikasi', 'Akses Internet', 5, 1),
 ( 441, $1 , 'VI. Dimensi Tata Kelola Pemerintahan Desa', 'VI-A Sub-Dimensi Kelembagaan dan Pelayanan Desa', '44. Pelaksanaan Pelayanan dan Administrasi Desa', 'Layanan Diberikan', 5, 1),
 ( 451, $1 , 'VI. Dimensi Tata Kelola Pemerintahan Desa', 'VI-A Sub-Dimensi Kelembagaan dan Pelayanan Desa', '45. Pemanfaatan Teknologi dalam Pelayanan Desa', 'Publikasi Informasi Pelayanan', 5, 1),
 ( 452, $1 , 'VI. Dimensi Tata Kelola Pemerintahan Desa', 'VI-A Sub-Dimensi Kelembagaan dan Pelayanan Desa', '45. Pemanfaatan Teknologi dalam Pelayanan Desa', 'Pelayanan Administrasi', 5, 1),
 ( 453, $1 , 'VI. Dimensi Tata Kelola Pemerintahan Desa', 'VI-A Sub-Dimensi Kelembagaan dan Pelayanan Desa', '45. Pemanfaatan Teknologi dalam Pelayanan Desa', 'Pelayanan Pengaduan', 5, 1),
 ( 454, $1 , 'VI. Dimensi Tata Kelola Pemerintahan Desa', 'VI-A Sub-Dimensi Kelembagaan dan Pelayanan Desa', '45. Pemanfaatan Teknologi dalam Pelayanan Desa', 'Pelayanan Lainnya', 5, 1),
 ( 461, $1 , 'VI. Dimensi Tata Kelola Pemerintahan Desa', 'VI-A Sub-Dimensi Kelembagaan dan Pelayanan Desa', '46. Musyawarah Desa', 'Musyawarah Desa Dalam 1 Tahun', 5, 1),
 ( 462, $1 , 'VI. Dimensi Tata Kelola Pemerintahan Desa', 'VI-A Sub-Dimensi Kelembagaan dan Pelayanan Desa', '46. Musyawarah Desa', 'Musyawarah Desa Dihadiri oleh Unsur Masyarakat', 5, 1),
 ( 471, $1 , 'VI. Dimensi Tata Kelola Pemerintahan Desa', 'VI-B Sub-Dimensi Tata Kelola Keuangan Desa', '47. Pendapatan Asli Desa dan Dana Desa', 'Pendapatan Asli Desa', 5, 1),
 ( 472, $1 , 'VI. Dimensi Tata Kelola Pemerintahan Desa', 'VI-B Sub-Dimensi Tata Kelola Keuangan Desa', '47. Pendapatan Asli Desa dan Dana Desa', 'Peningkatan PADes', 5, 1),
 ( 473, $1 , 'VI. Dimensi Tata Kelola Pemerintahan Desa', 'VI-B Sub-Dimensi Tata Kelola Keuangan Desa', '47. Pendapatan Asli Desa dan Dana Desa', 'Penyertaan Modal dari DD ke BUM Desa', 5, 1),
 ( 481, $1 , 'VI. Dimensi Tata Kelola Pemerintahan Desa', 'VI-B Sub-Dimensi Tata Kelola Keuangan Desa', '48. Jumlah Kepemilikan dan Produktivitas Aset Desa', 'Aset Berupa Tanah Desa', 5, 1),
 ( 482, $1 , 'VI. Dimensi Tata Kelola Pemerintahan Desa', 'VI-B Sub-Dimensi Tata Kelola Keuangan Desa', '48. Jumlah Kepemilikan dan Produktivitas Aset Desa', 'Aset Berupa Kantor Desa', 5, 1),
 ( 483, $1 , 'VI. Dimensi Tata Kelola Pemerintahan Desa', 'VI-B Sub-Dimensi Tata Kelola Keuangan Desa', '48. Jumlah Kepemilikan dan Produktivitas Aset Desa', 'Aset Berupa Pasar Desa', 5, 1),
 ( 484, $1 , 'VI. Dimensi Tata Kelola Pemerintahan Desa', 'VI-B Sub-Dimensi Tata Kelola Keuangan Desa', '48. Jumlah Kepemilikan dan Produktivitas Aset Desa', 'Aset Lainnya', 5, 1),
 ( 485, $1 , 'VI. Dimensi Tata Kelola Pemerintahan Desa', 'VI-B Sub-Dimensi Tata Kelola Keuangan Desa', '48. Jumlah Kepemilikan dan Produktivitas Aset Desa', 'Produktivitas Kepemilikan Aset Desa', 5, 1),
 ( 486, $1 , 'VI. Dimensi Tata Kelola Pemerintahan Desa', 'VI-B Sub-Dimensi Tata Kelola Keuangan Desa', '48. Jumlah Kepemilikan dan Produktivitas Aset Desa', 'Inventarisasi Aset Desa', 5, 1),
 ( 11, $1 , 'I. Dimensi Layanan Dasar', '1-A. Sub-Dimensi Pendidikan', '1. Akses Terhadap PAUD/TK/SEDERAJAT', 'Ketersediaan', 5, 1),
 ( 12, $1 , 'I. Dimensi Layanan Dasar', '1-A. Sub-Dimensi Pendidikan', '1. Akses Terhadap PAUD/TK/SEDERAJAT', 'Kemudahan Akses', 5, 1),
 ( 13, $1 , 'I. Dimensi Layanan Dasar', '1-A. Sub-Dimensi Pendidikan', '1. Akses Terhadap PAUD/TK/SEDERAJAT', 'Angka Partisipasi Murni(APM)', 5, 1),
 ( 21, $1 , 'I. Dimensi Layanan Dasar', '1-A. Sub-Dimensi Pendidikan', '2. Akses Terhadap SD/MI/Sederajat', 'Kemudahan Akses', 5, 1),
 ( 22, $1 , 'I. Dimensi Layanan Dasar', '1-A. Sub-Dimensi Pendidikan', '2. Akses Terhadap SD/MI/Sederajat', 'Angka Partisipasi Murni(APM)', 5, 1)
 returning *   
 `,
    [tahun]
  );
  return data;
};

const editById = async (skor, id) => {
  const data = await pool.query(
    `UPDATE indexdesa 
       SET skor = $1
       WHERE id = $2
       RETURNING *
    `,
    [skor, id]
  );
};
module.exports = {
  getIndexTahun,
  getDataTahun,
  insertDataTahun,
  deleteDataTahun,
  checkYear,
  editById,
};
