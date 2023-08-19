import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster"
const poppins = Poppins({ subsets: ['latin'] , weight : ['500' , '600' , '700']})

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
    <ClerkProvider>
    <html lang="en">
      <body className={poppins.className }>
      {children}
      <Toaster />
      </body>
    </html>
    </ClerkProvider>
  )
}
