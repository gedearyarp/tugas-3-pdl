# Tugas 3 Pemodelan Data Lanjut | PouchDB

## Ownership
Developed by: I Gede Arya Raditya Parameswara - 13520036

## Overall Design
![image](https://github.com/gedearyarp/tugas-3-pdl/assets/71829426/493a1713-bdb5-4c7e-ac18-b01f00e2547a)


## Development
#### Prerequisite

- VSCode
- Node v16.18.0 / NPM 8.19.2
- PostgreSQL

#### Installation
- `npm install`

#### Secrets
- Check postgresql's credentials in laporan `IF4040_Tugas3_13520036`
- Set `POUCHDB_SERVER_HOST=http://localhost:5984/` on env for local development

### Start development environment / Local setup
1. Create `.env` file or run `cp .env.example .env`
2. Fill the env with secrets

#### Running app server directly on your local machine's environment
- Make sure the db postgresql services is running
- Run `npm run pouchdb-server` to run PouchDB server
- Run `npm run migrate-db` to migrate the exact data from postgresql to pouchdb
- Run `npm run start`
- Enjoy!

If you successfully run the app server on your local machine, you can access this [link](http://localhost:5984/_utils/), and it will look like this.
<img width="1468" alt="image" src="https://github.com/gedearyarp/tugas-3-pdl/assets/71829426/b237ee33-2ce8-45b7-ac2e-e06f4dbb8c00">



