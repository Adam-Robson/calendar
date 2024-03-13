import { client } from "./client";

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
