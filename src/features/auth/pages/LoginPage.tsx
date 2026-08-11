import LogoSangaSanga from "@/assets/images/sanga-sanga.webp";
import SidePanelVector from "@/assets/vectors/side-panel.svg";
import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {
  return (
    <main className={styles.wrapper}>
      <section className={styles.formSection}>
        <div className={styles.appLogoAndTitle}>
          <img src={LogoSangaSanga} alt="logo" />
          <p>Mandalika Store Sales and Stock</p>
        </div>

        <p className={styles.loginTitle}>Log in to your account.</p>

        <p className={styles.description}>
          Enter your username and password to log in.
        </p>

        <Input
          id="username"
          label="Username"
          placeholder="e.g. johndoe"
          type="text"
          error="Username is required"
        />

        <Input
          id="password"
          label="Password"
          placeholder="e.g. 123456"
          type="password"
          error="Password is required"
        />

        <div className={styles.buttonWrapper}>
          <Button>Login</Button>
        </div>
      </section>

      <section className={styles.sidePanel}>
        <div className={styles.sidePanelContent}>
          <img src={SidePanelVector} alt="side panel" />
          <a
            href="https://storyset.com/business"
            target="_blank"
            rel="noreferrer"
          >
            Business illustrations by Storyset
          </a>

          <h2>Manage your store with confidence.</h2>

          <p>Keep track of sales and inventory from one simple dashboard.</p>
        </div>
      </section>
    </main>
  );
};
