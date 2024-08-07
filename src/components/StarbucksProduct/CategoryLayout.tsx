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
    <Link
      href={item.link}
      aria-label={`Starbucks ${item.name}`}
      key={key}
      className="w-fit"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 0.3, delay }}
        className="flex flex-row items-center gap-5"
      >
          <Image
            loading="lazy"
            src={item.image}
            alt={`Starbucks ${item.name} Image`}
            width={120}
            height={120}
            className="rounded-full"
          />
          <h3 className="text-xl w-full">{item.name}</h3>
      </motion.div>
    </Link>
  );
};

export default CategoryLayout;
