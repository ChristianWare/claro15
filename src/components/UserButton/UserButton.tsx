"use client";

import styles from "./UserButton.module.css";
import useAuth from "@/hooks/auth";
import { members } from "@wix/members";
import Link from "next/link";

interface UserButtonProps {
  loggedInMember: members.Member | null;
}

export default function UserButton({ loggedInMember }: UserButtonProps) {
  const { login, logout } = useAuth();
  return (
    <div className={styles.container}>
      {loggedInMember ? (
        <div className='flex items-center justify-center gap-2'>
          <button
            onClick={() => login()}
            className='rounded-md bg-orange-400 p-2 text-white'
          >
            {loggedInMember.contact?.firstName}
          </button>
          <button
            onClick={() => logout()}
            className='rounded-md bg-red-400 p-2 text-white'
          >
            Logout
          </button>
          <Link
            href='/profile'
            className='rounded-md bg-green-400 p-2 text-white'
          >
            Profile
          </Link>
        </div>
      ) : (
        <button
          onClick={() => login()}
          className='rounded-md bg-orange-400 p-2 text-white'
        >
          Login
        </button>
      )}
    </div>
  );
}
