import { ERoutes } from "@/enums/routes.enum";
import { EIcons } from "@/enums/icons.enum";

interface IRouteParams {
  title: string;
  iconName: EIcons;
}

export const privateRoutesMock = [
  ERoutes.Main,
  ERoutes.Card,
  ERoutes.Next,
  ERoutes.Wallet,
  ERoutes.Profile,
];

export const RoutesMock: Record<ERoutes, IRouteParams> = {
  [ERoutes.Main]: {
    title: "Главная",
    iconName: EIcons.Home,
  },
  [ERoutes.Card]: {
    title: "Карты",
    iconName: EIcons.Card,
  },
  [ERoutes.Next]: {
    title: "Некст",
    iconName: EIcons.Arrow,
  },
  [ERoutes.Wallet]: {
    title: "Кошелек",
    iconName: EIcons.Wallet,
  },
  [ERoutes.Auth]: {
    title: "Авторизация",
    iconName: EIcons.User,
  },
  [ERoutes.Profile]: {
    title: "Профиль",
    iconName: EIcons.User,
  },
  [ERoutes.Settings]: {
    title: "Настройки",
    iconName: EIcons.User,
  },
  [ERoutes.UploadAvatar]: {
    title: "Загрузка аватара",
    iconName: EIcons.User,
  },
};
