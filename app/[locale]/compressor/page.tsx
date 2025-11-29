"use client";
import { Minimize2 } from "lucide-react";
import { useTranslations } from "use-intl";
import ConverterAndOptimizer from "@/components/ConverterAndOptimizer/ConverterAndOptimizer";

export default function CompressorPage() {
  const t = useTranslations();
  return (
    <div className="container mx-auto py-10 px-3 sm:px-1 flex flex-col gap-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Minimize2 />
        {t("Compressor.imageCompressor")}
      </h1>

      <ConverterAndOptimizer type="compressor" />
    </div>
  );
}
