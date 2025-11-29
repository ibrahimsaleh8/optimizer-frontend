import { Minimize2 } from "lucide-react";
import ConverterAndOptimizer from "@/components/ConverterAndOptimizer/ConverterAndOptimizer";
import { getTranslations } from "next-intl/server";

export default async function CompressorPage() {
  const t = await getTranslations("Compressor");
  return (
    <div className="container mx-auto py-10 px-3 sm:px-1 flex flex-col gap-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Minimize2 />
        {t("imageCompressor")}
      </h1>

      <ConverterAndOptimizer type="compressor" />
    </div>
  );
}
