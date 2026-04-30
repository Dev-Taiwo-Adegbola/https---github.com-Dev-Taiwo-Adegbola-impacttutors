import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value
  const { pathname } = request.nextUrl

  // Define protected routes
  const isDashboardRoute = pathname.startsWith('/dashboard')
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signup')

  // If no token and trying to access dashboard, redirect to login
  if (isDashboardRoute && !accessToken) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirectTo', pathname)
    return NextResponse.redirect(url)
  }

  // If has token and trying to access auth routes, redirect to dashboard
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Role-based protection would ideally happen here, but requires fetching profile.
  // For now, we trust the tokens and handle role-based logic in Layouts/Pages.

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
