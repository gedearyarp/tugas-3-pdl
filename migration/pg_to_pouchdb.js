require('dotenv').config();
const { Pool } = require('pg');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

const postgresPool = new Pool({
  user: process.env.POSTGRES_DB_USER,
  host: process.env.POSTGRES_DB_HOST,
  database: process.env.POSTGRES_DB_NAME,
  password: process.env.POSTGRES_DB_PASSWORD,
  port: process.env.POSTGRES_DB_PORT,
});

const pouchDbHost = process.env.POUCHDB_SERVER_HOST || 'localhost';

const dbDosen = new PouchDB(pouchDbHost + 'dosen');
const dbMahasiswa = new PouchDB(pouchDbHost + 'mahasiswa');
const dbMataKuliah = new PouchDB(pouchDbHost + 'matakuliah');
const dbMembimbing = new PouchDB(pouchDbHost + 'membimbing');
const dbMengajar = new PouchDB(pouchDbHost + 'mengajar');
const dbMengambil = new PouchDB(pouchDbHost + 'mengambil');

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

