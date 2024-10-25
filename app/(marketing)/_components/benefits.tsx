'use client';

import Container from '@/components/shared/container';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Brain, Database, FileText, Scale, Shield } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      title: 'Unified Data Model',
      description:
        'Standardized data structures for seamless integration across agencies',
      icon: Database,
    },
    {
      title: 'Secure APIs',
      description:
        'Protected data exchange with robust authentication and encryption',
      icon: Shield,
    },
    {
      title: 'AI Data Insights',
      description:
        'Advanced analytics for data-driven decision making and policy formulation',
      icon: Brain,
    },
    {
      title: 'Metadata Management',
      description:
        'Comprehensive data cataloging for improved discoverability and understanding',
      icon: FileText,
    },
    {
      title: 'Compliance & Governance',
      description:
        'Ensure adherence to data protection regulations and government standards',
      icon: Scale,
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

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Container
              key={benefit.title}
              className="last:col-span-2"
              delay={index * 0.1}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="bg-secondary h-32 rounded-lg" />
                </CardHeader>
                <CardContent className="flex flex-col space-y-2 p-6">
                  <h3 className="flex items-center gap-5">
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
