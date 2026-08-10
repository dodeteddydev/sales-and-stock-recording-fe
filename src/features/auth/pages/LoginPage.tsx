import { Input } from "@/components/Input/Input";
import styles from "./LoginPage.module.css";
import { Button } from "@/components/Button/Button";

export const LoginPage = () => {
  return (
    <main className={styles.wrapper}>
      <section>
        <p className={styles.appTitle}>Mandalika Store Sales and Stock</p>
        <p className={styles.loginTitle}>Log in to your account.</p>
        <p className={styles.description}>
          Enter your username and password to log in.
        </p>
      </section>

      <section>
        <form className={styles.wrapperForm}>
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
        </form>
      </section>
    </main>
  );
};
