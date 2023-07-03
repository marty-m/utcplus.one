import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'UTC+1 Clothing',
  description: 'streetwear brand from Sweden. desgining since 2022.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      {Navbar()}
      {children}
      </body>
    </html>
  )
}
