import WelcomeScene from './WelcomeScene';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.meta}>
        <p>EMMA©2026</p>
        <p>--:--</p>
      </div>

      <p className={styles.intro}>
        I&rsquo;m Emma Da Silva, working across Software Engineering, Cybersecurity, and AI. I build
        digital products, explore how systems work, and study how they can be made smarter and more
        secure.
      </p>

      <WelcomeScene />

      <h1 className={styles.statement}>
        <span>I build</span> <span>with intention.</span>
      </h1>
    </header>
  );
}
