import { Metadata } from "next";
import { CreateAvatar } from "./CreateAvatar/CreateAvatar";

export const metadata: Metadata = {
  title: "Аватар",
};

export default function UploadAvatarPage() {
  return <CreateAvatar />;
}
