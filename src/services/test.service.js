const { getPgClient } = require('../connectors/postgresql');
const { 
    postgresqlRead1, 
    postgresqlRead2, 
    postgresqlRead3,
    getMahasiswaPostgresql,
    createMahasiswaPostgresql,
    updateMahasiswaPostgresql,
    deleteMahasiswaPostgresql
} = require('../interfaces/postgresql');
const { 
    pouchdbRead1, 
    pouchdbRead2, 
    pouchdbRead3, 
    getMahasiswaPouchdb, 
    insertMahasiswaPouchdb, 
    updateMahasiswaPouchdb, 
    deleteMahasiswaPouchdb 
} = require('../interfaces/pouchdb');

const timerFunction = async (func) => {
    const start = new Date();
    const val = await func();
    const end = new Date();

    const time = end - start;
    return { val, time };
}

const read1 = async () => {
    const pgClient = await getPgClient();

    const pgResult = await timerFunction(() => postgresqlRead1(pgClient));
    const pouchResult = await timerFunction(() => pouchdbRead1());

    return {
        run_time: {
            postgresql: pgResult.time,
            pouchdb: pouchResult.time
        },
        value: {
            postgresql: pgResult.val,
            pouchdb: pouchResult.val
        }       
    };
}

const read2 = async () => {
    const pgClient = await getPgClient();

    const pgResult = await timerFunction(() => postgresqlRead2(pgClient));
    const pouchResult = await timerFunction(() => pouchdbRead2());

    return {
        run_time: {
            postgresql: pgResult.time,
            pouchdb: pouchResult.time
        },
        value: {
            postgresql: pgResult.val,
            pouchdb: pouchResult.val
        }       
    };
}

const read3 = async () => {
    const pgClient = await getPgClient();

    const pgResult = await timerFunction(() => postgresqlRead3(pgClient));
    const pouchResult = await timerFunction(() => pouchdbRead3());

    return {
        run_time: {
            postgresql: pgResult.time,
            pouchdb: pouchResult.time
        },
        value: {
            postgresql: pgResult.val,
            pouchdb: pouchResult.val
        }       
    };
}

const insertMahasiswa = async (body) => {
    const pgClient = await getPgClient();

    const pgResult = await timerFunction(() => createMahasiswaPostgresql(pgClient, body));
    const pouchResult = await timerFunction(() => insertMahasiswaPouchdb(body));

    return {
        run_time: {
            postgresql: pgResult.time,
            pouchdb: pouchResult.time
        }    
    };
}

const updateMahasiswa = async (body) => {
    const pgClient = await getPgClient();

    const pgResult = await timerFunction(() => updateMahasiswaPostgresql(pgClient, body));
    const pouchResult = await timerFunction(() => updateMahasiswaPouchdb(body));

    return {
        run_time: {
            postgresql: pgResult.time,
            pouchdb: pouchResult.time
        }    
    };
}

const deleteMahasiswa = async (body) => {
    const pgClient = await getPgClient();

    const pgResult = await timerFunction(() => deleteMahasiswaPostgresql(pgClient, body.nim));
    const pouchResult = await timerFunction(() => deleteMahasiswaPouchdb(body.nim));

    return {
        run_time: {
            postgresql: pgResult.time,
            pouchdb: pouchResult.time
        }    
    };
}

module.exports = { read1, read2, read3, insertMahasiswa, updateMahasiswa, deleteMahasiswa };