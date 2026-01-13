'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInWithCreds } from '@/lib/actions/user.actions';
import { SIGN_INDEFAULT_VALUES } from '@/lib/constants';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const CredsSignInForm = () => {
  // this hook provides the pending state of the form submission
  const [data, action] = useActionState(signInWithCreds, {
    success: false,
    message: '',
  });

  const searchparams = useSearchParams();
  const callbackUrl = searchparams.get('callbackUrl') || '/';

  const SignInButton = () => {
    // this hook provides the pending state of the form submission
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className='w-full' variant={'default'}>
        {pending ? 'Signing In...' : 'Sign In'}
      </Button>
    );
  };
  return (
    <form action={action}>
      {/* Hidden input to pass callbackUrl to the action by next-auth */}
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div className='space-y-6'>
        <div>
          <Label className='my-1' htmlFor='email'>
            Email
          </Label>
          <Input
            id='email'
            name='email'
            type='email'
            required
            autoComplete='email'
            defaultValue={SIGN_INDEFAULT_VALUES.email}
          />
        </div>
        <div>
          <Label className='my-1' htmlFor='password'>
            Password
          </Label>
          <Input
            id='password'
            name='password'
            type='password'
            required
            autoComplete='password'
            defaultValue={SIGN_INDEFAULT_VALUES.password}
          />
        </div>
        <div>
          <SignInButton />
        </div>
        {data && !data.success && (
          <div className='text-center text-destructive'>{data.message}</div>
        )}

        <div className='text-sm text-center text-muted-foreground'>
          Don&apos;t have an account?{' '}
          <Link href='/sign-up' target='self' className='link underline'>
            SignUp
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredsSignInForm;
