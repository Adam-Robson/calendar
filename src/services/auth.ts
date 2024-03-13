import { client } from "./client";
import { SignInType } from "../lib/types";

export async function getUser() {
  const { data: { user } } = await client.auth.getUser();
  return user;
}


export async function signUp(credentials: SignInType): Promise<void> {
  const { email, password } = credentials;

  const { error } = await client.auth.signUp({
    email,
    password
  });

  if (error instanceof Error) {
    console.error('Error signing up with email and password to Supabase: ', error);
  }
}

export async function signIn(credentials: SignInType): Promise<void> {
  const { email, password } = credentials;

  const { error } = await client.auth.signInWithPassword({
    email,
    password
  });

  if (error instanceof Error) {
    console.error('Error signing in with password to Supabase: ', error);
  }
}



export async function googleSignIn(): Promise<void> {
    const { error } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: "https://www.googleapis.com/auth/calendar"
      }
    });

    if (error) {
      console.log('Error signing in to Google provider with Supabase: ', error);
    }
  }

export async function signOut() {
    await client.auth.signOut();
  }
