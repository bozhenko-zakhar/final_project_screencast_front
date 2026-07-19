import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = [
  '/onboarding',
  '/journey',
  '/diary',
  '/profile',
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute =
    pathname === '/sign-in' || pathname === '/sign-up';

  // Авторизований користувач не може зайти на sign-in/sign-up
  if (accessToken && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Приватний маршрут без access token
  if (!accessToken && isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/sign-in',
    '/sign-up',
    '/onboarding/:path*',
    '/journey/:path*',
    '/diary/:path*',
    '/profile/:path*',
  ],
};