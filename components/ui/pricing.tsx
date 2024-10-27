'use client';

import Testimonials from '@/components/shared/testimonials';
import axios from 'axios';
import {useRouter} from "next/navigation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';


export default function VroumPricing({params}:{params:{userId:string, email:string}}) {
  const [mounted, setMounted] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>(
    'monthly'
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter()
  const pricingPlans = [
    {
      name: 'Basic',
      description: 'Essential features for individual users',
      price: { monthly: 'Free', annually: 'Free' },
      features: [
        'Digital license issuance',
        'Renewal reminders',
        'Basic support',
        'Access to partner discounts',
      ],
    },
    {
      name: 'Pro',
      description: 'Advanced features for power users',
      price: { monthly: '5,000', annually: '50,000' },
      features: [
        'All Basic features',
        'Premium 24/7 support',
        'Detailed driving analytics',
        'Exclusive partner discounts',
        'Priority license processing',
      ],
    },
    {
      name: 'Business Partnership',
      description: 'Tailored for local businesses',
      price: { monthly: 'Contact Us', annually: 'Contact Us' },
      features: [
        'All Pro features',
        'Promotional opportunities in Vroum app',
        'Customer insights and analytics',
        'Co-branding options',
        'Dedicated account manager',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How does the Basic plan differ from the Pro plan?',
      answer:
        'The Basic plan is free and offers essential features for individual users, while the Pro plan includes advanced features like detailed driving analytics and exclusive partner discounts for a monthly or annual fee.',
    },
    {
      question: 'What are the benefits of the Business Partnership plan?',
      answer:
        'The Business Partnership plan offers local businesses promotional opportunities within the Vroum app, customer insights, co-branding options, and a dedicated account manager to help maximize their partnership benefits.',
    },
    {
      question: 'Can I switch between plans?',
      answer:
        'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
    },
    {
      question: 'How do partner discounts work?',
      answer:
        'Partner discounts are special offers from local businesses exclusively for Vroum users. Basic users have access to general discounts, while Pro users enjoy exclusive, premium discounts.',
    },
    {
      question:
        'What kind of businesses can benefit from partnering with Vroum?',
      answer:
        'A wide range of local businesses can benefit, including mechanics, restaurants, car washes, driving schools, and more. Any business looking to reach drivers in Cameroon can find value in partnering with Vroum.',
    },
  ];

  const Subscribe = async (plan: string, userId:string) => {
    if (plan === 'Pro') {
      const response = await axios.post(`/api/subscription/`,{
        userId:userId,
        email:params.email
      });

      console.log("response here", response)

      if(response.status === 200){
      router.push(response.data.data['link'])       
    }
  }
    }

  if (!mounted) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Choose the Perfect Plan for Your Needs
        </h1>
        <p className="text-xl text-gray-600">
          Partner with Vroum to revolutionize driver's licensing and grow your
          business
        </p>
      </header>

      <Tabs defaultValue="monthly" className="mb-12">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger
            value="monthly"
            onClick={() => setBillingCycle('monthly')}
          >
            Monthly
          </TabsTrigger>
          <TabsTrigger
            value="annually"
            onClick={() => setBillingCycle('annually')}
          >
            Annually
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {pricingPlans.map(plan => (
          <Card
            key={plan.name}
            className={plan.name === 'Pro' ? 'border-blue-500 border-2' : ''}
          >
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="text-3xl font-bold mb-4" onClick={()=> Subscribe("Pro",params.userId)}>
                {plan.price[billingCycle] === 'Free' ? (
                  'Free'
                ) : (
                  <>
                    {plan.price[billingCycle] === 'Contact Us' ? (
                      'Contact Us'
                    ) : (
                      <>
                        {plan.price[billingCycle as 'monthly' | 'annually']}{' '}
                        FCFA
                        <span className="text-sm font-normal">
                          /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      </>
                    )}
                  </>
                )}
              </Button>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.name === 'Pro' ? 'default' : 'outline'}
                onClick={()=> Subscribe("Pro", params.userId)}
              >
                {plan.name === 'Business Partnership'
                  ? 'Partner with Us'
                  : 'Get Started'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Why Choose Vroum?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>For Individuals</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Convenient digital license management</li>
                <li>Timely renewal reminders</li>
                <li>Access to exclusive partner discounts</li>
                <li>Enhanced road safety through analytics</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>For Businesses</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Reach a wide audience of drivers</li>
                <li>Increase foot traffic to your business</li>
                <li>Gain valuable customer insights</li>
                <li>Enhance brand visibility through co-branding</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>For Cameroon</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>Improved road safety</li>
                <li>Reduced bureaucracy in licensing</li>
                <li>Support for local businesses</li>
                <li>Modernization of transportation sector</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">
          What Our Users and Partners Say
        </h2>
        <Testimonials />
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-6">
          Choose the plan that's right for you and join the Vroum revolution
          today!
        </p>
        <div className="flex justify-center space-x-4">
          <Button>Sign Up for Free</Button>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </section>
    </div>
  );
}

  
