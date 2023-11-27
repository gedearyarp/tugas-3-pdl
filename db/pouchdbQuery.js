require('dotenv').config();

async function calculateAverageAge(db) {
    try {
        const result = await db.query(function (doc, emit) {
            if (doc.type === 'Mahasiswa') {
            emit(doc._id, doc.date_of_birth);
            }
        }, { reduce: '_stats' });
    
        const ages = result.rows.map(row => {
            const birthdate = new Date(row.value.min);
            const ageDifMs = Date.now() - birthdate.getTime();
            const ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        });
    
        const averageAge = ages.reduce((sum, age) => sum + age, 0) / ages.length;
        console.log('Rata-rata usia mahasiswa:', averageAge);
        return averageAge;
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function fetchFirstTenStudents(db) {
    try {
      // Mengambil 10 dokumen pertama yang merupakan mahasiswa
      const result = await db.allDocs({
        include_docs: true,
        startkey: 'Mahasiswa_',
        endkey: 'Mahasiswa_\ufff0',
        limit: 10
      });
  
      // Memfilter dokumen untuk memastikan hanya tipe 'Mahasiswa' yang diambil
      const students = result.rows
        .map(row => row.doc)
        .filter(doc => doc.type === 'Mahasiswa');
  
      console.log(students);
      return students;
    } catch (err) {
      console.error(err);
    }
  }

  
const PouchDB = require('pouchdb');
const db = new PouchDB(process.env.POUCHDB_SERVER_DB_NAME);

// use await to make sure the database is created before inserting data
(async () => {
    const res = await fetchFirstTenStudents(db);
    console.log(res);
})();