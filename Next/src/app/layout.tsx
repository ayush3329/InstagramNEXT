import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import RecoidContextProvider from "@/utils/RecoilContextProvider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Instagram Clone',
  description: 'This website is made for development purpose only not for commercial use',
}

type RootLayoutProps = {
  children: React.ReactNode
}
export default function RootLayout({children}:RootLayoutProps) {
  return (
    <html lang="en">
        <body className={`${inter.className} h-[100vh] w-[100vw] bg-black`}>
           <RecoidContextProvider>{children}</RecoidContextProvider>
          </body>
    </html>
  )
}
