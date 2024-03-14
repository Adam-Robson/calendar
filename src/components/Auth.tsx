/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authenticate, otpAuth, googleSignIn } from '../services/auth';
import { AuthPropTypes } from '../lib/types';
import { useAuthContext } from '../lib/context/AuthContext';

export default function Auth() {
  const { type } = useParams<{ type: string }>();
  const { user, setUser } = useAuthContext();

  const [userCredentials, setUserCredentials] = useState<AuthPropTypes>({
    email: '',
    password: '',
  });
  const [linkEmail, setLinkEmail] = useState<string>('');
  const [error, setError] = useState<string | undefined>('');

  async function handlePasswordAuth(credentials: AuthPropTypes) {
    try {
      if (type) {
        const res = await authenticate(credentials, type);
        setUser(res.user);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error('Error: ', error);
      } else {
        console.error('An error occurred while signing in user with credentials.');
      }
    }
  }

  async function handleMagicAuth(email: string) {
    try {
      const res = await otpAuth(email);
      setUser(res?.user ?? null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error('Error: ', error);
      } else {
        console.error('An error occurred while signing in user with magic link.');
      }
    }
  }

  async function handleGoogleAuth() {
    try {
      await googleSignIn();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error('An error occurred while signing in user with Google OAuth.');
      }
    }
  }

  useEffect(() => {
    const navigate = useNavigate();
    if (!user) navigate('/', { replace: true });
  }, []);

  return (
    <section className="min-h-screen w-screen flex flex-col justify-center items-center p-24">
      <div className="w-full h-full m-12 border-2 border-slate-900 grid grid-rows-3">
        {error && <span>{error}</span>}

        <span className="row-span-1">
          <button onClick={handleGoogleAuth}>Sign in with Google</button>
        </span>

        <hr />

        <form
          onSubmit={() => handlePasswordAuth(userCredentials)}
          className="row-span-1 border-2 border-slate-700 rounded-md drop-shadow-md"
        >
          <label>Email:</label>
          <input
            value={userCredentials.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => (
              setUserCredentials({
                ...userCredentials,
                email: e.target.value
              })
            )}
          />
          <label>Password:</label>
          <input
            value={userCredentials.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => (
              setUserCredentials({
                ...userCredentials,
                password: e.target.value
              })
            )}
          />
          <input
            type="submit"
            value="submit"
          />
        </form>

        <hr />

        <span className="row-span-1">
          <label>Enter email to receive magic link:</label>
          <input
            value={linkEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLinkEmail(e.target.value)}
          />
          <button onClick={() => handleMagicAuth(linkEmail)}>
            Get Magic Link
          </button>
        </span>

      </div>

    </section>
  );
}
