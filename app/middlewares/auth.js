import { NextResponse } from "next/server";

export function validateUserInput(req) {
    const { name, email, password } = req.body;

    if (!name || name.length === 0) {
        return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }

    if (!email || email.length === 0) {
        return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const emailRegex = /^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
        return NextResponse.json({ message: 'Email is not valid' }, { status: 400 });
    }

    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    const isValidPassword = passwordRegex.test(password);

    if (!password || !isValidPassword) {
        return NextResponse.json({ message: 'Password must be 8-16 characters long and include at least one special character, one number, and one uppercase letter' }, { status: 400 });
    }

    return NextResponse.next();
}
