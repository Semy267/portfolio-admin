import { VariantProps } from "class-variance-authority";
import { Button, buttonVariants } from "@/ui/button";
import { cn } from "@/lib/utils";

type CButtonBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    icon?: string | React.ReactNode;
    className?: string;
    onClick?: () => void;
  };

type CButtonConditionalProps =
  | { title: string; children?: never }
  | { title?: string; children: React.ReactNode };

type CButtonProps = CButtonBaseProps & CButtonConditionalProps;

export default function CButton({
  title,
  icon,
  variant,
  size,
  className,
  onClick,
  font,
  children,
  ...props
}: CButtonProps) {
  return (
    <Button
      {...props}
      font={font}
      size={size}
      onClick={onClick}
      variant={variant}
      className={cn(className)}
    >
      {icon}
      {title}
      {children}
    </Button>
  );
}
