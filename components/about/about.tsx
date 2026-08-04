import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CreditCard,
  Heart,
  Home,
  LayoutDashboard,
  MessageCircle,
  Search,
  Send,
  ShieldCheck,
  Smile,
  User,
  Users,
} from "lucide-react";

import { Heading1, Heading2, Lead, Paragraph } from "../typography/typography";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import HeroBackground from "../home/hero/hero-background";
import MissionItem from "./mission-item";
import StepCard from "./step-card";
import FeatureCard from "./feature-card";
import Stat from "./stat";
import RoleCard from "./role-card";

export default function About() {
  return (
    <div className='space-y-24 pb-24'>
      {/* Hero Section */}
      <section className='relative flex items-center min-h-screen overflow-hidden'>
        <HeroBackground
          image='/images/hero/family.png'
          alt='Happy family in their new rental home'
        />

        <div className='z-10 relative mx-auto px-4 py-24 lg:py-32 w-full container'>
          <div className='space-y-6 mx-auto max-w-4xl text-center'>
            <div className='inline-flex items-center px-4 py-2 rounded-full glass'>
              <span className='bg-brand-success mr-2 rounded-full size-2' />
              <span className='text-white/80 text-sm'>About Rent Nest</span>
            </div>

            <Heading1 className='text-white'>
              Finding a place to live should feel{" "}
              <span className='bg-clip-text bg-gradient-to-r from-brand to-brand-success text-transparent'>
                simple and trusted
              </span>
            </Heading1>

            <Lead className='mx-auto max-w-2xl text-white/80'>
              Rent Nest connects tenants with verified landlords, making property
              discovery, rental requests, and communication easier than ever.
            </Lead>

            <div className='flex flex-wrap justify-center gap-4 pt-4'>
              <Button size='lg' variant='brand' className='rounded-2xl'>
                Explore Properties
                <ArrowRight className='ml-2 size-5' />
              </Button>

              <Button size='lg' variant='glass' className='rounded-2xl'>
                Become a Landlord
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className='mx-auto px-4 container'>
        <div className='items-center gap-12 grid lg:grid-cols-2'>
          <div className='space-y-5'>
            <Badge className='bg-brand/10 text-brand'>Our Mission</Badge>

            <Heading2 className='border-0'>
              Making renting fair, transparent and stress-free
            </Heading2>

            <Paragraph>
              Rent Nest was created to remove the difficulties people face while
              searching for rental homes. We believe everyone deserves a safe,
              transparent, and comfortable place to live.
            </Paragraph>

            <Paragraph>
              Our platform helps tenants discover suitable properties while
              giving landlords powerful tools to manage their rental business.
            </Paragraph>
          </div>

          <Card className='glass-card'>
            <CardContent className='gap-6 grid p-8'>
              <MissionItem
                icon={Home}
                title='Better Homes'
                description='Discover properties that match your lifestyle and budget.'
              />

              <MissionItem
                icon={ShieldCheck}
                title='Trusted Platform'
                description='Secure communication between tenants and landlords.'
              />

              <MissionItem
                icon={Users}
                title='Community First'
                description='Building a better rental ecosystem for everyone.'
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className='mx-auto px-4 container'>
        <div className='mx-auto mb-12 max-w-2xl text-center'>
          <Badge className='bg-brand/10 mb-4 text-brand'>Simple process</Badge>

          <Heading2 className='border-0'>How Rent Nest Works</Heading2>

          <Lead className='mt-3'>
            Renting your next home is only a few simple steps away.
          </Lead>
        </div>

        <div className='gap-6 grid md:grid-cols-3'>
          <StepCard
            icon={Search}
            number='01'
            title='Search Properties'
            description='Browse verified rental properties based on location and preferences.'
          />

          <StepCard
            icon={Send}
            number='02'
            title='Send Request'
            description='Contact landlords and submit rental requests easily.'
          />

          <StepCard
            icon={Home}
            number='03'
            title='Move In'
            description='Complete the process and enjoy your brand new home.'
          />
        </div>
      </section>

      {/* Features */}
      <section className='mx-auto px-4 container'>
        <div className='mx-auto mb-12 max-w-2xl text-center'>
          <Badge className='bg-brand/10 mb-4 text-brand'>Why Rent Nest</Badge>

          <Heading2 className='border-0'>Why Choose Rent Nest?</Heading2>

          <Lead className='mt-3'>
            Everything you need to rent smarter, all in one place.
          </Lead>
        </div>

        <div className='gap-6 grid md:grid-cols-2 lg:grid-cols-3'>
          <FeatureCard
            icon={Search}
            title='Smart Search'
            description='Find properties quickly with filters, categories, and locations.'
          />

          <FeatureCard
            icon={BadgeCheck}
            title='Verified Listings'
            description='Discover genuine properties from trusted landlords.'
          />

          <FeatureCard
            icon={MessageCircle}
            title='Easy Communication'
            description='Connect with property owners directly and instantly.'
          />

          <FeatureCard
            icon={CreditCard}
            title='Secure Payments'
            description='Manage rental payments safely and reliably.'
          />

          <FeatureCard
            icon={Heart}
            title='Save Favorites'
            description='Keep track of your preferred homes with one tap.'
          />

          <FeatureCard
            icon={LayoutDashboard}
            title='Powerful Dashboard'
            description='Manage everything from one central place.'
          />
        </div>
      </section>

      {/* Statistics */}
      <section className='mx-auto px-4 container'>
        <div className='relative bg-brand p-10 md:p-16 rounded-3xl overflow-hidden'>
          <div className='top-0 right-0 absolute bg-white/10 blur-[120px] rounded-full size-80' />

          <div className='relative space-y-12'>
            <div className='mx-auto max-w-2xl text-center'>
              <Heading2 className='border-0 text-brand-foreground'>
                Trusted by thousands across Bangladesh
              </Heading2>

              <Lead className='mt-3 text-brand-foreground/80'>
                A growing community renting smarter with Rent Nest every day.
              </Lead>
            </div>

            <div className='gap-8 grid grid-cols-2 lg:grid-cols-4'>
              <Stat icon={Building2} value='1,000+' label='Properties' />
              <Stat icon={Users} value='500+' label='Landlords' />
              <Stat icon={Smile} value='5,000+' label='Happy Users' />
              <Stat icon={ShieldCheck} value='24/7' label='Support' />
            </div>
          </div>
        </div>
      </section>

      {/* User Roles */}
      <section className='mx-auto px-4 container'>
        <div className='mx-auto mb-12 max-w-2xl text-center'>
          <Badge className='bg-brand/10 mb-4 text-brand'>Built for you</Badge>

          <Heading2 className='border-0'>Built For Everyone</Heading2>

          <Lead className='mt-3'>
            Whether you are renting or listing, Rent Nest has you covered.
          </Lead>
        </div>

        <div className='gap-6 grid md:grid-cols-2'>
          <RoleCard
            icon={User}
            title='For Tenants'
            description='Find and secure your next home without the usual hassle.'
            items={[
              "Search rental homes",
              "Save favorite properties",
              "Send rental requests",
              "Manage payments securely",
            ]}
          />

          <RoleCard
            icon={Building2}
            title='For Landlords'
            description='Everything you need to list and manage your rentals.'
            items={[
              "Create property listings",
              "Manage rental requests",
              "Track your properties",
              "Grow your rental business",
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className='mx-auto px-4 container'>
        <div className='relative flex lg:flex-row flex-col items-center gap-10 bg-brand-surface p-10 md:p-14 rounded-3xl overflow-hidden'>
          <div className='flex-1 space-y-4 text-center lg:text-left'>
            <Heading2 className='border-0'>
              Ready to find your next home?
            </Heading2>

            <Lead>
              Join Rent Nest today and experience a smarter way to rent
              properties.
            </Lead>

            <Button size='lg' variant='brand' className='mt-2 rounded-2xl'>
              Get Started
              <ArrowRight className='ml-2 size-5' />
            </Button>
          </div>

          <div className='relative shadow-lg rounded-2xl w-full lg:w-96 h-56 overflow-hidden shrink-0'>
            <Image
              src='/images/hero/villa.png'
              alt='Modern rental villa'
              fill
              className='object-cover'
            />
          </div>
        </div>
      </section>
    </div>
  );
}
