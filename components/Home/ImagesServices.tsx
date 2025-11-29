import photoIcon from "@/icons/photo.svg";
import { ArrowRightLeft, Minimize2 } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import ServiceCard from "@/components/ServiceCard";
type Props = {
  t: Awaited<ReturnType<typeof getTranslations>>;
};

export default function ImagesServices({ t }: Props) {
  return (
    <div className="flex flex-col gap-10">
      <div className="text-center text-4xl capitalize font-bold flex items-center gap-3 justify-center">
        <span className="block w-96 h-1 bg-black"></span>
        <p className="px-10">{t("imageServices")}</p>
        <span className="block w-96 h-1 bg-black"></span>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
        <ServiceCard
          icons={
            <div className="flex items-center gap-4">
              <Image
                loading="eager"
                src={photoIcon}
                alt="photoIcon"
                className="w-10 h-10"
              />
              <ArrowRightLeft className="w-6 h-6" />
              <Image
                loading="eager"
                src={photoIcon}
                alt="photoIcon"
                className="w-10 h-10"
              />
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
          title={t("imageCompressor")}
          description={t("imageCompressorDesc1")}
          secondDescription={t("imageConverterDesc2")}
          linkTitle={t("goToCompressor")}
          linkUrl="/compressor"
        />
      </div>
    </div>
  );
}
