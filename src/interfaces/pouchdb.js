const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

const { getPouchClient } = require('../connectors/pouchdb');

const pouchdbRead1 = async () => {
    try {
        const mahasiswaClient = getPouchClient('mahasiswa');
        const mahasiswaDb = await mahasiswaClient.allDocs({
            include_docs: true
        });

        const ages = mahasiswaDb.rows.map(row => {
            const birthdate = new Date(row.doc.date_of_birth);
            const ageDifMs = Date.now() - birthdate.getTime();
            const ageDate = new Date(ageDifMs);

            return Math.abs(ageDate.getUTCFullYear() - 1970);
        })

        const avgAge = ages.reduce((a, b) => a + b, 0) / ages.length;
        return avgAge;
    } catch (err) {
        console.error('err', err);
        return 0;
    }
}

const pouchdbRead2 = async () => {
    try {
        const dosenClient = getPouchClient('dosen');
        const mahasiswaClient = getPouchClient('mahasiswa');
        const membimbingClient = getPouchClient('membimbing');
        const mengajarClient = getPouchClient('mengajar');
        const mengambilClient = getPouchClient('mengambil');
    
        const dosenDb = await dosenClient.allDocs({ include_docs: true });
        const mahasiswaDb = await mahasiswaClient.allDocs({ include_docs: true });
        const membimbingDb = await membimbingClient.allDocs({ include_docs: true });
        const mengajarDb = await mengajarClient.allDocs({ include_docs: true });
        const mengambilDb = await mengambilClient.allDocs({ include_docs: true });

        const dosenMap = dosenDb.rows.reduce((acc, row) => {
            acc[row.doc.dosen_id] = row.doc;
            return acc;
        }, {});

        const mahasiswaMap = mahasiswaDb.rows.reduce((acc, row) => {
            acc[row.doc.mahasiswa_id] = row.doc;
            return acc;
        }, {});
    
        const results = membimbingDb.rows.map(row => {
            const rel = row.doc;
            const dosen = dosenMap[rel.dosen_id];
            const mahasiswa = mahasiswaMap[rel.mahasiswa_id];

            const matkul_dosen = mengajarDb.rows.reduce((acc, row) => {
                if (row.doc.dosen_id === dosen.dosen_id) {
                    acc[row.doc.matkul_id] = true;
                }
                return acc;
            }, {});

            const res = mengambilDb.rows.map(row => {
                const cur = row.doc;
                if (matkul_dosen[cur.matkul_id] && cur.mahasiswa_id === rel.mahasiswa_id) {
                    return { dosenName: dosen.name, mahasiswaName: mahasiswa.name };
                }
            }).filter(Boolean);

            if (res.length > 0) return res[0];
        }).filter(Boolean); // Filter out any undefined entries

        return results;
    } catch (err) {
        console.error('err', err);
        return [];
    }
}

const pouchdbRead3 = async () => {
    const mahasiswaClient = getPouchClient('mahasiswa');
    const mengambilClient = getPouchClient('mengambil');
    const mataKuliahClient = getPouchClient('matakuliah');

    const allMahasiswa = await mahasiswaClient.allDocs({ include_docs: true });
    const mahasiswaAgeMap = allMahasiswa.rows.reduce((acc, row) => {
        const birthdate = new Date(row.doc.date_of_birth);
        const ageDifMs = Date.now() - birthdate.getTime();
        const ageDate = new Date(ageDifMs);
        acc[row.doc.mahasiswa_id] = ageDate;
        return acc;
    }, {});

    const allMataKuliah = await mataKuliahClient.allDocs({ include_docs: true });
    const mataKuliahMap = allMataKuliah.rows.reduce((acc, row) => {
        acc[row.doc.matkul_id] = row.doc.name;
        return acc;
    });

    const allMengambil = await mengambilClient.allDocs({ include_docs: true });

    const maxMinAgeMatkul = {};
    allMengambil.rows.forEach(element => {
        if (!maxMinAgeMatkul[element.doc.matkul_id]) {
            maxMinAgeMatkul[element.doc.matkul_id] = {
                max: 0,
                min: 1e18
            }
        }

        const curAge = mahasiswaAgeMap[element.doc.mahasiswa_id];
        if (curAge > maxMinAgeMatkul[element.doc.matkul_id].max) {
            maxMinAgeMatkul[element.doc.matkul_id].max = curAge;
        }

        if (curAge < maxMinAgeMatkul[element.doc.matkul_id].min) {
            maxMinAgeMatkul[element.doc.matkul_id].min = curAge;
        }
    });

    let res = {
        mata_kuliah: '',
        age_difference: 0
    };

    for (const key in maxMinAgeMatkul) {
        const cur = maxMinAgeMatkul[key];
        const curDiff = new Date(cur.max - cur.min);
        if (curDiff > res.age_difference) {
            res = {
                mata_kuliah: mataKuliahMap[key],
                age_difference: curDiff.getTime()
            }
        }
    }

    return res;
}


module.exports = { pouchdbRead1, pouchdbRead2, pouchdbRead3 };