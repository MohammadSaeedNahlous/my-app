import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ZodError } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// convert prisma object into json serializable object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split('.');
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}

// format errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any) {
  // handle zod validation errors
  if (error instanceof ZodError) {
    const messages = error.issues.map((issue) => issue.message);
    return messages.join(', ');
  } else if (
    error.name === 'PrismaClientKnownRequestError' &&
    error.code === 'P2002'
  ) {
    // handle prisma errors

    const field = error.meta?.target ? error.meta.target[0] : 'Field';
    return `${
      field.charAt(0).toUpperCase() + field.slice(1)
    } is already exists.`;
  } else {
    // handle other errors
    return error.message === 'string'
      ? error.message
      : JSON.stringify(error.message);
  }
}
