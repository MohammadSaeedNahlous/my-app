import { PrismaClient } from '@prisma/client';
import sampleData from './sample-data';

async function main() {
  // Clear existing data
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();

  // Insert sample data
  await prisma.product.createMany({
    data: sampleData.products,
  });
  await prisma.user.createMany({
    data: sampleData.users,
  });

  // Log success message
  console.log('Database seeded successfully.');
}

// execute the main function
main();
