CREATE TABLE "users" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "username" VARCHAR(50)  NOT NULL UNIQUE,
  "email" VARCHAR(50) NOT NULL UNIQUE,
  "password" VARCHAR(100) NOT NULL,
  "pin" VARCHAR(100) NOT NULL,
  "role" VARCHAR(20) NOT NULL 
)

INSERT INTO users (username, email, password, pin, role) VALUES ('AdminKTAS', 'mail@kamangtangahanamsuku.com', '$2b$10$Z3N58WLMdEUt4EdCl.oXV.MfeSnc06mnLKpgCameiFtHBHM80mY0K', '$2b$10$5ganFnuxyO.ES3uxpiDyeeld7flfpTjjwcCIZWHTp.eSKcMtdKd92', 'Admin');