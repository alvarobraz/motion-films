import { prisma } from './prisma';

export async function getLeadsWithRLS(userId: string) {
  return await prisma
    .$transaction([
      prisma.$executeRawUnsafe(`SET LOCAL app.current_user_id = '${userId}'`),
      prisma.lead.findMany({
        include: { customer: true },
        orderBy: { createdAt: 'desc' },
      }),
    ])
    .then((res) => res);
}
