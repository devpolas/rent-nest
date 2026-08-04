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
    <footer className='bg-brand-surface/40 border-t'>
      <div className='mx-auto px-4 py-8 container'>
        <div className='items-start gap-12 grid md:grid-cols-2 lg:grid-cols-4'>
          {/* Brand */}
          <div className='space-y-5'>
            <Logo />

            <Muted className='max-w-sm leading-7'>
              Find trusted homes, connect with verified landlords, and rent with
              confidence across Bangladesh.
            </Muted>

            <div className='flex items-center gap-3'>
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  aria-label={name}
                  className='flex justify-center items-center bg-background hover:bg-brand border hover:border-brand rounded-full w-10 h-10 hover:text-brand-foreground transition-all'
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

      <div className='py-3 border-t text-center'>
        <Small className='text-muted-foreground'>
          © {currentYear} RentNest. All rights reserved.
        </Small>
      </div>
    </footer>
  );
}
