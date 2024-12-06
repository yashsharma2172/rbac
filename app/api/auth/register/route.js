import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  const { email, password, roleId } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return new Response('Email already exists', { status: 409 });
  }

  const role = await prisma.role.findUnique({ where: { id: roleId } });
  if (!role) {
    return new Response('Invalid role', { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: { email, password: hashedPassword, roleId },
  });

  return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
}