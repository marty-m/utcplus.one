import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/app/components/navbar'
import Footer from '@/app/components/footer'

const inter = Inter({ subsets: ['latin'] })


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
    
    <html className='scroll-smooth'>
      <body>
        <main>
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content h-screen w-screen flex overflow-x-hidden">
                <Navbar/>
                <div className='pt-28'>
                  {children}
                </div>
                  
              </div> 
              <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                  {/* Sidebar content here */}
                  <li><a>Sidebar Item 1</a></li>
                  <li><a>Sidebar Item 2</a></li>
                  
                </ul>
              </div>
            </div>          
                       
        </main>
      </body>
    </html>
  )
}
