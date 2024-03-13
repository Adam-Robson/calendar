/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

export default function App() {
  const session = useSession();
  const client = useSupabaseClient();

  async function googleSignIn(): Promise<void> {
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

  async function signOut() {
    await client.auth.signOut();
  }

  return (
    <div>
      {session ? (
        <div>
          <span>Signed in as: {session.user?.email}</span>
          <button onClick={signOut}>Sign out</button>
       </div>
      ) : (
        <div>
          <span>Sign in</span>
            <button onClick={googleSignIn}>Sign in with Google</button>
        </div>
      )}
    </div>
  )
}
