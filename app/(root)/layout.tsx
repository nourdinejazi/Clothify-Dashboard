
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from '@/components/navbar'
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';



export const metadata: Metadata = {
  title: 'Admin',
  description: 'admin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (

    <>
      <Navbar />
      {children}
    </>

  )
}
