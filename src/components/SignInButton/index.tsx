import { FaGithub } from "react-icons/fa";
import { FiLogOut, FiX } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

import styles from "./styles.module.scss";

export function SignInButton() {
  const { data: session } = useSession();
  return session ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <FaGithub color="#3DA35D" />
      {session.user.name}
      <FiX color="#a8a8b3" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn("github")}
    >
      <FaGithub color="#ffbc0a" />
      Sign in with Github
    </button>
  );
}
