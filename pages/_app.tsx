import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Nanum_Gothic } from '@next/font/google';


const nanumGothic = Nanum_Gothic({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-nanum-gothic',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${nanumGothic.variable} font-nanum-gothic`}>
      <Component {...pageProps} />
    </div>
  );
}
