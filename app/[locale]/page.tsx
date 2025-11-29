"use client";
import ServiceCard from "@/components/ServiceCard";
import { useLocale, useTranslations } from "next-intl";
import jpgIcon from "@/icons/jpg.svg";
import pngIcon from "@/icons/png.svg";
import { ArrowRightLeft, Minimize2 } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const t = useTranslations("HomePage");
  const local = useLocale();

  return (
    <div className="w-full">
      <div className="w-full p-4 py-10 flex flex-col gap-3 items-center text-center bg-black text-white">
        <p className="md:text-4xl text-2xl font-bold capitalize">
          {local == "en" ? (
            <>
              {" "}
              {t("heroTitle").split("and")[0]}{" "}
              <span className="text-main-text">
                and
                {t("heroTitle").split("and")[1]}
              </span>
            </>
          ) : (
            <>
              {t("heroTitle").split("بين")[0]}{" "}
              <span className="text-main-text">
                {" "}
                بين
                {t("heroTitle").split("بين")[1]}
              </span>
            </>
          )}
        </p>
        <p className="text-sm opacity-85 lg:w-1/2 md:w-3/4 w-full">
          {t("heroDesc")}
        </p>
      </div>
      <div className="container mx-auto pt-8 flex flex-col gap-10 px-1">
        {/* Images Services */}
        <div className="flex flex-col gap-6">
          <p className="text-center text-4xl capitalize font-bold">
            {t("imageServices")}
          </p>

          <div className="grid md:grid-cols-2 grid-cols-1  gap-5 ">
            <ServiceCard
              icons={
                <div className="flex items-center gap-4">
                  <Image src={jpgIcon} alt="jpg ICON" className="w-16 h-16" />
                  <ArrowRightLeft />
                  <Image src={pngIcon} alt="png ICON" className="w-16 h-16" />
                </div>
              }
              title={t("imageConverter")}
              description={t("imageConverterDesc1")}
              secondDescription={t("imageConverterDesc2")}
              linkTitle={t("goToConverter")}
              linkUrl="/converter"
            />
            <ServiceCard
              icons={
                <div className="flex items-center justify-center w-12 p-2.5 h-12 bg-second-white rounded-full">
                  <Minimize2 className="w-12 h-12" />
                </div>
              }
              title={t("imageConverter")}
              description={t("imageConverterDesc1")}
              secondDescription={t("imageConverterDesc2")}
              linkTitle={t("goToConverter")}
              linkUrl="/compressor"
            />
          </div>
        </div>
        {/* PDF Services */}
        <div>
          <p className="text-center text-4xl capitalize font-bold">
            {t("imageServices")}
          </p>
        </div>
      </div>
    </div>
  );
}
