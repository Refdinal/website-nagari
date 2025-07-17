CREATE TABLE income (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  jenis_income VARCHAR(100) NOT NULL,
  sumber_dana VARCHAR(100) NOT NULL,
  tahun_anggaran INT NOT NULL,
  jumlah NUMERIC(15,2) NOT NULL DEFAULT 0.00,
  realisasi NUMERIC(15,2) NOT NULL DEFAULT 0.00
);
INSERT INTO income (jenis_income, sumber_dana, tahun_anggaran,jumlah,realisasi) 
VALUES 
('Pendapatan','Alokasi Dana Desa', 2024, 801541220,701541222),
('Pendapatan','Dana Desa', 2023, 998759000, 988759000),
('Pendapatan','Bunga Bank dan Hibah BMT', 2023, 5345500, 5145500),
('Pendapatan','Alokasi Dana Desa', 2025, 701541220, 601541220),
('Pendapatan','Dana Desa', 2025, 798759000, 788759000),
('Pendapatan','Bunga Bank dan Hibah BMT', 2025, 5345500, 5145500),
('Pembiayaan','Silpa 2024', 2025, 5345500, 5345500)

CREATE TABLE outcome (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  jenis_outcome VARCHAR(100) NOT NULL,
  sumber_dana VARCHAR(100) NOT NULL,
  tahun_anggaran INT NOT NULL,
  bidang VARCHAR(100) NOT NULL,               -- Misalnya: "Pemerintahan", "Pembangunan"
  bulan INT NOT NULL CHECK (bulan BETWEEN 1 AND 12), -- 1 = Januari, dst.
  realisasi NUMERIC(15,2) NOT NULL DEFAULT 0.00
);

INSERT INTO outcome (jenis_outcome, sumber_dana, tahun_anggaran, bidang, bulan, realisasi)
VALUES
('Belanja','Alokasi Dana Desa', 2025, 'BIDANG PEMERINTAHAN', 3, 121888116),
('Belanja','Dana Desa', 2025, 'BIDANG PELAKSANAAN PEMBANGUNAN', 3, 24445850),
('Belanja','Dana Desa', 2025, 'BIDANG PEMBINAAN KEMASYARAKATAN', 3, 6557500),
('Belanja','Dana Desa', 2025, 'BIDANG PENANGGULANGAN BENCANA', 3, 27000000),
('Belanja','Alokasi Dana Desa', 2024, 'BIDANG PEMERINTAHAN', 3, 121888116),
('Belanja','Dana Desa', 2024, 'BIDANG PELAKSANAAN PEMBANGUNAN', 3, 24445850),
('Belanja','Dana Desa', 2024, 'BIDANG PEMBINAAN KEMASYARAKATAN', 3, 6557500),
('Belanja','Dana Desa', 2023, 'BIDANG PENANGGULANGAN BENCANA', 3, 27000000)
('Pengeluaran','Silpa 2024', 2025, 'BIDANG PENANGGULANGAN BENCANA', 3, 27000000)

