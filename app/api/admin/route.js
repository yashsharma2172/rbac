import { prisma } from '@/lib/prisma';

export async function GET(req) {
  const userId = req.headers.get('x-user-id');
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { role: { include: { permissions: true } } },
  });

  if (!user.role.permissions.some((perm) => perm.name === 'manage_users')) {
    return new Response('Forbidden', { status: 403 });
  }

  return new Response(JSON.stringify({ data: 'Admin Data' }), { status: 200 });
}