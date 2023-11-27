const PouchDB = require('pouchdb');

const pouchDbHost = process.env.POUCHDB_SERVER_HOST || 'localhost';

const getPouchClient = (dbName) => {
    const db = new PouchDB(pouchDbHost + dbName);
    return db;
}

module.exports = { getPouchClient };
