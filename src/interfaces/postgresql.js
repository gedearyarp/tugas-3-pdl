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

module.exports = { postgresqlRead1, postgresqlRead2, postgresqlRead3 };