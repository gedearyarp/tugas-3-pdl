const { getPgClient } = require('../connectors/postgresql');
const { postgresqlRead1, postgresqlRead2, postgresqlRead3 } = require('../interfaces/postgresql');
const { pouchdbRead1, pouchdbRead2, pouchdbRead3 } = require('../interfaces/pouchdb');

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

module.exports = { read1, read2, read3 };