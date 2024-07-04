import React, { useMemo } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
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
    <div className="md:hidden flex px-14">
      <Carousel className="max-w-full">
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
                  width={400}
                  height={400}
                />
                <h1 className="font-bold text-2xl mt-1">{product.name}</h1>
                <p className="text-base">{product.description}</p>
                <Link href={`/articles/${link}`} className="w-full">
                  <Button className="text-white rounded-full w-full duration-500 transition-all">
                    View Product
                  </Button>
                </Link>
                <Goy
                  id="Menu"
                  classname="bg-primary text-white w-full rounded-full text-sm py-2"
                >
                  View Full Menu
                </Goy>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default MobileHerosection;