'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUpUser } from '@/lib/actions/user.actions';
import { SIGN_UP_DEFAULT_VALUES } from '@/lib/constants';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const SignUpForm = () => {
  // this hook provides the pending state of the form submission
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: '',
  });

  const searchparams = useSearchParams();
  const callbackUrl = searchparams.get('callbackUrl') || '/';

  const SignUpButton = () => {
    // this hook provides the pending state of the form submission
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className='w-full' variant={'default'}>
        {pending ? 'Submitting...' : 'Sign Up'}
      </Button>
    );
  };
  return (
    <form action={action}>
      {/* Hidden input to pass callbackUrl to the action by next-auth */}
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div className='space-y-6'>
        <div>
          <Label className='my-1' htmlFor='name'>
            Name
          </Label>
          <Input
            id='name'
            name='name'
            type='name'
            required
            autoComplete='name'
            defaultValue={SIGN_UP_DEFAULT_VALUES.name}
          />
        </div>
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
            defaultValue={SIGN_UP_DEFAULT_VALUES.email}
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
            defaultValue={SIGN_UP_DEFAULT_VALUES.password}
          />
        </div>
        <div>
          <Label className='my-1' htmlFor='confirmPassword'>
            Confirm Password
          </Label>
          <Input
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            required
            autoComplete='confirmPassword'
            defaultValue={SIGN_UP_DEFAULT_VALUES.confirmPassword}
          />
        </div>
        <div>
          <SignUpButton />
        </div>
        {data && !data.success && (
          <div className='text-center text-destructive'>{data.message}</div>
        )}

        <div className='text-sm text-center text-muted-foreground'>
          Do you have an account?{' '}
          <Link href='/sign-in' target='self' className='link underline'>
            SignIn
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
