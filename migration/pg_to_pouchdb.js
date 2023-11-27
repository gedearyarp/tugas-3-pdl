require('dotenv').config();
const { Pool } = require('pg');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

const postgresPool = new Pool({
  // Konfigurasi koneksi database PostgreSQL Anda
  user: process.env.POSTGRES_DB_USER,
  host: process.env.POSTGRES_DB_HOST,
  database: process.env.POSTGRES_DB_NAME,
  password: process.env.POSTGRES_DB_PASSWORD,
  port: process.env.POSTGRES_DB_PORT,
});

const dbDosen = new PouchDB('http://localhost:5984/dosen');
const dbMahasiswa = new PouchDB('http://localhost:5984/mahasiswa');
const dbMataKuliah = new PouchDB('http://localhost:5984/matakuliah');
const dbMembimbing = new PouchDB('http://localhost:5984/membimbing');
const dbMengajar = new PouchDB('http://localhost:5984/mengajar');
const dbMengambil = new PouchDB('http://localhost:5984/mengambil');

const migrateData = async () => {
  try {
    await migrateTable('SELECT * FROM Dosen', dbDosen);
    await migrateTable('SELECT * FROM Mahasiswa', dbMahasiswa);
    await migrateTable('SELECT * FROM Mata_Kuliah', dbMataKuliah);
    await migrateTable('SELECT * FROM Membimbing', dbMembimbing);
    await migrateTable('SELECT * FROM Mengajar', dbMengajar);
    await migrateTable('SELECT * FROM Mengambil', dbMengambil);

    console.log('Migrasi data selesai.');
  } catch (error) {
    console.error('Terjadi kesalahan saat migrasi:', error);
  }
};

const migrateTable = async (query, pouchDb) => {
  const client = await postgresPool.connect();
  try {
    const res = await client.query(query);
    for (let row of res.rows) {
      console.log('Migrasi data', row);
      await pouchDb.put({ ...row, _id: generateRandomId() });
    }
  } finally {
    client.release();
  }
};

const generateRandomId = () => {
  return Math.random().toString(36).substr(2, 9);
};


(async () => {
  await migrateData();
})();

