// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email, password } = req.body as Record<string, string>;

  console.log('POST /sign-up', req.body, { email, password });

  if (email === 'bob@gmail.com') {
    // 1 second delay to simulate a slow server
    await new Promise((resolve) => setTimeout(resolve, 1000));

    res.status(200).json({
      success: false,
      errors: {
        email: 'Email not available',
      },
    });
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  res.status(200).json({ success: true });
}
