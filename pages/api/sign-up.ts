// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { SignupFormErrors, SignupFormKeys } from '@/components/SignUpForm';
import type { NextApiRequest, NextApiResponse } from 'next';

export type SignUpResponse = {
  success: boolean;
  errors?: SignupFormErrors;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignUpResponse>,
) {
  const { email, password } = req.body as Record<SignupFormKeys, string>;

  if (email === 'bob@gmail.com') {
    // 1 second delay to simulate a slow server
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return res.status(200).json({
      success: false,
      errors: {
        email: 'Email not available',
      },
    });
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  res.status(200).json({ success: true });
}
