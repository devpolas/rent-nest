import Link from "next/link";
import { publicNavigation } from "@/config/client/navigation";

export default function NavbarLinks() {
  return (
    <nav className='hidden md:flex items-center gap-8 2xl:gap-14 xl:gap-10'>
      {publicNavigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className='font-medium text-muted-foreground hover:text-brand text-sm lg:text-lg transition'
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
