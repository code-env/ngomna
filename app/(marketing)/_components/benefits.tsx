"use client";

import Container from "@/components/shared/container";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, Shield, Smartphone } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      title: "Online Application & Renewal",
      description: "Apply for or renew your license from anywhere, anytime.",
      icon: Smartphone,
    },
    {
      title: "Biometric Security",
      description:
        "Advanced biometric features ensure your license is secure and unique to you.",
      icon: Shield,
    },
    {
      title: "Real-time Verification",
      description:
        "Instant verification for law enforcement and other authorized entities.",
      icon: Clock,
    },
  ];
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <Container>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Key Benefits
          </h2>
        </Container>

        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit, index) => (
            <Container
              key={benefit.title}
              className="first:row-span-2"
              delay={index * 0.1}
            >
              <Card className="h-full flex flex-col">
                <CardHeader className="flex-1">
                  <div className="bg-secondary size-full min-h-20 rounded-lg" />
                </CardHeader>
                <CardContent className="flex flex-col space-y-2 p-6">
                  <h3 className="flex items-center gap-5 text-xl font-semibold">
                    <benefit.icon className="size-6 text-primary" />
                    <span>{benefit.title}</span>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </Container>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
