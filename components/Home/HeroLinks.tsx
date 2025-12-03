"use client";

import { ArrowRightLeft, Minimize2 } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
type Props = {
  converter: string;
  optimizer: string;
};
export default function HeroLinks({ converter, optimizer }: Props) {
  return (
    <div className="flex items-center gap-10 flex-wrap justify-center mt-3">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="w-fit">
        <Link
          className="px-8 capitalize hover:bg-black hover:text-white duration-300 black-shadow py-4 flex items-center justify-center gap-3 bg-white text-black border-3 border-black w-52 font-bold"
          href={"/converter"}>
          <ArrowRightLeft className="w-5 h-5" />
          {converter}
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="w-fit">
        <Link
          className="px-8 capitalize hover:bg-black hover:text-white duration-300 black-shadow py-4 flex items-center justify-center gap-3 bg-white text-black border-3 border-black w-52 font-bold"
          href={"/compressor"}>
          <Minimize2 className="w-5 h-5" />
          {optimizer}
        </Link>
      </motion.div>
    </div>
  );
}
