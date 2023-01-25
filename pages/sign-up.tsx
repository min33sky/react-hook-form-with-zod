import TextField from '@/components/TextField';
import React from 'react';
import { Input } from 'react-daisyui';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onValid: SubmitHandler<FormData> = ({
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
        inputProps={register('email', {
          required: 'Email is required',
        })}
        error={errors.email?.message}
      />

      <div className="form-control w-full max-w-xs">
        <label htmlFor="password" className="label">
          <span className="label-text">password</span>
        </label>
        <Input
          {...register('password', {
            required: 'password is required',
          })}
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
          {...register('confirmPassword', {
            required: 'confirmPassword is required',
          })}
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
