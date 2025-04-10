'use client';

import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

export default function Home() {
  const { isAuthenticated } = useKindeBrowserClient();
  return (
    <div className='flex items-center justify-center gap-10 h-screen flex-col w-full max-w-96 mx-auto'>
      {!isAuthenticated && (
        <LoginLink className='m-0 flex h-14 w-full items-center justify-center rounded bg-crRed px-4 py-3 text-center font-bold uppercase text-white bg-red-500 hover:opacity-100 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:opacity-100'>
          Login
        </LoginLink>
      )}
      {!isAuthenticated && (
        <RegisterLink className='m-0 flex h-14 w-full items-center justify-center rounded bg-crRed px-4 py-3 text-center font-bold uppercase text-white bg-red-500 hover:opacity-100 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:opacity-100'>
          Register
        </RegisterLink>
      )}
      {isAuthenticated && (
        <LogoutLink className='m-0 flex h-14 w-full items-center justify-center rounded bg-crRed px-4 py-3 text-center font-bold uppercase text-white bg-red-500 hover:opacity-100 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:opacity-100'>
          Logout
        </LogoutLink>
      )}
    </div>
  );
}
