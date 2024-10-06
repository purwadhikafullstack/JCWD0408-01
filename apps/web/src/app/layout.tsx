'use client'

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from '@/components/Footer';
import { Suspense } from 'react';
import LoadingComp from '@/components/loadingcomp';
import DelayedLoadingWrapper from '@/components/delaywrapper';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] });

const metadata: Metadata = {
  title: 'Bask-it',
  description: 'find your goods',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DelayedLoadingWrapper>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </DelayedLoadingWrapper>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          toastClassName="custom-toast"
        />
      </body>
    </html>
  );
}
