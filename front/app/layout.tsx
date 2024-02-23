// layout.tsx

import { Inter } from 'next/font/google';
import './globals.css';
import Providers from "../redux/store/Providers";
import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';
// import { initializeSocket } from '@/redux/features/chatSlices/socketSlice';
import { Toaster } from 'sonner';
import SocketInitializer from './socket';

const inter = Inter({ subsets: ['latin'] })

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("layout~~~~~!!!!")
  //   dispatch(initializeSocket());
  // }, [dispatch]);

  return (
    <html lang="en">
      <body>
        <Providers>
          <SocketInitializer/>
          {children}
          <Toaster richColors closeButton/>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout;
