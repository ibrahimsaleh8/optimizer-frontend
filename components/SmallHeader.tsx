"use client";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";
import LanguagesToggle from "./LanguagesToggle";
type Props = {
  links: {
    url: string;
    title: string;
  }[];
};
export default function SmallHeader({ links }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="bg-transparent text-black hover:bg-transparent cursor-pointer sm:hidden flex items-center justify-center">
          <Menu className="w-5! h-5!" />
        </Button>
      </SheetTrigger>
      <SheetContent className="border-soft-border">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <SheetBody>
          <div className="flex flex-col gap-10 items-center w-full">
            <ul className="flex flex-col gap-9 capitalize font-medium w-full">
              {links.map((link, i) => (
                <li className="w-full" key={i}>
                  <Link
                    onClick={() => setOpen(false)}
                    className="w-full font-medium flex items-center justify-center py-2 hover:bg-main-text hover:text-black"
                    href={link.url}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>

            <div>
              <LanguagesToggle />
            </div>
          </div>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
}
