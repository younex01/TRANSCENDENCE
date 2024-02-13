import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from "../redux/store/Providers"
import React from "react";
import { Toaster } from 'sonner'
import {NextUIProvider} from "@nextui-org/system";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ft_transcendence',
  description: 'issam salah younes anas',
}

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

      <html lang="en">
        <body>
            <Providers>
              <React.StrictMode>
              <NextUIProvider>
                {children}
              </NextUIProvider>
              </React.StrictMode>
              <Toaster richColors closeButton/>
            </Providers>
        </body>
      </html>

  )
}
export default RootLayout