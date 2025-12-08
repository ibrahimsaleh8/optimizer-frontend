import Link from "next/link";
import LanguagesToggle from "./LanguagesToggle";
import SmallHeader from "./SmallHeader";
import { getTranslations, getLocale } from "next-intl/server";
import logo from "@/public/images/logo.webp";
import Image from "next/image";
export default async function Header() {
  const t = await getTranslations("HomePage");
  const local = await getLocale();
  const links = [
    {
      url: `/${local}`,
      title: t("home"),
    },
    {
      url: `/${local}/converter`,
      title: t("converter"),
    },
    {
      url: `/${local}/compressor`,
      title: t("optimizer"),
    },
  ];

  return (
    <header className="w-full p-5 bg-transparent text-black font-medium border-b border-soft-border">
      <div className="container mx-auto flex items-center justify-between w-full gap-4">
        <Link href={`/${local}`} className="font-bold text-2xl uppercase">
          <Image src={logo} alt="LOGO" className="w-32" />
        </Link>

        <nav className="flex items-center">
          <ul className="sm:flex items-center gap-9 capitalize font-bold hidden">
            {links.map((link, i) => (
              <li key={i}>
                <Link href={link.url}>{link.title}</Link>
              </li>
            ))}
          </ul>
          <SmallHeader links={links} />
        </nav>
        <div className="sm:flex hidden">
          <LanguagesToggle />
        </div>
      </div>
    </header>
  );
}
