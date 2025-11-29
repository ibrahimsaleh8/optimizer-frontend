import ConverterAndOptimizer from "@/components/ConverterAndOptimizer/ConverterAndOptimizer";
import { Repeat } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function ConverterPage() {
  const t = await getTranslations("Converter");

  return (
    <div className="container mx-auto py-10 px-3 sm:px-1 flex flex-col gap-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Repeat /> {t("imageConverter")}
      </h1>

      <ConverterAndOptimizer type="converter" />
    </div>
  );
}
