import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from 'jsonwebtoken';

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token');

  if(!token?.value) {
    return redirect('/sign-in')
  }

  try {
    jwt.verify(token.value, process.env.SECRET_KEY);
  } catch (error) {
    console.log(error); 
    redirect('/sign-in')
  }

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
