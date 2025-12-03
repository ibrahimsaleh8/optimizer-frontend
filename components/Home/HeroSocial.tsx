"use client";

import { Facebook, Github, Linkedin, User } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipPanel,
} from "@/components/animate-ui/components/base/tooltip";
import { motion } from "motion/react";

export default function HeroSocial() {
  return (
    <div className="flex gap-10 justify-center flex-wrap py-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}>
        <Tooltip>
          <TooltipTrigger>
            <a
              target="_blank"
              href="https://my-portfolio-flax-seven-12.vercel.app/"
              className="w-11 h-11 flex items-center border-2 border-black hover:bg-transparent hover:text-black duration-500 justify-center bg-black text-white">
              <User />
            </a>
          </TooltipTrigger>
          <TooltipPanel className={"rounded-none"}>
            <p>Protfolio</p>
          </TooltipPanel>
        </Tooltip>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}>
        <Tooltip>
          <TooltipTrigger>
            <a
              target="_blank"
              href="https://www.facebook.com/ibrahim7saleh/"
              className="w-11 h-11 flex items-center border-2 border-black hover:bg-transparent hover:text-black duration-500 justify-center bg-black text-white">
              <Facebook />
            </a>
          </TooltipTrigger>
          <TooltipPanel className={"rounded-none"}>
            <p>Facebook</p>
          </TooltipPanel>
        </Tooltip>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}>
        <Tooltip>
          <TooltipTrigger>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/ibrahim-saleh-dev/"
              className="w-11 h-11 flex items-center border-2 border-black hover:bg-transparent hover:text-black duration-500 justify-center bg-black text-white">
              <Linkedin />
            </a>
          </TooltipTrigger>
          <TooltipPanel className={"rounded-none"}>
            <p>Linkedin</p>
          </TooltipPanel>
        </Tooltip>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}>
        <Tooltip>
          <TooltipTrigger>
            <a
              target="_blank"
              href="https://github.com/ibrahimsaleh8"
              className="w-11 h-11 flex items-center border-2 border-black hover:bg-transparent hover:text-black duration-500 justify-center bg-black text-white">
              <Github />{" "}
            </a>
          </TooltipTrigger>
          <TooltipPanel className={"rounded-none"}>
            <p>Github</p>
          </TooltipPanel>
        </Tooltip>
      </motion.div>
    </div>
  );
}
