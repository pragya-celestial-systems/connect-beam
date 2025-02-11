import jwt from 'jsonwebtoken';
import { getSession } from '@auth0/nextjs-auth0';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProfileServer() {
  const session = await getSession();
  const user = session?.user;
  const cookieStore = await cookies();
  const token = await cookieStore.get('auth-token');

  // Check if token exists, and verify it if does
  if (token) {
    try {
      jwt.verify(token.value, process.env.SECRET_KEY);
    } catch (error) {
      console.log(error);
      redirect('/sign-in');
    }
  } else if (!user) {
    redirect('/sign-in');
  }

  return (
    user ? (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    ) : null
  );
}
