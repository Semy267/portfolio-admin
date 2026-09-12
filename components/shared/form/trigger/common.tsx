import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Common({
  children,
  iconSvg: IconComponent,
  iconImg,
  iconSize = 20,
  value,
}: any) {
  const hasIcon = !!IconComponent || !!iconImg;

  return (
    <div className="relative">
      {hasIcon && (
        <div
          className={cn(
            "absolute top-1/2 left-0 -translate-y-1/2",
            !value && "*:grayscale *:text-gray-400",
          )}
        >
          {IconComponent && <IconComponent size={iconSize} />}
          {iconImg && (
            <Image
              src={iconImg}
              alt="icon"
              width={iconSize}
              height={iconSize}
              className="shrink-0"
            />
          )}
        </div>
      )}
      <div className={cn(hasIcon && "pl-7")}>{children}</div>
    </div>
  );
}
