const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Define roles
  const roles = [
    { id: 'admin', name: 'Admin' },
    { id: 'user', name: 'User' },
    { id: 'moderator', name: 'Moderator' },
  ];

  // Define permissions
  const permissions = [
    { id: 'view_dashboard', name: 'View Dashboard' },
    { id: 'manage_users', name: 'Manage Users' },
    { id: 'edit_content', name: 'Edit Content' },
  ];

  // Seed roles
  for (const role of roles) {
    await prisma.role.upsert({
      where: { id: role.id },
      update: {},
      create: role,
    });
  }

  // Seed permissions
  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { id: permission.id },
      update: {},
      create: permission,
    });
  }

  // Assign permissions to roles
  await prisma.role.update({
    where: { id: 'admin' },
    data: { permissions: { connect: [{ id: 'view_dashboard' }, { id: 'manage_users' }] } },
  });

  await prisma.role.update({
    where: { id: 'moderator' },
    data: { permissions: { connect: [{ id: 'view_dashboard' }, { id: 'edit_content' }] } },
  });

  await prisma.role.update({
    where: { id: 'user' },
    data: { permissions: { connect: [{ id: 'view_dashboard' }] } },
  });

  console.log('Roles and permissions seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });