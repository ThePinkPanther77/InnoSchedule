import styles from "./navbar.module.scss";
import Link from "next/link";

export default function navbar() {
  return (
    <div className={styles.navbar}>
      <div>
        <p className={styles.title}>Inno Schedule</p>
      </div>
      <div>
        <ul className={styles.navList}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/courses">Calendar</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
