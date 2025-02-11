'use client';
import { AuthForm } from "../../../components/AuthForm";
import { handleSignIn } from "../../../actions/auth-actions";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function SignIn(){
     const [formData, formAction] = useActionState(handleSignIn, {});

     useEffect(() => {
        if(formData?.success){
            document.cookie = formData.token
            redirect('/');
        }
     }, [formData])
    return (
        <>
            <h1>Sign up user</h1>
            <AuthForm data={formData} action={formAction} isSignInPage={true}/>
            <p>Don&apos;t have an account? <Link href={'/sign-up'}>Sign Up</Link></p>
        </>
    )
}