"use client";

import Image from "next/image";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Menu } from "@/lib/menuItems";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import MobileHerosection from "./MobileHerosection";
import Link from "next/link";
import GoyButtonforHeroSection from "../GoyButtonforHeroSection";
import Goy from "../goy";

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(
    Menu[0].items[0].subItems[0].products[0]
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y" });

  const allProducts = useMemo(() => {
    const products = Menu.flatMap((category) =>
      category.items.flatMap((item) =>
        item.subItems.flatMap((subItem) => subItem.products)
      )
    );
    return shuffleArray([...products]); // Create a shuffled copy of the products array
  }, []); // Empty dependency array means this will only run once when the component mounts

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index);
      }
    },
    [emblaApi]
  );

  const handleProductClick = useCallback(
    (product: any, index: number) => {
      setSelectedProduct(product);
      setCurrentIndex(index);
      scrollTo(index);
    },
    [scrollTo]
  );

  const handleNextSlide = useCallback(() => {
    if (emblaApi && canScrollNext) {
      emblaApi.scrollNext();
    }
  }, [emblaApi, canScrollNext]);

  const handlePreviousSlide = useCallback(() => {
    if (emblaApi && canScrollPrev) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi, canScrollPrev]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    const currentIndex = emblaApi.selectedScrollSnap();
    setCurrentIndex(currentIndex);
    setSelectedProduct(allProducts[currentIndex]);
  }, [emblaApi, allProducts]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", onSelect);
      onSelect();
    }
  }, [emblaApi, onSelect]);

  function convertNameToLink(name: any) {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[®™,.\s]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  const link = convertNameToLink(selectedProduct.name);

  return (
    <section className="">
      <div className="lg:hidden sm:block text-center px-6 my-8">
        <header>
          <motion.h1
            className="font-bold text-gray-900 mb-4 text-5xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }} // Adjust the duration to make it faster
          >
            Starbucks Menu With Prices 2024
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.1 }} // Adjust the duration to make it faster
          >
            Starbucks offers a diverse menu, including espresso, coffee, tea,
            bakery items, breakfast, and lunch options. In addition to their
            specialty coffee drinks, they also provide a selection of snacks and
            baked goods for those seeking a quick bite.
          </motion.p>
        </header>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GoyButtonforHeroSection
            id="Menu"
            classname="bg-transparent border-2 text-primary border-primary hover:!text-primary w-full rounded-full text-sm py-2 mt-5"
          >
            View Full Menu
          </GoyButtonforHeroSection>
        </motion.div>
      </div>
      <MobileHerosection />
      <div className="md:flex hidden pb-[50px] border-b flex-col md:flex-row py-[40px] justify-between items-center">
        <div className="md:pl-[90px] xl:pl-[40px] pr-12 bg-emerald-400 lg:block hidden">
          <div className="md:w-[530px]">
            <motion.span
              className="font-bold text-6xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Starbucks Menu With Prices 2024
            </motion.span>
            <motion.p
              className="mt-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Starbucks offers a diverse menu, including espresso, coffee, tea,
              bakery items, breakfast, and lunch options. In addition to their
              specialty coffee drinks, they also provide a selection of snacks
              and baked goods for those seeking a quick bite.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GoyButtonforHeroSection
                id="Menu"
                classname="bg-transparent border-4 text-primary border-primary w-[11rem] rounded-full duration-500 transition-all mt-8"
              >
                View Full Menu
              </GoyButtonforHeroSection>
            </motion.div>
          </div>
        </div>

        <div className="flex bg-blue-300 w-full justify-end">
          <div className="text-center flex flex-col items-center justify-center gap-3">
            <motion.div
              className="ml-0 md:mt-0 mt-5 md:ml-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Link href={`/articles/${link}`}>
                <Image
                  className="rounded-full max-w-[280px] shadow-glow shadow-primary"
                  src={selectedProduct.image}
                  alt={`${selectedProduct.name} Image`}
                  width={425}
                  height={425}
                  loading="lazy"
                />
              </Link>
            </motion.div>
            <div className="mt-2 flex w-full items-center justify-center flex-col">
              <Link href={`/articles/${link}`}>
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-bold max-w-xs mb-3 text-2xl line-clamp-2 h-[60px]"
                >
                  {selectedProduct.name}
                </motion.span>
              </Link>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-2"
              >
                <Link href={`/articles/${link}`}>
                  <Button className="text-white rounded-full duration-500 transition-all">
                    View Price & Calories
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <button
              onClick={handlePreviousSlide}
              className={`mb-2 ${
                canScrollPrev ? "bg-primary hover:bg-primary/80" : "bg-gray-300"
              } rounded-full`}
              disabled={!canScrollPrev}
            >
              <ArrowRight className="h-8 text-white w-8 p-2 -rotate-90" />
            </button>

            <div
              className="w-full ml-6 mt-5 max-w-sm overflow-hidden"
              ref={emblaRef}
            >
              <div className="-mt-1 h-[370px]">
                {allProducts.map((product, index) => {
                  let marginLeftClass = "";
                  switch (index % 3) {
                    case 0:
                      marginLeftClass = "pl-[40px]";
                      break;
                    case 1:
                      marginLeftClass = "pl-[80px]";
                      break;
                    case 2:
                      marginLeftClass = "";
                      break;
                  }

                  return (
                    <div
                      key={product.link}
                      className={`pt-1 md:basis-1/3 ${marginLeftClass}`}
                    >
                      <button
                        onClick={() => handleProductClick(product, index)}
                        className={`${
                          product === selectedProduct
                            ? "bg-primary text-white"
                            : "bg-white"
                        } w-full text-left text-xl shadow-lg flex gap-3 rounded-r items-center rounded-full px-4 py-2`}
                      >
                        <Image
                          className="rounded-full"
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          width={100}
                          height={100}
                        />
                        <span>{product.name}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <button
              onClick={handleNextSlide}
              className={`mt-4 ${
                canScrollNext ? "bg-primary hover:bg-primary/80" : "bg-gray-300"
              } rounded-full`}
              disabled={!canScrollNext}
            >
              <ArrowRight className="h-8 text-white w-8 p-2 rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
