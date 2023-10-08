import { axiosInstance } from "@/lib/axios";
import { throwToastFX } from "@/utils/throwToast";
import { decodeBase64 } from "@/utils/uploadFile";
import { ERoutes } from "@/enums/routes.enum";
import { AxiosError } from "axios";

interface IGetImageParams {
  ok: boolean;
  image: string;
}

export const getImage = async () => {
  const token = localStorage.getItem("coinsFill_token");
  try {
    if (!token) return;

    const res = await axiosInstance.get<IGetImageParams>("/account/image", {
      headers: {
        "token-tt": `${token}`,
      },
    });

    if (!res.data.ok) {
      throwToastFX({
        title: "Произошла ошибка, проверьте введенные данные",
        type: "error",
      });
      return;
    }

    return decodeBase64(res.data.image);
  } catch (err) {
    const error = err as AxiosError;
    throwToastFX({
      title: error.message,
      type: "error",
    });
  }
};

export const putImage = async (file: string) => {
  const token = localStorage.getItem("coinsFill_token");

  try {
    if (!token) return;
    const res = await axiosInstance.put(
      "/account/image",
      {
        image: file,
      },
      {
        headers: {
          "token-tt": `${token}`,
        },
      }
    );

    if (res && res.data.ok) {
      throwToastFX({
        title: "Картинка успешно загружена",
        type: "success",
      });
    } else {
      throwToastFX({
        title: "Произошла ошибка, проверьте данные",
        type: "error",
      });
      return null;
    }
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    throwToastFX({
      title: error.message,
      type: "error",
    });
  }
};

interface ICreateUserParams {
  email: string;
  password: string;
}

export const createUser = async ({ email, password }: ICreateUserParams) => {
  try {
    const res = await axiosInstance.post("/user", {
      email,
      password,
    });

    if (res && res.data.ok) {
      throwToastFX({
        title: "Регистрация прошла успешно, вы можете авторизоаваться",
        type: "success",
      });
    } else {
      throwToastFX({
        title: "Произошла ошибка, проверьте введенные данные",
        type: "error",
      });
      return null;
    }
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    throwToastFX({
      title: error.message,
      type: "error",
    });
  }
};
