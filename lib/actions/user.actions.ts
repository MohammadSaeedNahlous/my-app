'use server';

import { signIn, signOut } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { signInFormSchema } from '../validators';

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
