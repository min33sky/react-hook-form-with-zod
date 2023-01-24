import React from 'react';
import { Input } from 'react-daisyui';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormData = {
  email: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onValid: SubmitHandler<FormData> = ({ email }) => {
    console.log('email: ', email);
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex h-screen flex-col items-center justify-center gap-4"
    >
      <div className="form-control w-full max-w-xs">
        <label htmlFor="email" className="label">
          <span className="label-text">email</span>
        </label>
        <Input
          {...register('email', {
            required: 'Email is required',
          })}
          color="ghost"
          id="email"
          type={'text'}
        />
        {errors.email && (
          <span className="label-text text-error">{errors.email.message}</span>
        )}
      </div>
    </form>
  );
}
