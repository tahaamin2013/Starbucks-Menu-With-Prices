"use client";

import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Menu } from "@/lib/menuItems";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(
    Menu[0].items[0].subItems[0].products[0]
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y" });

  const allProducts = Menu.flatMap((category) =>
    category.items.flatMap((item) =>
      item.subItems.flatMap((subItem) => subItem.products)
    )
  );

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

  return (
    <div className="flex pb-[100px] border-b flex-col md:flex-row py-[40px] md:pl-[90px] justify-between items-center">
      <div className="w-fit md:w-[530px]">
        <motion.h1
          className="font-bold text-gray-900 mb-3 text-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {selectedProduct.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {selectedProduct.description}
        </motion.p>
      </div>
      <motion.div
        className="ml-0 md:mt-0 mt-5 md:ml-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Image
          className="rounded-full shadow-glow shadow-primary"
          src={selectedProduct.image}
          alt={`${selectedProduct.name} Image`}
          width={455}
          height={455}
        />
      </motion.div>
      <div className="flex flex-col items-center justify-center w-[35rem]">
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
                      width={100}
                      height={100}
                    />
                    {product.name}
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
  );
};

export default HeroSection;
