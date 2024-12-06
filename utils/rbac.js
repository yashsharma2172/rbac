import { prisma } from '@/lib/prisma';

export async function hasPermission(userId, permissionName) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { role: { include: { permissions: true } } },
  });

  return user?.role.permissions.some((perm) => perm.name === permissionName);
}