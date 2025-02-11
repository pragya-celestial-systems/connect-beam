import { db } from "./db.config";

export function createUsersTable() {
    db.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, email VARCHAR, password VARCHAR, bio VARCHAR, name VARCHAR)');
}

export function createPostsTable() {
    db.query('CREATE TABLE IF NOT EXISTS posts (id SERIAL PRIMARY KEY, caption VARCHAR, image_url VARCHAR, user_id INTEGER)');
}