'use client'
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { handleSignUp } from "../../../actions/auth-actions";
import { redirect } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";


export default function SignUp() {
  const [formData, formAction, isPending] = useActionState(handleSignUp, {});
  const session =  useUser();
  const user = session?.user;

  useEffect(() => {
    if (formData?.success) {
      redirect('/sign-in');
    }

    if(user) {
      redirect('/');
    }
  }, [formData, user]);

  return (
    <div>
      <form action={formAction}>
        <input placeholder="Name" name="name" />
        <input placeholder="Email" name="email" />
        <input placeholder="Password" name="password" />
        <input placeholder="Bio" name="bio" />
        <button type="submit" disabled={isPending}>Sign In</button>
      </form>
      {formData?.error && <p style={{ color: 'red' }}>{formData.error}</p>}
    </div>
  );
}
