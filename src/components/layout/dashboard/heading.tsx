import { Typography } from '@/components/ui/typography'

interface HeadingProps {
  title: string
  description: string
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <Typography variant="h1">{title}</Typography>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
