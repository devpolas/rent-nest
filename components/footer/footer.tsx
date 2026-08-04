"use client";
import Link from "next/link";
import Logo from "@/components/logo/logo";
import { Heading5, Muted, Small } from "@/components/typography/typography";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const footerSections = {
  Explore: [
    { name: "Properties", href: "/properties" },
    { name: "Categories", href: "/categories" },
    { name: "Locations", href: "/locations" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "#" },
  ],
  Support: [
    { name: "Help Center", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ],
} as const;

const socialLinks = [
  {
    name: "Facebook",
    icon: FaFacebook,
    href: "#",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    href: "#",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: "#",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    href: "#",
  },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='glass mt-auto border-x-0 border-b-0 border-t border-brand/15 bg-brand/5'>
      <div className='mx-auto px-4 sm:px-6 py-10 sm:py-12 container'>
        <div className='items-start gap-10 sm:gap-12 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
          {/* Brand */}
          <div className='space-y-5 col-span-2 lg:col-span-1'>
            <Logo />

            <Muted className='max-w-sm leading-7'>
              Find trusted homes, connect with verified landlords, and rent with
              confidence across Bangladesh.
            </Muted>

            <div className='flex flex-wrap items-center gap-3'>
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  aria-label={name}
                  className='flex justify-center items-center border border-brand/15 bg-background/40 hover:bg-brand backdrop-blur-md hover:border-brand rounded-full w-10 h-10 text-muted-foreground hover:text-brand-foreground transition-all'
                >
                  <Icon className='w-4 h-4' />
                </Link>
              ))}
            </div>
          </div>

          {Object.entries(footerSections).map(([title, links]) => (
            <div key={title}>
              <Heading5 className='mb-5'>{title}</Heading5>

              <ul className='space-y-3'>
                {links.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className='text-muted-foreground hover:text-brand transition-colors'
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className='border-t border-brand/10 bg-brand/[0.03]'>
        <div className='mx-auto px-4 sm:px-6 py-4 text-center container'>
          <Small className='text-muted-foreground'>
            © {currentYear} RentNest. All rights reserved.
          </Small>
        </div>
      </div>
    </footer>
  );
}
