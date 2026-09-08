import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/Button/Button";
import { Form } from "@/components/Form/Form";
import { FormProvider } from "@/context/FormProvider";

import LogoSangaSanga from "@/assets/images/sanga-sanga.webp";
import SidePanelVector from "@/assets/vectors/side-panel.svg";
import { STORAGE_KEYS } from "@/constans/storageKey";
import { getErrorMessage } from "@/utilities/error";

import { LoginForm } from "../components/LoginForm";
import { login } from "../services/loginService";
import type { LoginRequest } from "../types/login";

import { useGlobalContext } from "@/context/useGlobalContext";
import { pathRoutes } from "@/routes";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {
  const { setIsAuthenticated } = useGlobalContext();
  const navigate = useNavigate();

  const initialRequest: LoginRequest = {
    username: "",
    password: "",
  };
  const [values, setValues] = useState<LoginRequest>(initialRequest);

  const handleChange = <K extends keyof LoginRequest>(
    name: K,
    value: LoginRequest[K],
  ) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleNavigateToDashboard = () => {
    setIsAuthenticated(true);
    navigate(pathRoutes.dashboard, { replace: true });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await login(values);

      setValues(initialRequest);
      localStorage.setItem(STORAGE_KEYS.accessToken, response.data.data.token);
      toast.success(response.data.message);
      handleNavigateToDashboard();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

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

        <Form onSubmit={handleSubmit}>
          <FormProvider values={values} onChange={handleChange}>
            <LoginForm />
          </FormProvider>

          <div className={styles.buttonWrapper}>
            <Button disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </div>
        </Form>
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
