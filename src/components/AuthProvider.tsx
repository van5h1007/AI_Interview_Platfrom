'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAuthStore } from '../stores/auth-store';

export const AuthProvider = () => {
  const { data: session } = useSession();
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    } else {
      clearUser();
    }
  }, [session, setUser, clearUser]);

  return null; 
};