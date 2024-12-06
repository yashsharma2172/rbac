import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = req.cookies.get('auth_token')?.value;
  const rootRoute = ['/']

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  if(rootRoute.includes(req.nextUrl.pathname)){
    return NextResponse.redirect(new URL('/login',req.url));
  }
  try {
    // Use jose to verify the token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    // Check for admin role in the payload
    if (req.nextUrl.pathname.startsWith('/admin') && payload.role !== 'Admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};