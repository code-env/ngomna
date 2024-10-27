import Container from "@/components/shared/container";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Problem = () => {
  const problems = [
    {
      title: "Traditional Paper-Based Licenses",
      description: [
        "High risk of forgery and fraud",
        "Time-consuming application and renewal processes",
        "Difficulty in real-time verification",
        "Inefficient record-keeping and management",
      ],
    },
    {
      title: "Inefficient Record-Keeping",
      description: [
        "Manual record-keeping processes",
        "Inadequate data security",
        "Inefficient data management",
        "Limited data accessibility",
      ],
    },
    {
      title: "Inadequate Verification Processes",
      description: [
        "Inefficient verification methods",
        "Limited real-time verification",
        "High risk of fraud and forgery",
        "Inadequate data security",
      ],
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="space-y-2">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="h-96 w-[500px] relative">
                <Image
                  src="/placeholder.svg"
                  fill
                  alt="Traditional licensing issues"
                  className="mx-auto rounded-lg object-cover"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">
                  The Problem with Traditional Licensing
                </h3>
                <div>
                  <Accordion type="single" collapsible className="w-full">
                    {problems.map((problem, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="hover:bg-secondary transition-all duration-300 hover:px-4"
                      >
                        <AccordionTrigger className="font-semibold text-2xl">
                          {problem.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="flex flex-col gap-3 list-disc list-inside pl-4">
                            {problem.description.map((desc, i) => (
                              <li key={i}>{desc}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;
