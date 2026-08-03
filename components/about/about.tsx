import {
  BadgeCheck,
  Building2,
  CreditCard,
  Heart,
  Home,
  LayoutDashboard,
  MessageCircle,
  Search,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import { Heading1, Heading2, Lead, Paragraph } from "../typography/typography";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import MissionItem from "./mission-item";
import StepCard from "./step-card";
import FeatureCard from "./feature-card";
import Stat from "./stat";
import RoleCard from "./role-card";

export default function About() {
  return (
    <div className='space-y-24 mx-auto py-16 container'>
      {/* Hero Section */}
      <section className='relative bg-brand-surface py-20 rounded-3xl overflow-hidden text-center'>
        <div className='space-y-6 mx-auto max-w-4xl'>
          <Badge className='bg-brand/10 text-brand'>About Rent Nest</Badge>

          <Heading1>
            Finding a place to live should feel simple and trusted.
          </Heading1>

          <Lead className='mx-auto max-w-2xl'>
            Rent Nest connects tenants with verified landlords, making property
            discovery, rental requests, and communication easier than ever.
          </Lead>

          <div className='flex justify-center gap-4 pt-5'>
            <Button
              size='lg'
              className='bg-brand hover:bg-brand/90 text-brand-foreground'
            >
              Explore Properties
            </Button>

            <Button size='lg' variant='outline'>
              Become a Landlord
            </Button>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className='md:items-center gap-10 grid md:grid-cols-2'>
        <div className='space-y-5'>
          <Heading2 className='border-0'>Our Mission</Heading2>

          <Paragraph>
            Rent Nest was created to remove the difficulties people face while
            searching for rental homes. We believe everyone deserves a safe,
            transparent, and comfortable place to live.
          </Paragraph>

          <Paragraph>
            Our platform helps tenants discover suitable properties while giving
            landlords powerful tools to manage their rental business.
          </Paragraph>
        </div>

        <Card className='bg-brand-surface'>
          <CardContent className='gap-5 grid p-8'>
            <MissionItem
              icon={Home}
              title='Better Homes'
              description='Discover properties that match your lifestyle.'
            />

            <MissionItem
              icon={ShieldCheck}
              title='Trusted Platform'
              description='Secure communication between tenants and landlords.'
            />

            <MissionItem
              icon={Users}
              title='Community First'
              description='Building a better rental ecosystem.'
            />
          </CardContent>
        </Card>
      </section>

      {/* How It Works */}
      <section className='space-y-10'>
        <div className='mx-auto max-w-2xl text-center'>
          <Heading2 className='border-0'>How Rent Nest Works</Heading2>

          <Lead>Renting your next home is only a few simple steps away.</Lead>
        </div>

        <div className='gap-6 grid md:grid-cols-3'>
          <StepCard
            number='01'
            title='Search Properties'
            description='
        Browse verified rental properties
        based on location and preferences.
        '
          />

          <StepCard
            number='02'
            title='Send Request'
            description='
        Contact landlords and submit
        rental requests easily.
        '
          />

          <StepCard
            number='03'
            title='Move In'
            description='
        Complete the process and enjoy
        your new home.
        '
          />
        </div>
      </section>

      {/* Features */}
      <section className='space-y-10'>
        <div className='text-center'>
          <Heading2 className='border-0'>Why Choose Rent Nest?</Heading2>
        </div>

        <div className='gap-6 grid md:grid-cols-2 lg:grid-cols-3'>
          <FeatureCard
            icon={Search}
            title='Smart Search'
            description='
        Find properties quickly with filters,
        categories, and locations.
        '
          />

          <FeatureCard
            icon={BadgeCheck}
            title='Verified Listings'
            description='
        Discover genuine properties from trusted landlords.
        '
          />

          <FeatureCard
            icon={MessageCircle}
            title='Easy Communication'
            description='
        Connect with property owners directly.
        '
          />

          <FeatureCard
            icon={CreditCard}
            title='Secure Payments'
            description='
        Manage rental payments safely.
        '
          />

          <FeatureCard
            icon={Heart}
            title='Save Favorites'
            description='
        Keep track of your preferred homes.
        '
          />

          <FeatureCard
            icon={LayoutDashboard}
            title='Powerful Dashboard'
            description='
        Manage everything from one place.
        '
          />
        </div>
      </section>

      {/* Statistics */}
      <section>
        <Card className='bg-brand text-brand-foreground'>
          <CardContent className='gap-8 grid md:grid-cols-4 p-10 text-center'>
            <Stat value='1000+' label='Properties' />
            <Stat value='500+' label='Landlords' />
            <Stat value='5000+' label='Users' />
            <Stat value='24/7' label='Support' />
          </CardContent>
        </Card>
      </section>

      {/* User Roles */}
      <section className='space-y-8'>
        <Heading2 className='border-0 text-center'>Built For Everyone</Heading2>

        <div className='gap-6 grid md:grid-cols-2'>
          <RoleCard
            icon={User}
            title='For Tenants'
            items={[
              "Search rental homes",
              "Save favorite properties",
              "Send rental requests",
              "Manage payments",
            ]}
          />

          <RoleCard
            icon={Building2}
            title='For Landlords'
            items={[
              "Create property listings",
              "Manage rental requests",
              "Track properties",
              "Grow rental business",
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className='bg-brand-surface p-10 rounded-3xl text-center'>
        <Heading2 className='border-0'>Ready to find your next home?</Heading2>

        <Lead>
          Join Rent Nest today and experience a smarter way to rent properties.
        </Lead>

        <Button
          size='lg'
          className='bg-brand hover:bg-brand/90 mt-6 text-brand-foreground'
        >
          Get Started
        </Button>
      </section>
    </div>
  );
}
