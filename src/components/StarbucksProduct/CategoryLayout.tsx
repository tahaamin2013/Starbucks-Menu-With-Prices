"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CategoryLayout = ({ item, delay, key }: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.a
      ref={ref}
      initial="hidden"
      href={item.link}
      aria-label={`Starbucks ${item.name}`}
      key={key}
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.3, delay }}
      className="flex gap-8 flex-col md:flex-row items-left text-left"
    >
      <Image
        loading="lazy"
        decoding="async"
        src={item.image}
        alt={`Starbucks ${item.name} Image`}
        width={120}
        height={120}
        className="rounded-full"
      />
      <h3 className="text-xl">{item.name}</h3>
    </motion.a>
  );
};

export default CategoryLayout;
