/* eslint-disable @typescript-eslint/no-misused-promises */
import Loading from './components/Loading';
import SignOutButton from './components/SignOutButton';
import { googleSignIn } from './services/auth';
import { useSession, useSessionContext } from '@supabase/auth-helpers-react';

export default function App() {
  const session = useSession();
  const { isLoading } = useSessionContext();

  {isLoading && <Loading />}

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
