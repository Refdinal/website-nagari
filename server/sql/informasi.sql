CREATE TABLE informasi (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    paragraph1 TEXT ,
    paragraph2 TEXT ,
    paragraph3 TEXT ,
    paragraph4 TEXT ,
    image VARCHAR(255),
    imgcap VARCHAR(255),
    pdf VARCHAR(255),
    category VARCHAR(100),
    author VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL,
    views INTEGER DEFAULT 0,
    time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE informasi
ADD COLUMN paragraph5 TEXT,
ADD COLUMN paragraph6 TEXT,
ADD COLUMN paragraph7 TEXT,
ADD COLUMN paragraph8 TEXT,
ADD COLUMN paragraph9 TEXT,
ADD COLUMN paragraph10 TEXT;

INSERT INTO informasi (title, slug, paragraph1, paragraph2, paragraph3, paragraph4, image,imgcap,pdf, category, author, status) 
VALUES (
    'Manfaat Teknologi dalam Pendidikan', 
    'manfaat-teknologi-dalam-pendidikan', 
    'Teknologi telah mengubah cara belajar di era digital.',
    'Siswa kini dapat mengakses berbagai sumber belajar secara online.',
    'Platform pembelajaran interaktif membantu meningkatkan pemahaman materi.',
    'Namun, penggunaan teknologi harus tetap diawasi agar tidak disalahgunakan.',
    '/uploads/1740015098005.png', 
    'caption img',
    '/uploads/123.pdf',
    'Pengumuman', 
    'Admin2', 
    'published'
),
(
    'Manfaat Teknologi dalam Pendidikan', 
    'manfaat-teknologi-dalam-pendidikan-2', 
    'Teknologi telah mengubah cara belajar di era digital.',
    'Siswa kini dapat mengakses berbagai sumber belajar secara online.',
    'Platform pembelajaran interaktif membantu meningkatkan pemahaman materi.',
    'Namun, penggunaan teknologi harus tetap diawasi agar tidak disalahgunakan.',
    '/uploads/1740015334581.png', 
    null,
    'Berita', 
    'Admin2', 
    'published'
),
(
    'Manfaat Teknologi dalam Pendidikan', 
    'manfaat-teknologi-dalam-pendidikan-3', 
    'Teknologi telah mengubah cara belajar di era digital.',
    'Siswa kini dapat mengakses berbagai sumber belajar secara online.',
    'Platform pembelajaran interaktif membantu meningkatkan pemahaman materi.',
    'Namun, penggunaan teknologi harus tetap diawasi agar tidak disalahgunakan.',
    '/uploads/1740015349860.png', 
    null,
    'Event', 
    'Admin2', 
    'published'
);


CREATE TABLE galerikegiatan (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	id_informasi VARCHAR(255) NOT NULL,
	tipe VARCHAR(255),
	item VARCHAR(255) 
)