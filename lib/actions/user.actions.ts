'use server';

import { signIn, signOut } from '@/auth';
import { prisma } from '@/db/prisma';
import { hashSync } from 'bcrypt-ts-edge';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { formatError } from '../utils';
import { signInFormSchema, signUpFormSchema } from '../validators';

// Sign in the user with credentials
export async function signInWithCreds(prevState: unknown, formData: FormData) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    await signIn('credentials', {
      email: user.email,
      password: user.password,
    });
    return { success: true, message: 'Signed in successfully.' };
  } catch (error) {
    //   Re-throw redirect errors to be handled by Next.js
    if (isRedirectError(error)) {
      throw error;
    }
    console.error('Sign-in error:', error);
    return { success: false, message: 'Invalid credentials.' };
  }
}

// Sign out the user
export async function signOutUser() {
  await signOut();
}

// sign up the user with credentials
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    // Validate the form data
    const user = signUpFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      name: formData.get('name'),
    });

    // hash the password before storing it in the database
    const hashedPassword = hashSync(user.password, 10);

    // Create the user in the database
    await prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
        name: user.name,
      },
    });

    // Automatically sign in the user after successful sign-up
    await signIn('credentials', {
      email: user.email,
      password: user.password,
    });

    // Return success message for the hook useActionState
    return { success: true, message: 'Signed up successfully.' };
  } catch (error) {
    //   Re-throw redirect errors to be handled by Next.js
    if (isRedirectError(error)) {
      throw error;
    }
    console.error('Sign-up error:', error);
    return { success: false, message: formatError(error) };
  }
}
