'use client'
import { Inter } from 'next/font/google'
import Providers from "../../../redux/store/Providers"
import React from 'react'
import FriendsAndGroups from '@/app/components/chatComponents/FriendsAndGroups'
const inter = Inter({ subsets: ['latin'] })

function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
        <FriendsAndGroups/>
        {children}
    </Providers>
  )
}
export default RootLayout