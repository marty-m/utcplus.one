import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { pb } from './app/pocketbase'
import useCartStore from '@/lib/cartStore'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    
  const totalQuantity = await useCartStore.getState().totalQuantity()

    if (request.nextUrl.pathname.startsWith('/account') && !pb.authStore.isValid) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
      }

    if (request.nextUrl.pathname.startsWith('/cart/checkout') &&  totalQuantity == 0 ) {
      return NextResponse.redirect(new URL('/cart', request.url))
    }
     

}