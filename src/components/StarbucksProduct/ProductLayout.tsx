"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronsDown } from "lucide-react";

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function convertNameToLink(name: any) {
  return name
    .normalize("NFD") // Normalize to separate base characters and diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .toLowerCase() // Convert to lowercase
    .replace(/&/g, "and") // Replace & with and
    .replace(/[®™,.\s]+/g, "-") // Replace ®, ™, comma, dot, and spaces with hyphen
    .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}

const ProductLayout = ({ subItem, delay }: any) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const hasSize = subItem.size;
  const hasSizes = subItem.sizes && subItem.sizes.length > 0;

  const initialSize = hasSizes
    ? subItem.sizes.find((sizeOption: any) => sizeOption.size === "Tall") ||
      subItem.sizes[0]
    : null;

  const [selectedSize, setSelectedSize] = useState(initialSize);
  const link = convertNameToLink(subItem.name);

  console.log(link);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.3, delay }}
      className="flex gap-8 flex-col mb-8 md:mb-1 md:flex-row "
    >
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        transition={{ duration: 0.3, delay }}
        className="flex flex-row mb-6 items-center gap-5"
      >
        <Link
          href={`/articles/${link}`}
          aria-label={`Starbucks ${subItem.name}`}
        >
          <Image
            src={subItem.image}
            loading="lazy"
            decoding="async"
            alt={`Starbucks menu with prices featuring a ${subItem.name}`}
            width={130}
            height={140}
            className="rounded-full max-w-[140rem] max-h-[130px]"
          />
        </Link>
        <div>
          <Link
            href={`/articles/${link}`}
            aria-label={`Starbucks ${subItem.name}`}
          >
            {" "}
            <h1 className="text-xl mb-1 w-full md:w-[260px]">{subItem.name}</h1>
          </Link>
          <div className="w-44 flex gap-6 justify-between items-center">
            <Link
              href={`/articles/${link}`}
              aria-label={`Starbucks ${subItem.name}`}
            >
              <div className="h-full gap-1 font-bold flex justify-between flex-col">
                {hasSizes && (
                  <>
                    <h1>Size:</h1>
                    <h1 className="text-white">.</h1>
                  </>
                )}
                {(hasSize || subItem.size !== undefined) && <h1>Size:</h1>}
                {(hasSizes || subItem.calories !== undefined) && (
                  <h1>Calories:</h1>
                )}
                {(hasSizes || subItem.price !== undefined) && <h1>Price:</h1>}
              </div>
            </Link>
            <div className="flex flex-col gap-1">
              {hasSizes ? (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="w-fit cursor-pointer outline-none"
                    asChild
                  >
                    <div className="border justify-between w-[110px] flex gap-1 rounded-lg px-3">
                      {selectedSize.size} <ChevronsDown className="w-4" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mt-3">
                    <DropdownMenuLabel>Size Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={selectedSize.size}
                      onValueChange={(size) =>
                        setSelectedSize(
                          subItem.sizes.find((s: any) => s.size === size)
                        )
                      }
                    >
                      {subItem.sizes.map((sizeOption: any, index: any) => (
                        <DropdownMenuRadioItem
                          className="cursor-pointer outline-none"
                          key={index}
                          value={sizeOption.size}
                        >
                          {sizeOption.size}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null}
              {hasSizes && selectedSize ? (
                <Link
                  href={`/articles/${link}`}
                  aria-label={`Starbucks ${subItem.name}`}
                >
                  <span>{selectedSize.size2}</span>
                  <p>{selectedSize.calories}</p>
                  <p>{selectedSize.price}</p>
                </Link>
              ) : (
                <Link
                  href={`/articles/${link}`}
                  aria-label={`Starbucks ${subItem.name}`}
                >
                  {subItem.calories !== undefined && <p>{subItem.calories}</p>}
                  {subItem.size !== undefined && <p>{subItem.size}</p>}
                  {subItem.price !== undefined && <p>{subItem.price}</p>}
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductLayout;
