import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export default function CInput({
  className,
  classNameParent,
  label,
  iconSvg: IconSvg,
  iconImg,
  iconSize = 20,
  ...props
}: IFieldInput) {
  const hasIcon = !!IconSvg || !!iconImg;
  return (
    <div className={cn("w-full", classNameParent)}>
      {label && <Label>{label}</Label>}
      <div className={cn("relative")}>
        <div
          className={cn(
            "absolute top-1/2 left-3 -translate-y-1/2",
            !props.value && "*:grayscale *:text-gray-400",
          )}
        >
          {IconSvg && <IconSvg size={iconSize} />}
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
        <Input
          placeholder={props.placeholder}
          className={cn(className, {
            "!pl-10": hasIcon,
          })}
          onWheel={(event) => event.currentTarget.blur()}
          checked={props.checked}
          {...props}
        />
      </div>
    </div>
  );
}
