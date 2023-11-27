const PouchDB = require('pouchdb');

const dbName = process.env.POUCHDB_SERVER_DB_NAME || 'default_db';
const db = new PouchDB(dbName);

const exec = async (queryType, query) => {
    try {
        let result;
        switch (queryType) {
        case 'get':
            result = await db.get(query.id);
            break;
        case 'put':
            result = await db.put(query.doc);
            break;
        case 'delete':
            result = await db.remove(query.doc);
            break;
        default:
            throw new Error('Query type not supported');
        }
        return result;
    } catch (err) {
        console.error('Error executing PouchDB query', err.stack);
        throw err;
    }
};

module.exports = { exec };
