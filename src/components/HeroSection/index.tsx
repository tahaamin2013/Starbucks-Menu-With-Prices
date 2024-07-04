'use client'

import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Menu } from "@/lib/menuItems";

const HeroSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(
    Menu[0].items[0].subItems[0].products[0]
  );

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

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
        <motion.button
          className="px-5 py-3 bg-primary text-white font-bold rounded-full mt-4"
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          View Details
        </motion.button>
        <motion.button
          className="px-5 py-2.5 ml-4 bg-white border-primary border-2 text-black font-bold rounded-full mt-4"
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          View Full Menu
        </motion.button>
      </div>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          className="ml-0 md:mt-0 mt-5 md:ml-6"
          key={selectedProduct.image}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              className="rounded-full shadow-glow shadow-primary"
              src={selectedProduct.image}
              alt={`${selectedProduct.name} Image`}
              width={415}
              height={415}
              layout="fixed"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <Carousel
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="w-full ml-6 mt-5 max-w-sm"
      >
        <CarouselContent className="-mt-1 h-[400px]">
          {Menu.map((category) =>
            category.items.map((item) =>
              item.subItems.map((subItem) =>
                subItem.products.map((product, index) => (
                  <CarouselItem
                    key={product.link}
                    className="pt-1 md:basis-1/3"
                  >
                    <motion.button
                      onClick={() => handleProductClick(product)}
                      className={`${
                        product === selectedProduct
                          ? "bg-primary text-white"
                          : "bg-white"
                      } w-full text-left text-xl shadow-lg flex gap-3 rounded-r items-center rounded-full px-4 py-2 ml-[${index === 0 ? "20px" : index === 1 ? "70px" : "40px"}]`}
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Image
                        className="rounded-full"
                        src={product.image}
                        alt={product.name}
                        width={100}
                        height={100}
                      />
                      {product.name}
                    </motion.button>
                  </CarouselItem>
                ))
              )
            )
          )}
        </CarouselContent>
        <CarouselPrevious className="mt-2" />
        <CarouselNext className="mb-4" />
      </Carousel>
    </div>
  );
};

export default HeroSection;

