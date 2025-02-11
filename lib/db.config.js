/* eslint-disable no-undef */
import pg from 'pg';
import { createUsersTable, createPostsTable } from './init.tables';

let db;
export async function connectToPostgres() {
    try {
        db = new pg.Pool({
            connectionString: process.env.DB_CONNECTION_STRING
        });

        await createUsersTable();
        await createPostsTable();

        console.log('connected to the database.');
    } catch (error) {
        console.log('Error connecting to the database', error);
        throw error;
    }
};

connectToPostgres();
export { db };
