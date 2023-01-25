import TextField from '@/components/TextField';
import React, { useImperativeHandle } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'react-daisyui';

interface Props {
  onSubmit: SubmitHandler<SignupForm>;
}

export interface SignUpFormRef {
  setErrors: (errors: SignupFormErrors) => void;
}

/**
 * 회원 가입 폼
 */
const SignUpForm = React.forwardRef<SignUpFormRef, Props>(
  ({ onSubmit }, ref) => {
    const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting },
    } = useForm<SignupForm>({
      resolver: zodResolver(SignupSchema),
    });

    //? 부모 컴포넌트에서 setErrors를 호출할 수 있도록 ref를 설정
    useImperativeHandle(
      ref,
      () => {
        return {
          setErrors: (errors) => {
            Object.entries(errors).forEach(([key, value]) => {
              setError(key as SignupFormKeys, { message: value });
            });
          },
        };
      },
      [setError],
    );

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-screen flex-col items-center justify-center gap-4"
      >
        <TextField
          id="email"
          label="email"
          type="text"
          inputProps={register('email')}
          error={errors.email?.message}
        />

        <TextField
          id="password"
          label="password"
          type="password"
          inputProps={register('password')}
          error={errors.password?.message}
        />

        <TextField
          id="confirmPassword"
          label="confirmPassword"
          type="password"
          inputProps={register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <Button disabled={isSubmitting} color="primary">
          {isSubmitting ? 'Loading...' : 'Sign Up'}
        </Button>
      </form>
    );
  },
);

SignUpForm.displayName = 'SignUpForm';

export default SignUpForm;

const SignupSchema = z
  .object({
    email: z.string().min(1).email(),
    password: z.string().min(6).max(24),
    confirmPassword: z.string().min(6).max(24),
  })
  .refine(
    (form) => {
      return form.password === form.confirmPassword;
    },
    {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    },
  );

export type SignupForm = z.infer<typeof SignupSchema>;
export type SignupFormKeys = keyof Omit<SignupForm, 'confirmPassword'>;
export type SignupFormErrors = Partial<Record<SignupFormKeys, string>>;
