CREATE TABLE datanagari (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sambutan VARCHAR,
    yt_embed VARCHAR(255),
    email VARCHAR(255),
    telepon VARCHAR(255),
    facebook VARCHAR(255),
    instagram VARCHAR(255),
    youtube VARCHAR(255),
    
)

INSERT INTO datanagari (sambutan,yt_embed,email,telepon,facebook,instagram,youtube) 
VALUES 

('Assalamualaikum Wr. Wb.',
'https://www.youtube.com/embed/cI6Dk3MhKJ8?si=o_lISk_74gBnKMo6',
'mail@kamangtangahanamsuku.com',
'+081263648148',
'https://web.facebook.com/groups/511084999265274',
'https://www.instagram.com/kamangtangahanamsuku/',
'https://www.youtube.com/@KAMANGTANGAHANAMSUKU'
)