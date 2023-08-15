import './globals.css'
import Navbar from '@/app/_components/navbar'


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
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content h-screen w-screen flex overflow-x-hidden">
                <Navbar/>
                <div className='pt-28'>
                  {children}
                </div>
                  
              </div> 
              <div className="drawer-side">
                <div className="w-1/5 h-full bg-stone-950 text-white bg-opacity-90 backdrop-blur-sm">
                                    
                  <label htmlFor="my-drawer" className="btn btn-link drawer-button float-right py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="square" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </label>
                  
                  <div className='h-1/6'></div>
                  <div className='px-8 text-gray-200 grid grid-cols-1 place-content-between h-5/6'>
                    <div className='text-xl grid grid-cols-1 h-max gap-7'>
                    <a href='/products'>SHOP</a>
                    <a href='/products/reworked'>REWORKED (WIP)</a>
                    <a href='/products/collections'>COLLECTIONS</a>
                    {/*<a href='/products/lookbooks/ss23'>SS23 LOOKBOOK</a>*/}
                    <a href='/news'>NEWS</a>
                    <a href='/about'>ABOUT</a>
                    </div>
                    <div className='text-sm grid grid-cols-1 h-max gap-1 pb-6'>
                      <a href='/support'>SUPPORT</a>
                      <a href='/terms-and-conditions'>ORDERS T&C</a>
                      <a href='https://www.instagram.com/utc.one/'>INSTAGRAM</a>
                      <a href='https://www.tiktok.com/@utc.one'>TIKTOK</a>
                      <br/>
                      <p>© 2023 UTC+1 CLOTHING</p>
                    </div>
                  </div>
                  
                  
                </div>
              </div>
            </div>          
                       
        </main>
      </body>
    </html>
  )
}
