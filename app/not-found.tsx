import Link from "next/link";
import notFoundImage from "@/public/images/not-found-image.webp";
import Image from "next/image";
import "./globals.css";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("NotFound");
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #e2e8f0 1px, transparent 1px),
        linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
      `,
          backgroundSize: "20px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
        }}
      />
      <div className="flex flex-col gap-4 items-center justify-center w-full relative">
        <Image className="w-120" src={notFoundImage} alt="Not Found Image" />
        <h2 className="text-2xl font-bold">{t("notFoundPage")}</h2>
        <p className="text-xl">{t("can'tFind")}</p>
        <Link className="px-8 py-4 bg-black text-white mt-4" href="/">
          {t("returnHome")}
        </Link>
      </div>
    </div>
  );
}
