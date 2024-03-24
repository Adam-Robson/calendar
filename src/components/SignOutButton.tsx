/* eslint-disable @typescript-eslint/no-misused-promises */
import { signOut } from '../services/auth';

export default function SignOutButton() {
  return (

    <button onClick={() => signOut()}>Sign out</button>
  );
}
