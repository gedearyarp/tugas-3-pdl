const { exec } = require('../connectors/postgresql');

const postgresqlRead1 = async (client) => {
    const query = `
        SELECT AVG(AGE(NOW(), date_of_birth)) AS average_age
        FROM Mahasiswa;       
    `
    const result = await exec(client, query);
    const val = result.rows;
    return val;
}

const postgresqlRead2 = async (client) => {
    const query = `
        SELECT DISTINCT d.name AS dosen_name, m.name AS mahasiswa_name
        FROM Dosen d
        JOIN Mengajar mj ON d.dosen_id = mj.dosen_id
        JOIN Mengambil mb ON mj.matkul_id = mb.matkul_id
        JOIN Mahasiswa m ON mb.mahasiswa_id = m.mahasiswa_id
        JOIN Membimbing mem ON d.dosen_id = mem.dosen_id AND m.mahasiswa_id = mem.mahasiswa_id;    
    `
    const result = await exec(client, query);
    const val = result.rows;
    return val;
}

const postgresqlRead3 = async (client) => {
    const query = `
        SELECT mk.name AS mata_kuliah, MAX(AGE(m.date_of_birth)) - MIN(AGE(m.date_of_birth)) AS age_difference
        FROM Mata_Kuliah mk
        JOIN Mengambil ma ON mk.matkul_id = ma.matkul_id
        JOIN Mahasiswa m ON ma.mahasiswa_id = m.mahasiswa_id
        GROUP BY mk.name
        ORDER BY age_difference DESC
        LIMIT 1;      
    `
    const result = await exec(client, query);
    const val = result.rows;
    return val;
}

const getMahasiswaPostgresql = async (client, nim) => {
    const query = `
        SELECT *
        FROM Mahasiswa
        WHERE nim = '${nim}';
    `
    const result = await exec(client, query);
    const val = result.rows;
    return val;
}

const createMahasiswaPostgresql = async (client, mahasiswa) => {
    const query = `
        INSERT INTO Mahasiswa (nim, name, date_of_birth)
        VALUES ('${mahasiswa.nim}', '${mahasiswa.name}', '${mahasiswa.date_of_birth}');
    `
    const result = await exec(client, query);
    const val = result.rows;
    return val;
}

const updateMahasiswaPostgresql = async (client, mahasiswa) => {
    const query = `
        UPDATE Mahasiswa
        SET name = '${mahasiswa.name}', date_of_birth = '${mahasiswa.date_of_birth}'
        WHERE nim = '${mahasiswa.nim}';
    `
    const result = await exec(client, query);
    const val = result.rows;
    return val;
}

const deleteMahasiswaPostgresql = async (client, mahasiswaNim) => {
    const query = `
        UPDATE Mahasiswa
        SET nim = -1
        WHERE nim = '${mahasiswaNim}';
    `
    const result = await exec(client, query);
    const val = result.rows;
    return val;
}

module.exports = { 
    postgresqlRead1, 
    postgresqlRead2, 
    postgresqlRead3,
    getMahasiswaPostgresql,
    createMahasiswaPostgresql,
    updateMahasiswaPostgresql,
    deleteMahasiswaPostgresql
};