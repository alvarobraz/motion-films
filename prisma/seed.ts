import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

const necessityOptions = [
  'Vídeo Institucional',
  'Comercial / Publicidade',
  'Conteúdo para Redes Sociais',
  'Cobertura de Evento',
  'Documentário / Storytelling',
];

async function main() {
  const adminEmail = 'admin@motionfilms.com.br';
  const adminPassword = '1234567';

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

  for (let i = 1; i <= 50; i++) {
    const name = `Cliente Teste ${i}`;
    const email = `contato${i}@exemplo.com.br`;

    await prisma.lead.create({
      data: {
        requirement:
          necessityOptions[Math.floor(Math.random() * necessityOptions.length)],
        message: `Olá, gostaria de um orçamento para um projeto de ${i} minutos. Este é um lead de teste gerado automaticamente para validar o layout do dashboard da Motin Films.`,
        createdAt: new Date(
          Date.now() - Math.floor(Math.random() * 1000000000)
        ),
        customer: {
          connectOrCreate: {
            where: { email: email },
            create: {
              name: name,
              email: email,
              phone: `(41) 99999-${i.toString().padStart(4, '0')}`,
            },
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
