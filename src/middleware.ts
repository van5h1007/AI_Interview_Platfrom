import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '../auth';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/profile')) {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}
