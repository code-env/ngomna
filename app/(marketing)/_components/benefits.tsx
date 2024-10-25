import { Card, CardContent } from '@/components/ui/card';
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
      <div className="container px-4 md:px-6 ">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Key Benefits
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map(benefit => (
            <Card key={benefit.title}>
              <CardContent className="flex flex-col items-center space-y-2 p-6">
                <benefit.icon className="h-12 w-12 text-primary" />
                <h3 className="text-lg font-bold text-center">
                  {benefit.title}
                </h3>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
