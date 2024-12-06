import { cookies } from 'next/headers';

export async function POST(req) {
  cookies().set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0),
    path: '/',
  });

  return new Response('Logged out successfully', { status: 200 });
}