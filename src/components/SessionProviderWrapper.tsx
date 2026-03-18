// components/SessionProviderWrapper.tsx
'use client';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
import { SessionProvider } from 'next-auth/react';

export default function SessionProviderWrapper({children}:Props ) {
  return <SessionProvider>{children}</SessionProvider>;
}
