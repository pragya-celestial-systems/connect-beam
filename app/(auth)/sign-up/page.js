'use client'
import { useEffect, useState } from "react";
import { useActionState } from "react";
import { handleSignUp } from "../../../actions/auth-actions";
import { redirect } from "next/navigation";


export default function SignUp() {
  const [formData, formAction, isPending] = useActionState(handleSignUp, {});

  useEffect(() => {
    if (formData?.success) {
      redirect('/sign-in');
    }
  }, [formData]);

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
