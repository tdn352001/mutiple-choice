import { SVGIcon, SVGIcons } from "@/assets/svgs";
import { icons, LucideProps } from "lucide-react";
import React from "react";

type SvgIconProps = {
  icon: SVGIcon;
  size?: number | string;
} & React.SVGProps<SVGSVGElement>;

const SvgIcon = (props: SvgIconProps) => {
  const { icon, size = 24, ...data } = props;
  const Icon = SVGIcons[props.icon] as any;
  if (Icon) {
    return <Icon fontSize={size} {...data} />;
  }
};

type IconName = keyof typeof icons;

type IconProps = LucideProps & {
  name: IconName;
};

const Icon = ({
  name,
  color = "currentColor",
  size = 20,
  ...props
}: IconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} {...props} />;
};

export { SvgIcon, type SvgIconProps, Icon, type IconProps, type IconName };
