"use client";
import Logo from "@/components/logo/logo";
import NavbarLinks from "./navbar-links";
import MobileNavbar from "./mobile-navbar";
import { ThemeSwitcher } from "../theme/theme-switcher";
import AuthButtons from "./auth-buttons";
import LoadingSpinner from "../spinner/loading-spinner";
import useAuth from "@/hooks/auth/use-auth";
import DashboardButton from "./dashboard-button";

export default function Navbar() {
  const { isAuthenticated, isLoading } = useAuth();
  return (
    <header className='top-0 z-50 sticky w-full'>
      <div className='glass bg-brand/5 supports-[backdrop-filter]:bg-brand/5 border-x-0 border-t-0 border-b border-brand/15'>
        <div className='flex justify-between items-center gap-2 mx-auto px-4 sm:px-6 w-full h-14 sm:h-16 container'>
          {/* Logo */}
          <Logo />
          {/* Desktop */}
          <NavbarLinks />
          <div className='flex items-center gap-1.5 sm:gap-2'>
            <ThemeSwitcher />
            <div className='hidden md:flex'>
              {isLoading ? (
                <LoadingSpinner />
              ) : isAuthenticated ? (
                <DashboardButton />
              ) : (
                <AuthButtons />
              )}
            </div>

            <MobileNavbar />
          </div>
        </div>
      </div>
    </header>
  );
}
