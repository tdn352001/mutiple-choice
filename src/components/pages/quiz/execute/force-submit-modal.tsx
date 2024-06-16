'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog'
import { Clock, Loader } from 'lucide-react'

interface ForceSubmitModalProps {
  open?: boolean
}

const ForceSubmitModal = ({ open }: ForceSubmitModalProps) => {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <Clock className="text-red-500" size={64} />
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-bold">Quiz Time Expired</h3>
            <p>Time is up for this quiz. Your answers will be submitted automatically.</p>
          </div>
        </div>
        <DialogFooter>
          <Button className="gap-2 !opacity-100" type="button" disabled>
            <Loader className="animate-spin duration-1000 size-5" />
            <span>Submitting</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ForceSubmitModal
