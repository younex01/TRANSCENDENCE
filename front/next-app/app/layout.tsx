import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from "./redux/store/Providers"

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
                {children}
            </Providers>
        </body>
      </html>

  )
}
export default RootLayout