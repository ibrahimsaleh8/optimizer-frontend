"use client";
import { TextAnimate } from "../ui/text-animate";
import { TypingAnimation } from "../ui/typing-animation";
import { useTranslations } from "next-intl";

export default function HeroText() {
  const t = useTranslations("HomePage");
  return (
    <>
      <TypingAnimation
        className="font-bold md:text-7xl sm:text-5xl text-4xl"
        as={"p"}>
        {t("heroTitle")}
      </TypingAnimation>
      <TextAnimate delay={0.3} className="sm:text-lg text-sm lg:w-1/2" as={"p"}>
        {t("heroDesc")}
      </TextAnimate>
    </>
  );
}
