"use client";
import { DashboardNav } from "@/components/layout/dashboard/dashboard-nav";
import { Icon } from "@/components/ui/icon";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { routers } from "@/lib/constants/routers";
import { useUserStore } from "@/store/user";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const isAdmin = useUserStore((state) => state.user?.is_admin);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="block">
            <MenuIcon />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="!p-0">
          <div className="space-y-4">
            <div className="px-3 pt-4">
              <Link
                className="block ml-2"
                href={isAdmin ? routers.dashboard : routers.courses}
                onClick={() => setOpen(false)}
              >
                <Icon name="Command" className="h-6 w-6" />
              </Link>
              <div className="space-y-1 pt-8 pb-4">
                <DashboardNav setOpen={setOpen} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
