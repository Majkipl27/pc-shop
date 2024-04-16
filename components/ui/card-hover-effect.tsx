"use client";

import { cn } from "@lib/utils";
import { AnimatePresence, animate, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    image?: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("flex flex-wrap justify-center py-10", className)}>
      {items.map((item, idx) => (
        <Link
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-[400px] w-1/3"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card image={item.image}>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </Link>
      ))}
    </div>
  );
};

const variants1 = {
  initial: {
    filter: "blur(0) grayscale(1)",
    scale: 1,
  },
  animate: {
    filter: "blur(24px) grayscale(0)",
    scale: 1.05,
    transition: {
      duration: 0.5,
    },
  },
};

export const Card = ({
  className,
  children,
  image,
}: {
  className?: string;
  children: React.ReactNode;
  image?: string;
}) => {
  return (
    <motion.div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-background border border-black/[0.1] dark:border-white/[0.2] relative z-20",
        className
      )}
      initial="initial"
      whileHover="animate"
    >
      {image && (
        <motion.img
          variants={variants1}
          src={image}
          alt=""
          className="absolute inset-0 -z-10 w-[300px] m-auto"
        />
      )}
      <div className="relative z-50 h-full">
        <div className="p-4 h-full flex flex-col justify-end">{children}</div>
      </div>
    </motion.div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "font-bold text-zinc-200 tracking-wide mt-4 bg-black/40 p-1 w-fit rounded-lg",
        className
      )}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-4 text-zinc-200 bg-black/40 p-1 rounded-lg tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
