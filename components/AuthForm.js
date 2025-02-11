'use client';
export function AuthForm({isSignInPage, data, action}){
    return (
        <>
            {data.error && <p style={{color: 'red'}}>{data.error}</p>}
            <form action={action}>
                <input placeholder="Email" type="text" name="email" />
                <input placeholder="password" name="password" type="password"/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}