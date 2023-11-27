-- read 1: Rata-Rata Usia Mahasiswa
SELECT AVG(AGE(NOW(), date_of_birth)) AS average_age
FROM Mahasiswa;

-- read 2: Dosen yang Mengajar dan Membimbing Mahasiswa yang Sama
SELECT DISTINCT d.name AS dosen_name, m.name AS mahasiswa_name
FROM Dosen d
JOIN Mengajar mj ON d.dosen_id = mj.dosen_id
JOIN Mengambil mb ON mj.matkul_id = mb.matkul_id
JOIN Mahasiswa m ON mb.mahasiswa_id = m.mahasiswa_id
JOIN Membimbing mem ON d.dosen_id = mem.dosen_id AND m.mahasiswa_id = mem.mahasiswa_id;

-- read 3: Mata Kuliah dengan Selisih Usia Mahasiswa Tertua dan Termuda Paling Besar
SELECT mk.name AS mata_kuliah, MAX(AGE(m.date_of_birth)) - MIN(AGE(m.date_of_birth)) AS age_difference
FROM Mata_Kuliah mk
JOIN Mengambil ma ON mk.matkul_id = ma.matkul_id
JOIN Mahasiswa m ON ma.mahasiswa_id = m.mahasiswa_id
GROUP BY mk.name
ORDER BY age_difference DESC
LIMIT 1;

-- insert: Tambah Mahasiswa
INSERT INTO Mahasiswa (nim, name, email_address, date_of_birth)
VALUES ('123456', 'Nama Mahasiswa', 'mahasiswa@example.com', '1995-04-23');

-- update: Ubah Nama Mahasiswa
UPDATE Mahasiswa
SET name = 'Nama Baru Mahasiswa', email_address = 'mahasiswa_baru@example.com', date_of_birth = '1995-05-01'
WHERE mahasiswa_id = 1;

-- delete: Hapus Mahasiswa
DELETE FROM Mahasiswa
WHERE mahasiswa_id = 1;
