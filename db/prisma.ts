import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

// ✅ Load environment variables (for scripts outside Next.js)
import dotenv from 'dotenv';
dotenv.config();

// ✅ Ensure DATABASE_URL exists
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('❌ DATABASE_URL is not set!');
}

// ✅ Use WebSocket for Neon serverless
neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });

export const prisma = new PrismaClient({ adapter: adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product: any) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product: any) {
          return product.rating.toString();
        },
      },
    },
  },
});
