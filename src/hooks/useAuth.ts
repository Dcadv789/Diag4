import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState<null>(null);
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    console.log('Sign in will be implemented with Firebase');
    return null;
  };

  const signUp = async (email: string, password: string) => {
    console.log('Sign up will be implemented with Firebase');
    return null;
  };

  const signOut = async () => {
    console.log('Sign out will be implemented with Firebase');
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut
  };
}