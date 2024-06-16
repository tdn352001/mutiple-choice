import { cn } from '@/lib/utils'
import { useQuizStore } from '@/store/site/quiz'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
interface CountdownProps {
  className?: string
}

const Countdown = ({ className }: CountdownProps) => {
  const quiz = useQuizStore((state) => state.quiz)
  const [showWarning, setShowWarning] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!quiz) {
      return
    }

    const startTime = moment(quiz.start_time)
    const minutesLimit = quiz.exam.time_limit
    const endTime = startTime.add(minutesLimit, 'minutes')

    console.log({
      minutesLimit,
      startTime: startTime.format(),
      endTime: endTime.format(),
    })

    let interval = 0

    const updateCountdown = () => {
      const now = moment()
      const remainingTime = Math.max(endTime.diff(now, 'seconds'), 0)

      console.log({ remainingTime })

      if (remainingTime <= 60) {
        setShowWarning(true)
        if (remainingTime === 0) {
          window.clearInterval(interval)
        }
      }

      if (ref.current) {
        const minutes = Math.floor(remainingTime / 60)
        const seconds = remainingTime % 60
        const text = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
        ref.current.textContent = text
        // if (remainingTime === 0) {

        //   if (stringFormat === 'HH:mm:ss') {
        //     ref.current.textContent = '00:00:00'
        //   } else {
        //     ref.current.textContent = '00:00'
        //   }
        // } else {
        //   ref.current.textContent = moment.utc(remainingTime * 1000).format(stringFormat)
        // }
      }
    }

    interval = window.setInterval(updateCountdown, 1000)

    updateCountdown()

    return () => clearInterval(interval)
  }, [quiz])

  if (!quiz) return null

  return (
    <p ref={ref} className={cn('text-2xl text-medium tabular-nums', showWarning && 'text-destructive', className)}></p>
  )
}

export default Countdown
