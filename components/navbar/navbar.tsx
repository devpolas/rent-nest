"use client";
import Logo from "@/components/logo/logo";
import NavbarLinks from "./navbar-links";
import MobileNavbar from "./mobile-navbar";
import { ThemeSwitcher } from "../theme/theme-switcher";
import AuthButtons from "./auth-buttons";
import Link from "next/link";
import LoadingSpinner from "../spinner/loading-spinner";
import useAuth from "@/hooks/auth/use-auth";

export default function Navbar() {
  const { isAuthenticated, isLoading } = useAuth();
  return (
    <header className='top-0 z-50 sticky bg-background/80 backdrop-blur border-b w-full'>
      <div className='flex justify-between items-center mx-auto w-full h-16 container'>
        {/* Logo */}
        <Logo />
        {/* Desktop */}
        <NavbarLinks />
        <div className='flex items-center gap-2'>
          <ThemeSwitcher />
          <div className='hidden md:flex'>
            {isLoading ? (
              <LoadingSpinner />
            ) : isAuthenticated ? (
              <Link href='/dashboard'>Go to Dashboard</Link>
            ) : (
              <AuthButtons />
            )}
          </div>

          <MobileNavbar />
        </div>
      </div>
    </header>
  );
}
