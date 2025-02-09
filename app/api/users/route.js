import { validateUserInput } from '@/app/middlewares/auth';
import {db} from '../../lib/db.config';

export async function GET(req) {
  try {
    const query = "SELECT * FROM users;";
    const users = await db.query(query);
    return new Response(JSON.stringify(users.rows), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Error fetching users", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { email, password, bio, name } = req.body;
    const isValidUser = validateUserInput(req);

    // if(isValidUser.status === '400') {
    //   return new Response(isValidUser.body, { status: 400 });
    // }

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
    db.query(query, [name, email, password, bio || `Hey there! I'm ${name}`]);

    return new Response('User created successfully', { status: 200 });
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
      res.status(204).send('User deleted successfully');
  } catch (error) {
      console.log(error);
      return new Response("Something went wrong. Couldn't delete user", { status: 500 });
  }
}
