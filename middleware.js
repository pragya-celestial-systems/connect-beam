import { NextResponse } from 'next/server';
import { validateUserInput } from './middlewares/auth';

export function middleware(request) {
    console.log('middleware ran');
    if (request.nextUrl.pathname === '/api/users' && request.method === 'POST') {
        return validateUserInput(request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/users',
};
