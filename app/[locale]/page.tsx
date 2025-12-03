import { getTranslations } from "next-intl/server";
import HeroText from "@/components/Home/HeroText";
import HeroImages from "@/components/Home/HeroImages";
import HeroLinks from "@/components/Home/HeroLinks";
import HeroSocial from "@/components/Home/HeroSocial";

export default async function Home() {
  const t = await getTranslations("HomePage");
  return (
    <div
      style={{
        minHeight: "calc(100vh - 80px)",
      }}
      className="w-full bg-[#f8fafc] relative">
      {/* Bottom Fade Grid Background */}
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
      <div className="w-full container mx-auto pt-4 relative">
        <div className="w-full md:p-4 px-2 py-10 flex gap-16 text-black">
          <div className="w-full flex  justify-center items-center text-center flex-col gap-12">
            {/* Text */}
            <HeroText />
            {/* Images */}
            <HeroImages />

            {/* Links */}
            <HeroLinks optimizer={t("optimizer")} converter={t("converter")} />

            {/* Socials  */}
            <HeroSocial />
          </div>
        </div>
      </div>
    </div>
  );
}
