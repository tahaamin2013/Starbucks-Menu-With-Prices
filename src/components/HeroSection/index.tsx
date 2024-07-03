import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const HeroSection = () => {
  return (
    <div className="flex flex-col md:flex-row py-[40px] md:pl-[90px] justify-between items-center">
      <div className="w-fit md:w-[530px]">
        <h1 className="font-bold text-gray-900 text-4xl">
          Starbucks is a resturant and loram lorem ok
        </h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi
          sequi, nemo illum quae nam aspernatur non repellendus fugiat
          praesentium corrupti?
        </p>
        <button className="px-5 py-3 bg-primary text-white font-bold rounded-full mt-4">
          View Details
        </button>
        <button className="px-5 py-2.5 ml-4 bg-white border-primary border-2 text-black font-bold rounded-full mt-4">
          View Full Menu
        </button>
      </div>
      <div className="ml-0 md:mt-0 mt-5 md:ml-6">
        <Image
          className="rounded-full shadow-glow shadow-primary"
          src="/Bacon, Gouda & Egg Sandwich.avif"
          alt=""
          width={270}
          height={270}
        />
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="w-full ml-6 mt-5 max-w-sm"
      >
        <CarouselContent className="-mt-1 h-[300px]">
          <CarouselItem className="pt-1  md:basis-1/3">
            <div className="bg-white text-lg shadow-lg flex gap-3  border rounded-r items-center rounded-full px-4 ml-[30px] py-2">
              <Image
                className="rounded-full "
                src="/Bacon, Gouda & Egg Sandwich.avif"
                alt=""
                width={70}
                height={70}
              />
              Bacon, Gouda & Egg Sandwich
            </div>
          </CarouselItem>
          <CarouselItem className="pt-1  md:basis-1/3">
            <div className="bg-white text-lg shadow-lg flex gap-3  border rounded-r items-center rounded-full ml-[90px] px-4 py-2">
              <Image
                className="rounded-full "
                src="/Bacon, Gouda & Egg Sandwich.avif"
                alt=""
                width={70}
                height={70}
              />
              Bacon, Gouda & Egg Sandwich
            </div>
          </CarouselItem>
          <CarouselItem className="pt-1  md:basis-1/3">
            <div className="bg-white text-lg shadow-lg flex gap-3  border rounded-r items-center rounded-full px-4 py-2">
              <Image
                className="rounded-full "
                src="/Bacon, Gouda & Egg Sandwich.avif"
                alt=""
                width={70}
                height={70}
              />
              Bacon, Gouda & Egg Sandwich
            </div>
          </CarouselItem>
          <CarouselItem className="pt-1  md:basis-1/3">
            <div className="bg-white text-lg shadow-lg flex gap-3  border rounded-r items-center rounded-full ml-[90px] px-4 py-2">
              <Image
                className="rounded-full "
                src="/Bacon, Gouda & Egg Sandwich.avif"
                alt=""
                width={70}
                height={70}
              />
              Bacon, Gouda & Egg Sandwich
            </div>
          </CarouselItem>
          <CarouselItem className="pt-1  md:basis-1/3">
            <div className="bg-white text-lg shadow-lg flex gap-3  border rounded-r items-center rounded-full px-4 py-2">
              <Image
                className="rounded-full "
                src="/Bacon, Gouda & Egg Sandwich.avif"
                alt=""
                width={70}
                height={70}
              />
              Bacon, Gouda & Egg Sandwich
            </div>
          </CarouselItem>
          <CarouselItem className="pt-1  md:basis-1/3">
            <div className="bg-white text-lg shadow-lg flex gap-3  border rounded-r items-center rounded-full px-4 py-2">
              <Image
                className="rounded-full "
                src="/Bacon, Gouda & Egg Sandwich.avif"
                alt=""
                width={70}
                height={70}
              />
              Bacon, Gouda & Egg Sandwich
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HeroSection;
