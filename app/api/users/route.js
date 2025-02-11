import { cookies } from 'next/headers';
import {db} from '../../../lib/db.config';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  try {
    const searchParams = req.url.split('?')[1].split('=');
    const email = searchParams[1].split('&')[0];
    const password = searchParams[2];

    const query = "SELECT * FROM users WHERE email = $1 AND password = $2";
    const user = await db.query(query, [email, password]);

    if(user.rows.length <= 0) {
      return new Response('User not found. Please check the entered credentials and try again.', {status: 404});
    }

    // create token and set the cookie
    const token = jwt.sign({}, process.env.SECRET_KEY, { expiresIn: '1d' });
    (await cookies()).set('auth-token', token);

    return new Response({data: JSON.stringify(user.rows)}, { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error fetching users", { status: 500 });
  }
}

export async function POST(req, res) {
  try {
    const data = await req.json();
    const { email, password, bio, name } = data;

    // check if user with the email already exists
    let query = "SELECT * FROM users WHERE email = $1;";
    const user = await db.query(
        query,
        [email]
    );

    if (user.rows.length > 0) {;
      return new Response("User already exists", { status: 409 });
    }

    // if user doesn't exists
    query = "INSERT INTO users (name, email, password, bio) VALUES ($1, $2, $3, $4)";
    await db.query(query, [name, email, password, bio || `Hey there! I'm ${name}`]);

    return new Response({message: 'User created successfully'}, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Error fetching user details", { status: 500 });
  }   
}

export async function UPDATE(req, res) {
  try {
      const {userId} = req.params;
      const {name, bio, password} = req.body;

      // if userId is undefined
      if(!userId){
        return new Response('User id is required', {status: 400});
      }

      const query = `
          UPDATE users
          SET name = COALESCE($1, name),
              bio = COALESCE($2, bio),
              password = COALESCE($3, password)
          WHERE id = ${userId};
          `
      await db.query(query, [name, bio, password]);
      return new Response('data updated successfully', {status: 200});
  } catch (error) {
      console.log(error);
      return new Response("Error updating data", { status: 500 });
  }
}

export async function DELETE(req, res) {
  try {
      const {userId} = req.params;

      if(!userId){
          return res.status(400).send("user id is required");
      }

      const query = `DELETE FROM users WHERE id = ${userId}`;
      await db.query(query);
      return new Response('User deleted successfully', {status: 204});
  } catch (error) {
      console.log(error);
      return new Response("Something went wrong. Couldn't delete user", { status: 500 });
  }
}
