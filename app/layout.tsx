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
        <main>
          <div className='w-screen h-screen overflow-x-hidden'>
          <Navbar/>
          <div className='h-max mt-24'>
              {children}
          </div> 
          </div>          
        </main>
      </body>
    </html>
  )
}
