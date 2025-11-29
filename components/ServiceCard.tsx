import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { ReactNode } from "react";
type Props = {
  icons: ReactNode;
  title: string;
  description: string;
  secondDescription?: string;
  linkUrl: string;
  linkTitle: string;
};
export default function ServiceCard({
  description,
  icons,
  title,
  linkTitle,
  linkUrl,
  secondDescription,
}: Props) {
  const local = useLocale();

  return (
    <div className="w-full p-5 flex flex-col justify-between gap-3 bg-white rounded-2xl border-2 border-black black-card-shadow">
      {icons}

      <div className="flex flex-col gap-3">
        <p className="text-3xl font-bold">{title}</p>
        <div>
          <p>- {description}</p>
          {secondDescription && <p>- {secondDescription}</p>}
        </div>
      </div>

      <div className="flex justify-end mt-2">
        <Link
          className="px-6  py-1.5 capitalize group border border-black hover:bg-transparent hover:text-black duration-300 bg-main-text font-medium rounded-md text-white sm:w-fit w-full flex items-center gap-2"
          href={linkUrl}>
          {linkTitle} {local == "ar" ? <ChevronsLeft /> : <ChevronsRight />}
        </Link>
      </div>
    </div>
  );
}
