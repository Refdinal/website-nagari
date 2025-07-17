CREATE TABLE organisasi (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organisasi VARCHAR(255) NOT NULL,
    jabatan VARCHAR(255) NOT NULL,
    nama VARCHAR(255) NOT NULL,
    foto VARCHAR(255) -- Menyimpan path atau URL gambar
);

INSERT INTO organisasi (organisasi, jabatan, nama, foto) VALUES
('walinagari', 'Walinagari', 'ZULKHIYAR, SH Dt PADO DIACEH', '/uploads/defaultprofile.png'),
('perangkat', 'Sekretaris Nagari', 'RAFKY RAHMAT, SE', '/uploads/defaultprofile.png'),
('perangkat', 'Kasi Pemerintahan', 'M. ANWAR KHAIRI SE', '/uploads/defaultprofile.png'),
('perangkat', 'Kasi Pelayanan', 'LIN SUMARNI, S.Pd', '/uploads/defaultprofile.png'),
('perangkat', 'Kasi Kesejahteraan', 'OSTAFIA', '/uploads/defaultprofile.png'),
('perangkat', 'Kaur TU & Umum', 'ZANDIA SALSABILA, S.Pd', '/uploads/defaultprofile.png'),
('perangkat', 'Kaur Keuangan', 'RAHMADHANI, S.Hum', '/uploads/defaultprofile.png'),
('perangkat', 'Kaur Perencanaan', 'RIZKA FAUZIAH HANUM, S.Tr.T', '/uploads/defaultprofile.png'),
('perangkat', 'Staf Nagari', 'LAILATUL FITRI', '/uploads/defaultprofile.png'),
('perangkat', 'Jorong Bansa', 'DESWANDI LABAI MUDO', '/uploads/defaultprofile.png'),
('perangkat', 'Jorong Pakan Sinayan', 'FAUZAN, ST ST. PANGULLU', '/uploads/defaultprofile.png'),
('bamus', 'Ketua Bamus', 'SUHELMI HADI', '/uploads/defaultprofile.png'),
('bamus', 'Sekretaris Bamus', 'TITI SURYANI', '/uploads/defaultprofile.png'),
('bamus', 'Anggota Bamus', 'DRS.H. CHAIRUL HUDA', '/uploads/defaultprofile.png'),
('bamus', 'Anggota Bamus', 'ERIZAL ST. BARENO', '/uploads/defaultprofile.png'),
('bamus', 'Staf Bamus', 'Ns. Oktia Rahmi, S.Kep', '/uploads/defaultprofile.png')
