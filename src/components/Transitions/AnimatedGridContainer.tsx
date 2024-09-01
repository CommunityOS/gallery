"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const AnimatedContainer = ({ className, children }: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        className={className}
        variants={{
          enter: {
            transition: {
              staggerChildren: 1,
              delayChildren: 1,
            },
          },
          exit: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
          },
        }}
        initial="exit"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
