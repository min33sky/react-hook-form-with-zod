import React from 'react';
import { Input } from 'react-daisyui';
import { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  id: string;
  label: string;
  error?: string;
  type?: 'text' | 'password' | 'phone';
  inputProps?: UseFormRegisterReturn;
}

export default function TextField({
  id,
  label,
  error,
  inputProps,
  type,
}: Props) {
  return (
    <div className="form-control w-full max-w-xs">
      <label htmlFor={id} className="label">
        <span className="label-text">{label}</span>
      </label>
      <Input
        color={'ghost'}
        id={id}
        type={type ?? 'text'}
        {...(inputProps ?? {})}
      />
      {error ? <span className="label-text text-error">{error}</span> : null}
    </div>
  );
}
