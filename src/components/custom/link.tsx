import { buttonVariants } from "@/components/ui/button";
import { Icon, IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";

type CustomLinkProps = ComponentPropsWithoutRef<typeof Link> &
  VariantProps<typeof buttonVariants> & {
    icon?: IconName;
  };

export const CustomLink = ({
  className,
  children,
  icon,
  variant = "default",
  size = "responsive",
  ...props
}: CustomLinkProps) => {
  return (
    <Link className={cn(buttonVariants({ variant, size }), "gap-2")} {...props}>
      {icon && <Icon name={icon} className="h-4 w-4" />}
      <span className="hidden md:block">{children}</span>
    </Link>
  );
};
