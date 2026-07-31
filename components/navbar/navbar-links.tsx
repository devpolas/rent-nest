import Link from "next/link";

import { publicNavigation } from "@/config/client/navigation";

export default function NavbarLinks() {
  return (
    <nav className='hidden md:flex items-center gap-8'>
      {publicNavigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className='font-medium text-muted-foreground hover:text-brand text-sm transition'
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
