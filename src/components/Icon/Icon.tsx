import { HTMLAttributes } from "react";
import { iconList } from "./iconList";
import { EIcons } from "@/enums/icons.enum";

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  size: number;
  color?: string;
  name: EIcons;
}

export const Icon = ({
  size = 16,
  color = "#000000",
  name,
  className,
}: IconProps) => {
  if (!iconList[name]) return null;

  const { viewBox, data } = iconList[name];

  return (
    <div style={{ color }} className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox || "0 0 512 512"}
        height={size}
        width={size}
        // fill={color}
      >
        {data}
      </svg>
    </div>
  );
};
