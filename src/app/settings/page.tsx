import { Metadata } from "next";
import Link from "next/link";
import { ERoutes } from "@/enums/routes.enum";

export const metadata: Metadata = {
  title: "Настройки",
};

export default function SettingsPage() {
  return (
    <div>
      <h1>Настройки</h1>
      <Link href={ERoutes.UploadAvatar} className="underline">
        Загрузка аватара
      </Link>
    </div>
  );
}
