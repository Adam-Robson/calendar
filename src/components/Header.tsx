/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSessionContext, useSession } from '@supabase/auth-helpers-react';
import { googleSignIn } from '../services/auth';
import Loading from './Loading';
import SignOutButton from './SignOutButton';

export default function Header() {
  const session = useSession();
  const { isLoading } = useSessionContext();

  if (isLoading) return <Loading />;

  return (
    <header className="w-screen flex justify-between items-center">
      <h1 className="w-1/2 text-2xl/7 md:text-3xl/8">Empathetech Events</h1>

      <div className="w-full flex justify-end">
        {session ? (
          <div className="flex flex-col justify-center items-end">
            <SignOutButton />
            <span className="absolute bottom-4 right-4 text-xs/4 subpixel-antialiased">Signed in as: {session.user?.email}</span>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <button onClick={googleSignIn}>Sign in with Google</button>
          </div>
        )}
      </div>
    </header>
  );
}
