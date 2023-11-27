-- Membuat tabel Dosen
CREATE TABLE Dosen (
    dosen_id SERIAL PRIMARY KEY,
    nip VARCHAR(20),
    name VARCHAR(255),
    email_address VARCHAR(255),
    date_of_birth DATE
);

-- Membuat tabel Mahasiswa
CREATE TABLE Mahasiswa (
    mahasiswa_id SERIAL PRIMARY KEY,
    nim VARCHAR(20),
    name VARCHAR(255),
    email_address VARCHAR(255),
    date_of_birth DATE
);

-- Membuat tabel Mata Kuliah
CREATE TABLE Mata_Kuliah (
    matkul_id SERIAL PRIMARY KEY,
    kode VARCHAR(10),
    name VARCHAR(255),
    sks INTEGER
);

-- Tabel hubungan antara Dosen dan Mahasiswa (Pembimbing)
CREATE TABLE Membimbing (
    dosen_id INT,
    mahasiswa_id INT,
    FOREIGN KEY (dosen_id) REFERENCES Dosen (dosen_id),
    FOREIGN KEY (mahasiswa_id) REFERENCES Mahasiswa (mahasiswa_id),
    PRIMARY KEY (dosen_id, mahasiswa_id)
);

-- Tabel hubungan antara Dosen dan Mata Kuliah (Mengajar)
CREATE TABLE Mengajar (
    dosen_id INT,
    matkul_id INT,
    FOREIGN KEY (dosen_id) REFERENCES Dosen (dosen_id),
    FOREIGN KEY (matkul_id) REFERENCES Mata_Kuliah (matkul_id),
    PRIMARY KEY (dosen_id, matkul_id)
);

-- Tabel hubungan antara Mahasiswa dan Mata Kuliah (Mengambil)
CREATE TABLE Mengambil (
    mahasiswa_id INT,
    matkul_id INT,
    FOREIGN KEY (mahasiswa_id) REFERENCES Mahasiswa (mahasiswa_id),
    FOREIGN KEY (matkul_id) REFERENCES Mata_Kuliah (matkul_id),
    PRIMARY KEY (mahasiswa_id, matkul_id)
);
