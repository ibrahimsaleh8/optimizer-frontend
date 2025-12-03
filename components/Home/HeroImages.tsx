"use client";
import pngIcon from "@/icons/PNG.png";
import jpgIcon from "@/icons/JPG.png";
import gifIcon from "@/icons/GIF.png";
import webpIcon from "@/icons/WEBP.png";
import avifIcon from "@/icons/avif.png";
import { ArrowRightLeft } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
export default function HeroImages() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="flex items-center justify-center md:gap-6 gap-4 flex-wrap">
      <Image
        loading="eager"
        src={pngIcon}
        alt="png Icon"
        className="md:w-20 md:h-20 w-14 h-14"
      />
      <ArrowRightLeft className="md:w-12 md:h-12 w-6 h-6" />
      <Image
        src={jpgIcon}
        loading="eager"
        alt="png Icon"
        className="md:w-20 md:h-20 w-14 h-14"
      />
      <ArrowRightLeft className="md:w-12 md:h-12 w-6 h-6" />
      <Image
        src={avifIcon}
        alt="png Icon"
        loading="eager"
        className="md:w-20 md:h-20 w-14 h-14"
      />
      <ArrowRightLeft className="md:w-12 md:h-12 w-6 h-6" />
      <Image
        src={gifIcon}
        loading="eager"
        alt="png Icon"
        className="md:w-20 md:h-20 w-14 h-14"
      />
      <ArrowRightLeft className="md:w-12 md:h-12 w-6 h-6" />
      <Image
        src={webpIcon}
        loading="eager"
        alt="png Icon"
        className="md:w-20 md:h-20 w-14 h-14"
      />
    </motion.div>
  );
}
