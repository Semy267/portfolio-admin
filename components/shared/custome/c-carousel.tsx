import * as React from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/carousel";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import CSkeleton from "./c-skeleton";

export const dotVariants = cva("absolute", {
  variants: {
    dotPosition: {
      outside: "top-18 left-1/2 -translate-x-1/2",
      "outside-left": "top-18 left-0",
      "outside-right": "top-18 right-0",
      inside: "bottom-0 left-1/2 -translate-x-1/2",
      "inside-left": "bottom-0 left-1",
      "inside-right": "bottom-0 right-1",
    },
  },
  defaultVariants: {
    dotPosition: "outside",
  },
});

export const arrowVariants = cva("absolute", {
  variants: {
    arrowPosition: {
      outside: "w-full h-fit -bottom-8 justify-between px-2",
      "outside-bottom": "-bottom-8",
      "outside-bottom-left": "-bottom-8 left-0",
      "outside-bottom-right": "-bottom-8 right-0",
      "outside-top-left": "-top-9 left-0",
      "outside-top-right": "-top-9 right-0",
      inside: "w-full h-fit bottom-1/2 translate-y-1/2 justify-between px-2",
      "inside-bottom-left": "bottom-2 left-1",
      "inside-bottom-right": "bottom-2 right-1",
      "inside-top-left": "top-1 left-1",
      "inside-top-right": "top-1 right-1",
    },
  },
  defaultVariants: {
    arrowPosition: "inside",
  },
});

type ICarouselProps = CCarousel &
  VariantProps<typeof dotVariants> &
  VariantProps<typeof arrowVariants>;
export default function CCarousel({
  dotPosition,
  arrowPosition,
  showArrow,
  showDots,
  children,
  current = 0,
  setCurrent,
  item,
  render,
  isLoading,
  width,
}: ICarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent && setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent && setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: "center",
        loop: true,
      }}
      className={"w-full relative"}
    >
      <CarouselContent>
        {children ? (
          children
        ) : (
          <>
            {isLoading &&
              Array.from({ length: 6 }).map((_, id) => (
                <CarouselItem key={id} className={width}>
                  <CSkeleton
                    length={1}
                    className={cn("w-full h-full *:rounded-[4px]")}
                  />
                </CarouselItem>
              ))}
            {React.Children.toArray(
              item?.map((item, id) => (
                <CarouselItem className={width} key={id}>
                  {render?.(item, id)}
                </CarouselItem>
              )),
            )}
          </>
        )}
      </CarouselContent>
      {showDots && (
        <div
          className={cn(
            "py-2 text-center text-sm text-muted-foreground",
            dotVariants({ dotPosition }),
          )}
        >
          Slide {current + 1} of {count}
        </div>
      )}

      {showArrow && (
        <div
          className={cn(
            "size-fit flex gap-1",
            arrowVariants({ arrowPosition }),
          )}
        >
          <CarouselPrevious />
          <CarouselNext />
        </div>
      )}
    </Carousel>
  );
}
