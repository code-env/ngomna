import { ModeToggle } from '@/components/shared/mode-toogle';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © {currentYear} {siteConfig.name}. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6 items-center">
        <ModeToggle />
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacy
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
