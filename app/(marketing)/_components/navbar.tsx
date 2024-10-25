'use client';

import { Icons } from '@/components/ui/icons';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const MarketingHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const routes = [
    {
      title: 'Features',
      url: '#',
    },
    {
      title: 'About',
      url: '#',
    },
    {
      title: 'Contact',
      url: '#',
    },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 bg-background border-b border-transparent backdrop-blur-lg transition-all duration-300 z-10',
        {
          'bg-background/80 border-border/40': isScrolled,
        }
      )}
    >
      <div className="container flex items-center justify-between h-16">
        <Link className="flex items-center justify-center" href="#">
          <Icons.logo className="h-6 w-6 mr-2" />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6 items-center">
          {routes.map(route => (
            <Link
              key={route.title}
              className="text-sm font-medium hover:underline underline-offset-4"
              href={route.url}
            >
              {route.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/sign-up"
            className={buttonVariants({ variant: 'ghost' })}
          >
            Sign in
          </Link>
          <Link
            href="/sign-in"
            className={buttonVariants({ variant: 'secondary' })}
          >
            Sign in
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MarketingHeader;
