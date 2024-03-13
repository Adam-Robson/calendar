/* eslint-disable @typescript-eslint/no-misused-promises */
import { useSessionContext, useSession } from '@supabase/auth-helpers-react';
import { googleSignIn } from '../services/auth';
import Loading from './Loading';
import SignOutButton from './SignOutButton';

export default function Header() {
  const session = useSession();
  const { isLoading } = useSessionContext();

  if (isLoading) return <Loading />

  return (
    <div>
       {session ? (
        <div>
          <span>Signed in as: {session.user?.email}</span>
          <SignOutButton />
       </div>
      ) : (
        <div>
            <button onClick={googleSignIn}>Sign in with Google</button>
        </div>
      )}
    </div>
  )
}
