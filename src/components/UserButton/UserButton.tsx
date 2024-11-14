"use client";

import styles from "./UserButton.module.css";
import useAuth from "@/hooks/auth";
import { members } from "@wix/members";
import Link from "next/link";
import Person from "../../../public/icons/person.svg";

interface UserButtonProps {
  loggedInMember: members.Member | null;
  color?: string;
}

export default function UserButton({
  loggedInMember,
  color = "",
}: UserButtonProps) {
  const { login, logout } = useAuth();

  return (
    <div className={`${styles.container} ${styles[color]}`}>
      {loggedInMember ? (
        <div
          className={`flex items-center justify-center gap-2 ${styles[color]}`}
        >
          <button
            onClick={() => login()}
            className={`rounded-md bg-orange-400 p-2 text-white ${styles[color]}`}
          >
            {loggedInMember.contact?.firstName}
          </button>
          <button
            onClick={() => logout()}
            className={`rounded-md bg-red-400 p-2 text-white ${styles[color]}`}
          >
            Logout
          </button>
          <Link
            href='/profile'
            className={`rounded-md bg-green-400 p-2 text-white ${styles[color]}`}
          >
            Profile
          </Link>
        </div>
      ) : (
        <button
          onClick={() => login()}
          className={`rounded-md bg-orange-400 p-2 text-white ${styles[color]}`}
        >
          <Person className={`${styles.icon} ${styles[color]}`} />
        </button>
      )}
    </div>
  );
}
