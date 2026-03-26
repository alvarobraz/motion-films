import { LeadStatus } from '@prisma/client';
import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

const necessityOptions = [
  'Vídeo Institucional',
  'Comercial / Publicidade',
  'Conteúdo para Redes Sociais',
  'Cobertura de Evento',
  'Documentário / Storytelling',
];

const statusOptions: LeadStatus[] = ['PENDING', 'CONTACTED', 'ARCHIVED'];

async function main() {
  const adminEmail = 'admin@motionfilms.com.br';
  const adminPassword = '1234567';

  await prisma.user.deleteMany({
    where: { email: adminEmail },
  });
  await prisma.lead.deleteMany();
  await prisma.customer.deleteMany();

  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: 'Alvaro - Admin',
      email: adminEmail,
      password: hashedPassword,
    },
  });

  for (let i = 1; i <= 50; i++) {
    const name = `Cliente ${i}`;
    const email = `contato${i}@empresa${i}.com.br`;

    await prisma.lead.create({
      data: {
        requirement:
          necessityOptions[Math.floor(Math.random() * necessityOptions.length)],
        message: `Olá, este é o lead número ${i}. Gostaria de entender os custos para uma produção em Curitiba.`,
        status: statusOptions[Math.floor(Math.random() * statusOptions.length)],
        createdAt: new Date(
          Date.now() - Math.floor(Math.random() * 1000000000)
        ),
        customer: {
          create: {
            name: name,
            email: email,
            phone: `4199${Math.floor(1000000 + Math.random() * 9000000)}`,
          },
        },
      },
    });
  }
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
