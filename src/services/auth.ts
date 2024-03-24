import { client } from './client';
import { AuthPropTypes } from '../lib/types';

async function getUser() {
  const { data: { user } } = await client.auth.getUser();
  return user;
}

async function authenticate(
  credentials: AuthPropTypes,
  type: string
) {
  let res;
  const { email, password } = credentials;

  if (type === 'sign-up') {
    const { data, error } = await client.auth.signUp({ email, password });
    if (error instanceof Error) {
      console.error(`Error signing up with email and password to Supabase: ${JSON.stringify(error)}`);
    }
    res = data;
  } else {
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error instanceof Error) {
      console.error(`Error signing in with email and password to Supabase: ${JSON.stringify(error)}`);
    }
    res = data;
  }
  return res;
}

async function otpAuth(email: string) {
  const { data, error } = await client.auth.signInWithOtp({
    email
  });

  if (!email) {
    console.error('Email is required');
    return;
  }

  if (error instanceof Error) {
    console.error('error signing in:', error);
  }
  return data;
}

async function googleSignIn(): Promise<void> {
  const { error } = await client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      scopes: 'https://www.googleapis.com/auth/calendar'
    }
  });

  if (error instanceof Error) {
    console.log('Error signing in to Google provider with Supabase: ', error);
  }
}

async function signOut() {
  await client.auth.signOut();
}

export { getUser, authenticate, otpAuth, googleSignIn, signOut };
