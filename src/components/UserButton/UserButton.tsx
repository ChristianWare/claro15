"use client";

import styles from "./UserButton.module.css";
import useAuth from "@/hooks/auth";
import { members } from "@wix/members";
import Person from "../../../public/icons/person.svg";
import Modal from "../Modal/Modal";
import { useState } from "react";
import Button from "../Button/Button";

interface UserButtonProps {
  loggedInMember: members.Member | null;
  color?: string;
}

export default function UserButton({
  loggedInMember,
  color = "",
}: UserButtonProps) {
  const { login, logout } = useAuth();

  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div className={`${styles.container} ${styles[color]}`}>
      <button
        // onClick={() => login()}
        // onClick={() => setSheetOpen(true)}
        className={`${styles[color]}`}
      >
        <Person className={`${styles.icon} ${styles[color]}`} />
      </button>
      {/* // )} */}
      <Modal isOpen={sheetOpen} onClose={() => setSheetOpen(false)}>
        {loggedInMember ? (
          <div
            className={`flex items-center justify-center gap-2 ${styles[color]}`}
          >
            <h6
              // onClick={login}
              className={styles.UserName}
            >
              Hello, {loggedInMember.contact?.firstName || "Login"}
            </h6>
            <div className={styles.btnContainer}>
              <button className={styles.btn} onClick={logout}>
                Logout
              </button>
              <Button text='Profile' btnType='blackOutline' href='/profile' />
            </div>
          </div>
        ) : (
          <>
            <h6
              // onClick={login}
              className={styles.UserName}
            >
              User options
            </h6>
            <div className={styles.btnContainer}>
              <button
                className={styles.loginBtn}
                // btnType='black'
                // href='/profile'
                onClick={login}
              >
                Login
              </button>
              <Button text='Shop Now' btnType='blackOutline' href='/shop' />
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
