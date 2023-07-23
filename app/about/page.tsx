import styles from "./page.module.scss";
import Link from "next/link";

export default function About() {
  return (
    <div>
      <section className={styles.intro}>
        <h2>Welcome to <span>Inno</span>Schedule - Simplifying Students Lives</h2>
        <p>
          At InnoSchedule, we understand the daily struggles students face when
          managing their academic schedules. With the belief that every minute
          counts in a students life, we have developed a powerful yet
          user-friendly app to simplify the way you plan and organize your
          courses. InnoSchedule is designed to streamline your academic journey,
          ensuring you never miss a class and maximize your productivity.
        </p>
      </section>
      <section className={styles.mission}>
        <h2>Our Mission:</h2>
        <p>
          At InnoSchedule, our mission is to empower students by providing them
          with a reliable and intuitive platform for managing their course
          schedules. We are committed to helping students make the most of their
          academic journey, minimizing time wastage, and enhancing productivity.
          Our app is a students companion, ensuring they stay organized and on
          top of their classes throughout their educational pursuits.
        </p>
      </section>
      <section className={styles.reason}>
        <h2>Why Choose InnoSchedule Over Traditional Methods?</h2>
        <p>
          While traditional methods like using Google Sheets can be useful
          initially, they fall short when it comes to long-term, sustainable
          solutions for students. InnoSchedule is purpose-built for academic
          scheduling, offering specialized features that cater to students
          needs. With real-time updates, intuitive editing, and seamless
          integration, InnoSchedule ensures that you have an organized and
          efficient schedule that adapts to your academic journey.
        </p>
      </section>
      <section className={styles.team}>
        <h2>Meet the Team Behind InnoSchedule</h2>
        <ul>
          <li>Hayder Sarhan</li>
          <li>Mohamad Nour Shahin</li>
          <li>Jahongir Hayitov</li>
          <li>Aruzhan Shinbayeva</li>
        </ul>
      </section>
      <section className={styles.start}>
        <h2>Start Your Organized Academic Journey with InnoSchedule Today!</h2>
        <p>
          We invite you to join the thousands of students who have already
          embraced InnoSchedule as their personalized course planning assistant.
          Take control of your academic life and unlock the potential of
          efficient time management. Get started with InnoSchedule now and
          experience the difference it can make in your student journey!
        </p>
        <Link href="/courses">
          <button>Get Started</button>
        </Link>
      </section>
    </div>
  );
}
