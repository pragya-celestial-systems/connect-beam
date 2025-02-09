/* eslint-disable no-undef */
import pg from 'pg';
import {createUsersTable, createPostsTable} from './init.tables'

let db;
export default async function connectToPostgres(){
    try {
        db = new pg.Pool({
            host: process.env.PG_HOST,
            port: process.env.PG_PORT,
            database:process.env.PG_DATABASE,
            password: process.env.PG_PASSWORD,
            user: process.env.PG_USER,
            ssl: { rejectUnauthorized: true }
        });

        // create tables
        createUsersTable();
        createPostsTable();

        console.log('connected to the database.');
    } catch (error) {
        console.log(error);
    }
};

connectToPostgres();
export  {db} ;