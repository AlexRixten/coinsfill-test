import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { TextInput } from "@/components/Inputs/TextInput/TextInput";
import { Checkbox } from "@/components/Inputs/Checkbox/Checkbox";
import { Button } from "@/components/Button/Button";
import { EIcons } from "@/enums/icons.enum";
import { ERoutes } from "@/enums/routes.enum";
import styles from "./RegistrationForm.module.scss";
import { createUser } from "@/services";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
  checked: string;
};

interface IProps {
  onClose: () => void;
}

export const RegistrationForm = ({ onClose }: IProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    createUser({ ...data }).then((res) => {
      if (res) {
        onClose();
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Регистрация</h3>
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
                message: "You must specify a password",
              },
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
            }}
            error={errors.password?.message}
          />
          <TextInput
            label="Подтвердите пароль"
            type="password"
            register={register}
            name="confirmPassword"
            iconName={EIcons.Lock}
            validation={{
              required: {
                value: true,
                message: "You must specify a password",
              },
              validate: (value) =>
                value === watch("password") || "The passwords do not match",
            }}
            error={errors.confirmPassword?.message}
          />

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

        <Button type="submit" title="Зарегистрироваться" variant="yellow" />
      </form>
    </div>
  );
};
