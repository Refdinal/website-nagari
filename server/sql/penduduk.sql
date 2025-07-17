CREATE TABLE penduduk (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nik VARCHAR(16) UNIQUE,   -- Nomor Induk Kependudukan
    kk VARCHAR(16) ,
    nama VARCHAR(100) NOT NULL,
    jenis_kelamin VARCHAR(10),
    tempat_lahir VARCHAR(100),
    tanggal_lahir DATE ,
    nama_ibu VARCHAR(100),
    nama_ayah VARCHAR(100),
    status_perkawinan VARCHAR(100),
    golongan_darah VARCHAR(50),
    agama VARCHAR(20),
    pendidikan VARCHAR(50),
    pekerjaan VARCHAR(100),
    hubungan_keluarga VARCHAR(50), 
    alamat VARCHAR(100),
    dusun VARCHAR(50),
    jorong VARCHAR(50)
   
)
CREATE INDEX idx_penduduk_nik ON penduduk(nik);
CREATE INDEX idx_penduduk_kk ON penduduk(kk);
CREATE INDEX idx_penduduk_nama ON penduduk(nama);

CREATE TABLE kartukeluarga (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kk VARCHAR(16) ,
    foto VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT
)
