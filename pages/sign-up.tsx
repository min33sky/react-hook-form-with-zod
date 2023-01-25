import TextField from '@/components/TextField';
import React from 'react';
import { Input } from 'react-daisyui';
import { SubmitHandler, useForm } from 'react-hook-form';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

type SignupForm = z.infer<typeof SignupSchema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({
    resolver: zodResolver(SignupSchema),
  });

  const onValid: SubmitHandler<SignupForm> = ({
    email,
    password,
    confirmPassword,
  }) => {
    console.log('email: ', email);
    console.log('password: ', password);
    console.log('confirmPassword: ', confirmPassword);
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex h-screen flex-col items-center justify-center gap-4"
    >
      <TextField
        id="email"
        label="email"
        type="text"
        inputProps={register('email')}
        error={errors.email?.message}
      />

      <div className="form-control w-full max-w-xs">
        <label htmlFor="password" className="label">
          <span className="label-text">password</span>
        </label>
        <Input
          {...register('password')}
          color="ghost"
          id="password"
          type={'password'}
        />
        {errors.password && (
          <span className="label-text text-error">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="form-control w-full max-w-xs">
        <label htmlFor="confirmPassword" className="label">
          <span className="label-text">confirmPassword</span>
        </label>
        <Input
          {...register('confirmPassword')}
          color="ghost"
          id="confirmPassword"
          type={'password'}
        />
        {errors.confirmPassword && (
          <span className="label-text text-error">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <button>Submit</button>
    </form>
  );
}
