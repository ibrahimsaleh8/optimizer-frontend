import Link from "next/link";
import LanguagesToggle from "./LanguagesToggle";
import SmallHeader from "./SmallHeader";
import { getTranslations } from "next-intl/server";

export default async function Header() {
  const t = await getTranslations("HomePage");

  const links = [
    {
      url: "/",
      title: t("home"),
    },
    {
      url: "/converter",
      title: t("converter"),
    },
    {
      url: "/compressor",
      title: t("optimizer"),
    },
  ];

  return (
    <header className="w-full p-5 bg-transparent text-black font-medium border-b border-soft-border">
      <div className="container mx-auto flex items-center justify-between w-full gap-4">
        <Link href={"/"} className="font-bold text-2xl uppercase">
          Optimizer
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
