import Link from 'next/link';
import React from 'react';
import { Button } from 'react-daisyui';

export default function SuccessPage() {
  return (
    <div className="grid h-screen place-content-center place-items-center gap-6 ">
      <h1 className="text-3xl font-semibold">회원 가입이 완료되었습니다.</h1>
      <Link href={'/'}>
        <Button color="primary" className=" ">
          시작 페이지로
        </Button>
      </Link>
    </div>
  );
}
