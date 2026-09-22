import { useNavigate } from "react-router-dom";

import { pathRoutes } from "@/routes";
import { Button } from "../Button/Button";
import styles from "./NotFound.module.css";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleToDashboard = () => navigate(pathRoutes.dashboard);

  return (
    <div className={styles.notFoundWrapper}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>

        <h2 className={styles.title}>Page Not Found</h2>

        <p className={styles.description}>
          Sorry, the page you are looking for does not exist.
        </p>

        <Button onClick={handleToDashboard}>Back to Dashboard</Button>
      </div>
    </div>
  );
};
