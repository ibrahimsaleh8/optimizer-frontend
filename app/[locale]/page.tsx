import ImagesServices from "@/components/Home/ImagesServices";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("HomePage");

  return (
    <div className="w-full">
      <div className="w-full p-4 py-10 flex flex-col gap-3 items-center text-center  text-black">
        <p className=" text-5xl font-bold capitalize">{t("heroTitle")}</p>
        <p className="text-sm opacity-85 lg:w-1/2 md:w-3/4 w-full">
          {t("heroDesc")}
        </p>
      </div>
      <div className="container mx-auto pt-8 flex flex-col gap-16 px-1">
        {/* Images Services */}
        <ImagesServices t={t} />
        {/* PDF Services */}
        <div className="text-center text-4xl capitalize font-bold flex items-center gap-3 justify-center">
          <span className="block w-96 h-1 bg-black"></span>
          <p className="px-10">PDF Services</p>
          <span className="block w-96 h-1 bg-black"></span>
        </div>
      </div>
    </div>
  );
}
