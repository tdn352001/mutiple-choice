"use client";
import AnswersLog from "@/components/pages/quiz/execute/answers-log";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import React, { useState } from "react";

// import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[];
}

export function MobileControlPanel({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="block">
            <MenuIcon />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="!px-0 pt-3">
          <SheetHeader className="px-3 text-left">
            <SheetTitle>Overview</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <AnswersLog />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
