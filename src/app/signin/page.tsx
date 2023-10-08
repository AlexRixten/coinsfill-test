"use client";

import { useState } from "react";
import { LoginForm } from "@/components/Forms/LoginForm/LoginForm";
import { Dialog } from "@/components/Dialog/Dialog";
import { Button } from "@/components/Button/Button";
import { RegistrationForm } from "@/components/Forms/RegistrationForm/RegistrationForm";
import styles from "./SignInPage.module.scss";

export default function SignInPage() {
  const [isShowLoginModal, setIsShowLoginModal] = useState<boolean>(false);
  const [isShowRegistrationModal, setIsShowRegistrationModal] =
    useState<boolean>(false);

  const changeIsShowLoginModal = () => {
    setIsShowLoginModal(!isShowLoginModal);
  };

  const changeIsShowRegistrationModal = () => {
    setIsShowRegistrationModal(!isShowRegistrationModal);
  };
  return (
    <div className={styles.wrapper}>
      <h1>Выберите действие</h1>

      <div className={styles.btnsGroup}>
        <Button
          variant="yellow"
          title="Login"
          onClick={changeIsShowLoginModal}
        />
        <Button
          variant="blue"
          title="Registration"
          onClick={changeIsShowRegistrationModal}
        />
      </div>
      <Dialog
        title="Логин"
        onOkTitle="Войти"
        isVisible={isShowLoginModal}
        onClose={changeIsShowLoginModal}
        content={<LoginForm />}
      />
      <Dialog
        title="Регистрация"
        onOkTitle="Зарегистрироваться"
        isVisible={isShowRegistrationModal}
        onClose={changeIsShowRegistrationModal}
        content={<RegistrationForm onClose={changeIsShowRegistrationModal} />}
      />
    </div>
  );
}
