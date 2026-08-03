import {
  BadgeCheck,
  Building,
  Building2,
  Clock,
  Home,
  Hotel,
  House,
  Images,
  MessageCircle,
  Search,
  ShieldCheck,
  Star,
} from "lucide-react";
import {
  Heading1,
  Heading2,
  Heading3,
  Lead,
  Paragraph,
} from "../typography/typography";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectValue } from "../ui/select";
import HomeStat from "./home-stats";
import SectionHeader from "./section-header";
import PropertyCard from "../property/property-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import StepCard from "../about/step-card";
import { LocationCard } from "./location-card";
import { CategoryCard } from "./category-card";
import { FeatureRow } from "./feature-row";
import { TrustItem } from "./trust-item";
import { AudienceCard } from "./audience-card";
import { TestimonialCard } from "./testimonial-card";

export default function Homepage() {
  return (
    <div className='space-y-28 mx-auto py-10 container'>
      {/* ================= HERO ================= */}

      <section className='relative py-20 lg:py-32 rounded-3xl overflow-hidden glass-brand'>
        <div className='space-y-8 mx-auto max-w-5xl text-center'>
          <Badge className='bg-brand/10 text-brand'>
            Bangladesh&apos;s Smart Rental Platform
          </Badge>

          <Heading1>Find a place you can call home</Heading1>

          <Lead className='mx-auto max-w-3xl'>
            Discover verified rental properties, connect with trusted landlords,
            and make renting simple with Rent Nest.
          </Lead>

          {/* Search */}

          <Card className='bg-background shadow-xl mx-auto max-w-5xl'>
            <CardContent className='gap-3 grid md:grid-cols-4 p-5'>
              <Input placeholder='Search location' />

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Property type' />
                </SelectTrigger>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder='Budget' />
                </SelectTrigger>
              </Select>

              <Button className='bg-brand hover:bg-brand/90 text-brand-foreground'>
                <Search className='mr-2 size-4' />
                Search
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ================= STATS ================= */}

      <section>
        <div className='gap-5 grid md:grid-cols-4'>
          <HomeStat value='10K+' label='Properties' />
          <HomeStat value='5K+' label='Happy Tenants' />
          <HomeStat value='2K+' label='Landlords' />
          <HomeStat value='99%' label='Satisfied Users' />
        </div>
      </section>

      {/* ================= FEATURED PROPERTY ================= */}

      {/* <section className='space-y-10'>
        <SectionHeader
          title='Featured Properties'
          description='Explore our best available rental homes.'
        />

        <div className='gap-6 grid md:grid-cols-2 lg:grid-cols-3'>
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section> */}

      {/* ================= LOCATIONS ================= */}

      <section className='space-y-10'>
        <SectionHeader
          title='Popular Locations'
          description='Find homes in your favorite cities.'
        />

        <div className='gap-5 grid sm:grid-cols-2 lg:grid-cols-4'>
          <LocationCard city='Dhaka' count='1200+ Properties' />
          <LocationCard city='Chittagong' count='600+ Properties' />
          <LocationCard city='Sylhet' count='350+ Properties' />
          <LocationCard city='Rajshahi' count='200+ Properties' />
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}

      <section className='space-y-10'>
        <SectionHeader
          title='Find Your Property Type'
          description='Choose a home that matches your lifestyle.'
        />

        <div className='gap-5 grid sm:grid-cols-2 lg:grid-cols-4'>
          <CategoryCard icon={Building2} title='Apartment' count='1200 Homes' />
          <CategoryCard icon={House} title='Family House' count='700 Homes' />
          <CategoryCard icon={Hotel} title='Studio' count='400 Homes' />
          <CategoryCard icon={Building} title='Office' count='250 Spaces' />
        </div>
      </section>

      {/* ================= WHY RENT NEST ================= */}

      <section className='lg:items-center gap-10 grid lg:grid-cols-2'>
        <div className='space-y-6'>
          <Heading2 className='border-0'>Why choose Rent Nest?</Heading2>

          <Paragraph>
            Renting should not be stressful. We provide a trusted platform where
            tenants and landlords can connect easily.
          </Paragraph>

          <div className='space-y-5'>
            <FeatureRow
              icon={BadgeCheck}
              title='Verified Listings'
              description='Authentic properties from trusted owners.'
            />

            <FeatureRow
              icon={ShieldCheck}
              title='Safe Communication'
              description='Secure rental requests and conversations.'
            />

            <FeatureRow
              icon={Clock}
              title='Save Time'
              description='Find suitable homes faster.'
            />
          </div>
        </div>

        <Card className='bg-brand text-brand-foreground'>
          <CardContent className='space-y-5 p-10'>
            <Home className='size-12' />

            <Heading3 className='text-brand-foreground'>
              Your next home is closer than you think
            </Heading3>

            <Paragraph className='text-brand-foreground/80'>
              Thousands of properties are waiting for your discovery.
            </Paragraph>
          </CardContent>
        </Card>
      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section className='space-y-10'>
        <SectionHeader
          title='How Rent Nest Works'
          description='Simple rental journey.'
        />

        <div className='gap-6 grid md:grid-cols-4'>
          <StepCard
            number='01'
            title='Create Account'
            description='Sign up and create your Rent Nest account to start your rental journey.'
          />

          <StepCard
            number='02'
            title='Search Home'
            description='Browse verified properties using location, category, and price filters.'
          />

          <StepCard
            number='03'
            title='Send Request'
            description='Submit a rental request and connect with the property owner.'
          />

          <StepCard
            number='04'
            title='Move In'
            description='Complete the process and move into your new home.'
          />
        </div>
      </section>

      {/* ================= TRUST ================= */}

      <section>
        <Card className='bg-brand text-brand-foreground'>
          <CardContent className='gap-8 grid md:grid-cols-5 p-10'>
            <TrustItem icon={BadgeCheck} title='Verified' />
            <TrustItem icon={ShieldCheck} title='Secure' />
            <TrustItem icon={Images} title='Real Photos' />
            <TrustItem icon={MessageCircle} title='Communication' />
            <TrustItem icon={Star} title='Reviews' />
          </CardContent>
        </Card>
      </section>

      {/* ================= TENANT / LANDLORD ================= */}

      <section className='gap-6 grid md:grid-cols-2'>
        <AudienceCard
          title='For Tenants'
          description='Find and rent your dream home easily.'
          items={[
            "Search properties",
            "Save favorites",
            "Request rentals",
            "Manage payments",
          ]}
        />

        <AudienceCard
          title='For Landlords'
          description='Grow your rental business.'
          items={[
            "Create listings",
            "Manage requests",
            "Track properties",
            "Reach tenants",
          ]}
        />
      </section>

      {/* ================= TESTIMONIAL ================= */}

      <section className='space-y-10'>
        <SectionHeader
          title='What our users say'
          description='Real experiences from Rent Nest users.'
        />

        <div className='gap-6 grid md:grid-cols-3'>
          <TestimonialCard
            name='Rahim'
            role='Tenant'
            text='Found my apartment quickly.'
          />

          <TestimonialCard
            name='Sarah'
            role='Landlord'
            text='Managing properties is easier.'
          />

          <TestimonialCard
            name='Tanvir'
            role='Tenant'
            text='The process is simple.'
          />
        </div>
      </section>

      {/* ================= FAQ ================= */}

      <section className='space-y-8'>
        <SectionHeader
          title='Frequently Asked Questions'
          description='Common questions about renting.'
        />

        <Accordion type='single' collapsible>
          <AccordionItem value='one'>
            <AccordionTrigger>How do I rent a property?</AccordionTrigger>

            <AccordionContent>
              Search a property, send a rental request, and communicate with the
              landlord.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='two'>
            <AccordionTrigger>Are properties verified?</AccordionTrigger>

            <AccordionContent>
              We encourage verified listings and trusted users.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='three'>
            <AccordionTrigger>Can landlords list properties?</AccordionTrigger>

            <AccordionContent>
              Yes, landlords can create and manage listings.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* ================= NEWSLETTER ================= */}

      <section>
        <Card className='bg-brand-surface'>
          <CardContent className='space-y-6 p-10 text-center'>
            <Heading2 className='border-0'>
              Stay updated with new properties
            </Heading2>

            <Lead>Receive notifications about new rental homes.</Lead>

            <div className='flex gap-3 mx-auto max-w-xl'>
              <Input placeholder='Email address' />

              <Button className='bg-brand text-brand-foreground'>
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ================= FINAL CTA ================= */}

      <section className='bg-brand px-6 py-16 rounded-3xl text-brand-foreground text-center'>
        <Heading2 className='border-0 text-brand-foreground'>
          Find your next home today
        </Heading2>

        <Lead className='text-brand-foreground/80'>
          Join thousands of people using Rent Nest.
        </Lead>

        <Button size='lg' variant='secondary' className='mt-6'>
          Explore Properties
        </Button>
      </section>
    </div>
  );
}
