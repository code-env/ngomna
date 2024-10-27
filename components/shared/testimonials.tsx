import React from "react";
import Container from "./container";
import Marquee from "../ui/marquee";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const Testimonials = () => {
  return (
    <div className="flex-1 overflow-x-clip">
      <Container>
        <div className="w-full relative">
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s] select-none">
              {Array.from({ length: 5 }).map((_, index) => (
                <figure
                  key={index}
                  className={cn(
                    "relative w-96 cursor-pointer overflow-hidden rounded-xl border p-4 flex flex-col gap-2",
                    "border-border/10 bg-card backdrop-blur-lg"
                  )}
                >
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        className="w-6 h-6 fill-primary stroke-none"
                        key={index}
                      />
                    ))}
                  </div>
                  <blockquote className="mt-2 text-lg">
                    "Partnering with Vroum has brought so many new customers to
                    our auto repair shop. The promotional tools are easy to use
                    and highly effective."
                  </blockquote>
                  <figcaption className="mt-4 text-lg font-medium">
                    @paulbiya
                  </figcaption>
                </figure>
              ))}
            </Marquee>
            <Marquee
              pauseOnHover
              reverse
              className="[--duration:20s] select-none"
            >
              {Array.from({ length: 5 }).map((_, index) => (
                <figure
                  key={index}
                  className={cn(
                    "relative w-96 cursor-pointer overflow-hidden rounded-xl border p-4 flex flex-col gap-2",
                    "border-border/10 bg-card backdrop-blur-lg"
                  )}
                >
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        className="w-6 h-6 fill-primary stroke-none"
                        key={index}
                      />
                    ))}
                  </div>
                  <blockquote className="mt-2 text-lg">
                    "Partnering with Vroum has brought so many new customers to
                    our auto repair shop. The promotional tools are easy to use
                    and highly effective."
                  </blockquote>
                  <figcaption className="mt-4 text-lg font-medium">
                    @paulbiya
                  </figcaption>
                </figure>
              ))}
            </Marquee>
          </div>
          <div
            className="w-20 bg-gradient-to-r absolute left-0 top-0 h-full from-muted to-transparent
          "
          />
          <div
            className="w-20 bg-gradient-to-l absolute right-0 top-0 h-full from-muted to-transparent
          "
          />
        </div>
      </Container>
    </div>
  );
};

export default Testimonials;
