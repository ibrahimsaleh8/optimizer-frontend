import Link from "next/link";
import LanguagesToggle from "./LanguagesToggle";
import { useTranslations } from "next-intl";
import SmallHeader from "./SmallHeader";

export default function Header() {
  const t = useTranslations("HomePage");
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
      url: "/",
      title: t("optimizer"),
    },
  ];

  return (
    <header className="w-full p-5 bg-black text-white border-b border-soft-border">
      <div className="container mx-auto flex items-center justify-between w-full gap-4">
        <h1 className="font-bold text-2xl uppercase">Optimizer</h1>

        <nav className="flex items-center">
          <ul className="sm:flex items-center gap-9 capitalize font-medium hidden">
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
