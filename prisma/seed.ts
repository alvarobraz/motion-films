import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const adminEmail = 'alvaro@motionfilms.com.br';
  const adminPassword = 'Admin@Motion2026';

  await prisma.user.deleteMany({
    where: { email: adminEmail },
  });

  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  await prisma.user.create({
    data: {
      name: 'Alvaro - Admin',
      email: adminEmail,
      password: hashedPassword,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Erro no seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
