import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import DashboardClient from './dashboard-client';

async function getSession() {
  const token = cookies().get('auth_token')?.value;

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  return <DashboardClient role={session.role} />;
}