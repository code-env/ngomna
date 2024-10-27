import Link from "next/link";
import { Icons } from "../ui/icons";
import { siteConfig } from "@/config/site";

const Logo = ({ path }: { path: "/" | "/d" | "/admin" }) => {
  return (
    <Link className="flex items-center gap-1" href={path}>
      <Icons.logo className="h-6 w-6 mr-2" />
      <span className="font-bold">{siteConfig.name}</span>
    </Link>
  );
};

export default Logo;
