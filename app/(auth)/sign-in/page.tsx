import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';

import { auth } from '@/auth';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import CredsSignInForm from './creds-signin-form';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
};

// the props contains the search params from the URL
// promise is used to handle async data fetching
// callbackUrl is used to redirect the user after successful sign in
const SignInPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) => {
  const { callbackUrl } = await searchParams;
  const session = await auth();
  console.log({ session });

  if (session) {
    console.log('User is already authenticated:', session);
    // If the user is already authenticated, redirect to the home page
    return redirect(callbackUrl || '/');
  }
  return (
    <div className='w-full max-w-md mx-auto '>
      <Card>
        <CardHeader className='space-y-4'>
          <Link href={'/'} className='flex-center'>
            <Image
              src={'/images/logo.svg'}
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
              priority={true}
            />
          </Link>
          <CardTitle className='text-center'>Sign In</CardTitle>
          <CardDescription className='text-center'>
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4 '>
          <CredsSignInForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
