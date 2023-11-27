const { getClient } = require('../connectors/postgresql');
const { postgresqlRead1, postgresqlRead2, postgresqlRead3 } = require('../interfaces/postgresql');

const timerFunction = async (func) => {
    const start = new Date();
    const val = await func();
    const end = new Date();

    const time = end - start;
    return { val, time };
}

const read1 = async () => {
    const client = await getClient();
    const pgResult = await timerFunction(() => postgresqlRead1(client));

    return {
        postgresql: pgResult
    };
}

const read2 = async () => {
    const client = await getClient();
    const pgResult = await timerFunction(() => postgresqlRead2(client));

    return {
        postgresql: pgResult
    };
}

const read3 = async () => {
    const client = await getClient();
    const pgResult = await timerFunction(() => postgresqlRead3(client));

    return {
        postgresql: pgResult
    };
}

module.exports = { read1, read2, read3 };