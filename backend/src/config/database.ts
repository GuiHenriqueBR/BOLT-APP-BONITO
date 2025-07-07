import { PrismaClient } from '@prisma/client';

// Extend PrismaClient with additional methods if needed
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
  errorFormat: 'pretty',
});

// Enable soft delete middleware
prisma.$use(async (params, next) => {
  // Add soft delete logic here if needed
  const result = await next(params);
  return result;
});

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;