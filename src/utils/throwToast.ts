import { toast } from "react-toastify";

interface IThrowToastParams {
  title: string;
  autoClose?: number;
  closeOnClick?: boolean;
  draggable?: boolean;
  hideProgressBar?: boolean;
  pauseOnHover?: boolean;
  position?:
    | "top-center"
    | "bottom-center"
    | "bottom-left"
    | "bottom-right"
    | "top-left"
    | "top-right";
  progress?: undefined;
  theme?: "light" | "dark" | "colored";
  type: "info" | "success" | "warning" | "error";
}

export const throwToastFX = ({
  title,
  type,
  position = "top-right",
  autoClose = 1500,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
  progress = undefined,
  theme = "light",
}: IThrowToastParams) => {
  return (() =>
    toast[type](title, {
      position,
      autoClose,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      draggable,
      progress,
      theme,
    }))();
};
