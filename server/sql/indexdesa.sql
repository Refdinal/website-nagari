CREATE TABLE indexdesa (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nomor INT,
	tahun VARCHAR(255),
	dimensi VARCHAR(255),
	sub_dimensi VARCHAR(255),
	indikator VARCHAR(255),
	aspek_penilaian VARCHAR(255),
	max_skor INT,
	skor INT
)