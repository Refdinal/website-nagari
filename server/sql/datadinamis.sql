
CREATE TABLE kategoridatadinamis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tipe VARCHAR(255) NOT NULL,
    data TEXT UNIQUE
)


CREATE TABLE datadinamisnik (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nik VARCHAR(255) NOT NULL,
    data TEXT,
    keterangan TEXT,
    FOREIGN KEY (data) REFERENCES kategoridatadinamis(data) ON DELETE CASCADE
);


CREATE TABLE datadinamiskk (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kk VARCHAR(255) NOT NULL,
    data TEXT,
    keterangan TEXT,
    FOREIGN KEY (data) REFERENCES kategoridatadinamis(data) ON DELETE CASCADE
);


