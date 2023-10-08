import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./LoginForm.module.scss";
import { TextInput } from "@/components/Inputs/TextInput/TextInput";
import { Checkbox } from "@/components/Inputs/Checkbox/Checkbox";
import { Button } from "@/components/Button/Button";
import { EIcons } from "@/enums/icons.enum";
import { throwToastFX } from "@/utils/throwToast";
import { ERoutes } from "@/enums/routes.enum";
import { useEffect } from "react";

type Inputs = {
  email: string;
  password: string;
  checked: boolean;
};

export const LoginForm = () => {
  const router = useRouter();
  const session = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (!session.data?.user.token) return;
    localStorage.setItem("coinsFill_token", session.data?.user.token);
  }, [session.data?.user.token]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res && res.ok) {
      router.push(ERoutes.Profile);
    } else {
      throwToastFX({
        title: "Произошла ошибка, проверьте введенные данные",
        type: "error",
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Логин</h3>

      <form
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
      >
        <div className={styles.formWrapper}>
          <TextInput
            label="Почта"
            type="text"
            register={register}
            name="email"
            iconName={EIcons.Email}
            validation={{
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Password should be minimum length of 6",
              },
            }}
            error={errors.email?.message}
          />
          <TextInput
            label="Пароль"
            type="password"
            register={register}
            name="password"
            iconName={EIcons.Lock}
            validation={{
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Password should be minimum length of 6",
              },
            }}
            error={errors.password?.message}
          />

          <a href="#" className={styles.forgetPassword}>
            Забыли пароль?
          </a>

          <div className={styles.checkbox}>
            <Checkbox
              name="checked"
              required
              register={register}
              error={errors.checked?.message}
              validation={{
                required: { value: true, message: "Checked is required" },
              }}
            />
            <p>
              Нажимая кнопку, вы подтверждаете, что ознакомились и соглашаетесь
              с <a href="#">Условиями Соглашения!</a> Правилами и политикой
              конфиденциальности компании
            </p>
          </div>
        </div>

        <Button type="submit" title="Войти" variant="yellow" />
      </form>
    </div>
  );
};
