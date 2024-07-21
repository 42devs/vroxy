import { PrismaClient } from '@prisma/client';

const prismaGlobal = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

// Export default prisma options
export const prisma = prismaGlobal.prisma ?? new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
});
