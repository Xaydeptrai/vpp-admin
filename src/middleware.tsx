import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || ''
  const { pathname } = request.nextUrl

  // Cho phép truy cập trang login mà không cần token
  if (pathname === '/login') {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // Chặn truy cập các trang khác nếu không có token
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

// Chỉ áp dụng middleware cho các route này
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
} 