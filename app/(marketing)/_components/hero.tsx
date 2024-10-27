import { Button } from "@/components/ui/button";
import Image from "next/image";
import heroImage from "@/public/hero.png";
import { ContainerScroll } from "./container-scroll";
import Container from "@/components/shared/container";

const Hero = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <Container>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Verify with Confidence . Drive with{" "}
                <span className="bg-primary text-primary-foreground rounded-xl px-4">
                  Safety
                </span>
                .
              </h1>
            </Container>
            <Container delay={0.3}>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Secure, efficient, and convenient license management for
                Cameroon's drivers.
              </p>
            </Container>
          </div>
          <div className="space-x-4 flex">
            <Container delay={0.5}>
              <Button className="bg-primary text-primary-foreground">
                Get Started
              </Button>
            </Container>
            <Container delay={0.7}>
              <Button variant="outline">Learn More</Button>
            </Container>
          </div>
        </div>
        <Container>
          <ContainerScroll>
            <div className="max-w-4xl relative h-[500px] mx-auto w-full mt-20 rounded-xl overflow-hidden p-4 bg-muted/50 backdrop-blur-lg border">
              <div className="relative size-full rounded-lg overflow-hidden">
                <Image
                  src={heroImage}
                  alt="Hero Image"
                  placeholder="blur"
                  priority
                  fill
                  className="size-full"
                />
              </div>
            </div>
          </ContainerScroll>
        </Container>
      </div>
    </section>
  );
};

export default Hero;
