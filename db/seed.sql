-- Mengisi data random untuk tabel Mahasiswa
INSERT INTO Mahasiswa (nim, name, email_address, date_of_birth)
SELECT
  LPAD(CAST((RANDOM() * 999999)::INT AS VARCHAR), 6, '0') AS nim, -- NIM 6 digit
  'Nama ' || MD5(RANDOM()::text), -- Nama acak
  MD5(RANDOM()::text) || '@example.com', -- Email acak
  TIMESTAMP '2000-01-01' + (RANDOM() * (TIMESTAMP '2003-12-31' - TIMESTAMP '2000-01-01')) -- Tanggal lahir acak antara tahun 2000 dan 2003
FROM generate_series(1, 1000);

-- Mengisi data random untuk tabel Dosen
INSERT INTO Dosen (nip, name, email_address, date_of_birth)
SELECT
  LPAD(CAST((RANDOM() * 999999)::INT AS VARCHAR), 6, '0') AS nip, -- NIP 6 digit
  'Dosen ' || MD5(RANDOM()::text), -- Nama acak
  MD5(RANDOM()::text) || '@university.com', -- Email acak
  TIMESTAMP '1970-01-01' + (RANDOM() * (TIMESTAMP '1985-12-31' - TIMESTAMP '1970-01-01')) -- Tanggal lahir acak antara tahun 1970 dan 1985
FROM generate_series(1, 200);

-- Mengisi data random untuk tabel Mata Kuliah
INSERT INTO Mata_Kuliah (kode, name, sks)
SELECT
  LPAD(CAST((RANDOM() * 999)::INT AS VARCHAR), 3, '0') AS kode, -- Kode MK 3 digit
  'MK ' || MD5(RANDOM()::text), -- Nama MK acak
  CAST((RANDOM() * 4 + 1) AS INT) -- SKS acak antara 1 dan 4
FROM generate_series(1, 400);

-- Anda bisa mengisi tabel hubungan Membimbing, Mengajar, dan Mengambil dengan mengacu pada ID yang ada di tabel Mahasiswa, Dosen, dan Mata Kuliah.
-- Contoh, untuk tabel Membimbing:
INSERT INTO Membimbing (dosen_id, mahasiswa_id)
SELECT d.dosen_id, m.mahasiswa_id
FROM Dosen d
CROSS JOIN Mahasiswa m
WHERE d.dosen_id <= 200 AND m.mahasiswa_id <= 1000
ORDER BY RANDOM()
LIMIT 1000; -- Contoh ini akan mengambil 1000 relasi unik secara acak antara dosen dan mahasiswa

-- Mengisi data random untuk tabel Mengajar
-- Setiap dosen akan mengajar beberapa mata kuliah
INSERT INTO Mengajar (dosen_id, matkul_id)
SELECT d.dosen_id, mk.matkul_id
FROM Dosen d
CROSS JOIN Mata_Kuliah mk
ORDER BY RANDOM()
LIMIT (SELECT 2 * COUNT(*) FROM Mata_Kuliah); -- Asumsi setiap dosen mengajar 2 mata kuliah, sesuaikan dengan kebutuhan.

-- Mengisi data random untuk tabel Mengambil
-- Setiap mahasiswa akan mengambil beberapa mata kuliah
INSERT INTO Mengambil (mahasiswa_id, matkul_id)
SELECT m.mahasiswa_id, mk.matkul_id
FROM Mahasiswa m
CROSS JOIN Mata_Kuliah mk
ORDER BY RANDOM()
LIMIT (SELECT 5 * COUNT(*) FROM Mahasiswa); -- Asumsi setiap mahasiswa mengambil 5 mata kuliah, sesuaikan dengan kebutuhan.

