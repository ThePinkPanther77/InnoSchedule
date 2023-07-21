import styles from "./footer.module.scss";
import logo from "@/public/Logo.png";
import telegram from "@/public/telegram.svg";
import github from "@/public/github.svg";
import mail from "@/public/email.svg";
import Image from "next/image";

export default function footer() {
  return (
    <footer className={styles.footer}>
      <Image src={logo} alt="app logo" />
      <div>
        <Image src={mail} alt="email logo" />
        <Image src={telegram} alt="teleram logo" />
        <Image src={github} alt="github logo" width='50' height='50'/>
      </div>
    </footer>
  );
}
