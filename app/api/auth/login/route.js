import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: { include: { permissions: true } } },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return new Response('Invalid credentials', { status: 401 });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role.name },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return new Response(
    JSON.stringify({
      token,
      role: user.role.name,
      permissions: user.role.permissions.map((perm) => perm.name),
    }),
    { status: 200 }
  );
}

