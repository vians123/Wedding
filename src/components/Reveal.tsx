"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  mode = "item",
  childrenDelay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  mode?: "item" | "stagger";
  childrenDelay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const variants =
    mode === "stagger"
      ? ({
          hidden: containerVariants.hidden,
          visible: {
            transition: {
              staggerChildren: 0.08,
              delayChildren: childrenDelay,
            },
          },
        } satisfies Variants)
      : itemVariants;

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration: 0.9,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export const revealItemVariants = itemVariants;

