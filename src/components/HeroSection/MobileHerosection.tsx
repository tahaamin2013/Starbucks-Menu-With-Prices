import React, { useMemo } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carouselformobile";
import { Menu } from "@/lib/menuItems";
import { Button } from "../ui/button";
import Link from "next/link";
import Goy from "../goy";

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

// Fisher-Yates shuffle algorithm
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const MobileHerosection = () => {
  const allProducts = useMemo(() => {
    const products = Menu.flatMap((category) =>
      category.items.flatMap((item) =>
        item.subItems.flatMap((subItem) => subItem.products)
      )
    );
    return shuffleArray([...products]); // Create a shuffled copy of the products array
  }, []); // Empty dependency array means this will only run once when the component mounts

  return (
    <Carousel className="max-w-full mb-6 lg:hidden  block overflow-hidden">
      <div className="w-[300px] absolute -left-[13rem] -bottom-0 h-[300px] bg-orange-300 rounded-full blur-3xl" />
      <div className="w-[400px] absolute -right-[13rem] top-[10px] h-[307px] bg-[#C0E8A6] rounded-full blur-2xl" />

      <CarouselContent>
        {allProducts.map((product, index) => {
          const link = convertNameToLink(product.name);
          console.log(link);
          return (
            <CarouselItem
              key={product.link}
              className="pt-1 items-center flex gap-2 flex-col justify-center text-center"
            >
              <Image
                className="rounded-full w-[12rem]"
                src={product.image}
                alt={product.name}
                loading="lazy"
                width={400}
                height={400}
              />
              <div className="flex flex-col gap-5 justify-between w-full items-center px-10">
                <span className="font-bold text-2xl mt-1">{product.name}</span>
                <p className="text-base px-10">{product.description}</p>
                <Link
                  href={`/articles/${link}`}
                  className="w-full text-white rounded-full bg-primary py-3 text-lg duration-500 transition-all"
                >
                  View Price & Calories
                </Link>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default MobileHerosection;
