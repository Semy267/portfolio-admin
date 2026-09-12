"use client";
import CCarousel from "@/components/shared/custome/c-carousel";
import { CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function DemoCarousel() {
  const [current, setCurrent] = useState(1);
  const [current2, setCurrent2] = useState(1);
  return (
    <>
      <CCarousel
        showArrow
        showDots
        arrowPosition={"outside-bottom-right"}
        current={current}
        setCurrent={setCurrent}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 h-20">
            <div
              className={cn("p-5 bg-red-600", {
                "bg-neutral-400!": index == current,
              })}
            >
              <span className="text-3xl font-semibold">{index + 1}</span>
            </div>
          </CarouselItem>
        ))}
      </CCarousel>
      <CCarousel current={current2} setCurrent={setCurrent2}>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 lg:basis-1/3 h-40 flex items-center w-full"
          >
            <div
              className={cn("p-5 bg-red-600 size-full", {
                "bg-neutral-400!": current2 == index,
                "opacity-50 h-20": current2 != index,
              })}
            >
              <span className="text-3xl font-semibold">{index + 1}</span>
            </div>
          </CarouselItem>
        ))}
      </CCarousel>
      <CCarousel
        isLoading
        width="basis-1/2"
        item={Array.from({ length: 5 })}
        render={(_, id) => (
          <div key={id} className={cn("bg-red-600 w-full h-40")} />
        )}
      />
    </>
  );
}
