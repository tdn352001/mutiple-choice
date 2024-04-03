import { SVGIcon, SVGIcons } from '@/assets/svgs'
import { icons, LucideProps } from 'lucide-react'

type SvgIconProps = {
  icon: SVGIcon
  size?: number | string
} & React.SVGProps<SVGSVGElement>

const SvgIcon = (props: SvgIconProps) => {
  const { icon, size = 24, ...data } = props
  const Icon = SVGIcons[props.icon] as any
  if (Icon) {
    return <Icon fontSize={size} {...data} />
  }
}

type IconProps = LucideProps & {
  name: keyof typeof icons
}

const Icon = ({ name, color = 'currentColor', size = 20, ...props }: IconProps) => {
  const LucideIcon = icons[name]

  return <LucideIcon color={color} size={size} {...props} />
}

export { SvgIcon, type SvgIconProps, Icon, type IconProps }
