import { Minimize2 } from "lucide-react";
import ConverterAndOptimizer from "@/components/ConverterAndOptimizer/ConverterAndOptimizer";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Compressor");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function CompressorPage() {
  const t = await getTranslations("");
  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
      className="w-full bg-[#f8fafc] relative">
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
      <div className="container mx-auto py-10 px-3 sm:px-1 flex flex-col gap-6 relative">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <Minimize2 className="w-5 h-5" />
            {t("Compressor.imageCompressor")}
          </h1>
          <p className="text-lg pl-5">{t("Compressor.compressDesc1")}</p>
          <p className="text-lg pl-5">{t("Converter.imagesAccepted")}</p>
        </div>

        <ConverterAndOptimizer type="compressor" />
      </div>
    </div>
  );
}
