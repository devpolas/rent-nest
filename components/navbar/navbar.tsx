import Link from "next/link";
import Logo from "@/components/logo/logo";
import NavbarLinks from "./navbar-links";
import MobileNavbar from "./mobile-navbar";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "../theme/theme-switcher";

export default function Navbar() {
  return (
    <header className='top-0 z-50 sticky bg-background/80 backdrop-blur border-b'>
      <div className='flex justify-between items-center h-16 container'>
        {/* Logo */}
        <Logo />
        {/* Desktop */}
        <NavbarLinks />
        <div className='flex items-center gap-2'>
          <ThemeSwitcher />
          <div className='hidden md:flex gap-2'>
            <Button variant='outline' asChild>
              <Link href='/signin'>Sign In</Link>
            </Button>
            <Button
              className='bg-brand hover:bg-brand/90 text-brand-foreground'
              asChild
            >
              <Link href='/signup'>Get Started</Link>
            </Button>
          </div>
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
}
