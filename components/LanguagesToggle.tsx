import { useLocale } from "next-intl";
import Link from "next/link";

export default function LanguagesToggle() {
  const local = useLocale();
  return (
    <Link href={`/${local == "ar" ? "en" : "ar"}`}>
      {local == "ar" ? "English" : "عربى"}
    </Link>
  );
}
