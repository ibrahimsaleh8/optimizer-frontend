"use client";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguagesToggle() {
  const local = useLocale();
  const path = usePathname();
  const url =
    path.split("/").length == 2
      ? local == "ar"
        ? "en"
        : "ar"
      : `/${local == "ar" ? "en" : "ar"}/${path.split("/")[2]}`;
  return <Link href={`${url}`}>{local == "ar" ? "English" : "عربى"}</Link>;
}
