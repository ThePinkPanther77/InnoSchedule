import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1>Welcome to InnoSchedule - Your Personal Course Planner!</h1>
        <p>Organize Your Courses, Never Miss a Class</p>
        <button>Get Started</button>
      </section>
      <section className={styles.features}>
        <ul>
          <li>Easy Course Management</li>
          <li>Customizable Timetable</li>
          <li>Real-time Updates</li>
          <li>User-friendly Interface</li>
        </ul>
      </section>
      <section className={styles.use}>
        <h2>How It Works:</h2>
        <ul>
          <li>1) Add Your Courses - Input your course details, such as course name, instructor, and schedule</li>
          <li>2) Customize - Edit and arrange your timetable to suit your preferences</li>
          <li>3) Stay Organized - Never miss a class with real-time updates and reminders</li>
        </ul>
      </section>
    </main>
  );
}
