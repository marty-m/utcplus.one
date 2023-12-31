import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import Navbar from '@/components/navbar'


export const metadata = {
  title: 'UTC+1',
  description: 'streetwear brand from Sweden. designing since 2022.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html className='scroll-smooth font-mono'>
      <body>
        <main className='w-screen h-screen overflow-x-auto'>
          
          <Navbar/>
          <div className='h-full pt-24'>
              {children}
          </div>         
        </main>
        <Toaster />
      </body>
    </html>
  )
}
