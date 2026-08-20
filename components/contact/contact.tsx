import {
  ArrowRight,
  Clock,
  Headphones,
  Mail,
  MapPin,
  MapPinned,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";

import {
  Heading1,
  Heading2,
  Heading4,
  Label,
  Large,
  Lead,
  Muted,
} from "../typography/typography";
import { Badge } from "../ui/badge";
import ContactCard from "./contact-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import HeroBackground from "../home/hero/hero-background";
import SupportItem from "./support-item";
import Link from "next/link";

export default function Contact() {
  return (
    <div className='space-y-20 pb-24'>
      {/* Hero */}
      <section className='relative flex items-center min-h-screen overflow-hidden'>
        <HeroBackground
          image='/images/hero/office.png'
          alt='Rent Nest support office'
        />

        <div className='z-10 relative mx-auto px-4 py-24 lg:py-32 w-full container'>
          <div className='space-y-5 mx-auto max-w-3xl text-center'>
            <div className='inline-flex items-center px-4 py-2 rounded-full glass'>
              <span className='bg-brand-success mr-2 rounded-full size-2' />
              <span className='text-white/80 text-sm'>Contact Rent Nest</span>
            </div>

            <Heading1 className='text-white'>
              We are here to help you find your{" "}
              <span className='bg-clip-text bg-gradient-to-r from-brand to-brand-success text-transparent'>
                perfect home
              </span>
            </Heading1>

            <Lead className='mx-auto max-w-2xl text-white/80'>
              Have questions about properties, rental requests, or becoming a
              landlord? Our team is ready to help.
            </Lead>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className='mx-auto px-4 container'>
        <div className='gap-6 grid md:grid-cols-3'>
          <ContactCard
            icon={Mail}
            title='Email Support'
            value='support@rentnest.com'
            description='Get help from our support team any time.'
          />

          <ContactCard
            icon={Phone}
            title='Phone Support'
            value='+880 1234-567890'
            description='Available during business hours.'
          />

          <ContactCard
            icon={MapPin}
            title='Office Location'
            value='Dhaka, Bangladesh'
            description='Visit our headquarters anytime.'
          />
        </div>
      </section>

      {/* Main Contact Area */}
      <section className='mx-auto px-4 container'>
        <div className='gap-8 grid lg:grid-cols-5'>
          {/* Form */}
          <Card className='lg:col-span-3 glass-card'>
            <CardHeader>
              <CardTitle className='text-2xl'>Send us a message</CardTitle>

              <CardDescription>
                Fill out the form and we will get back to you soon.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form className='space-y-5'>
                <div className='gap-5 grid md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label>Name</Label>
                    <Input placeholder='Your name' />
                  </div>

                  <div className='space-y-2'>
                    <Label>Email</Label>
                    <Input type='email' placeholder='your@email.com' />
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label>Subject</Label>
                  <Input placeholder='How can we help?' />
                </div>

                <div className='space-y-2'>
                  <Label>Message</Label>
                  <Textarea
                    placeholder='Write your message here...'
                    className='min-h-32'
                  />
                </div>

                <Button
                  size='lg'
                  variant='brand'
                  className='rounded-2xl w-full'
                >
                  <Send className='mr-2 size-4' />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className='space-y-6 lg:col-span-2'>
            {/* Support */}
            <Card className='glass-card'>
              <CardContent className='space-y-5 p-6'>
                <div className='flex items-center gap-3'>
                  <div className='flex justify-center items-center bg-brand-success/20 rounded-full size-12 shrink-0'>
                    <Headphones className='size-6 text-brand-success' />
                  </div>

                  <div>
                    <Large>Customer Support</Large>
                    <Muted>We usually reply within 24 hours.</Muted>
                  </div>
                </div>

                <Separator />

                <div className='space-y-3'>
                  <SupportItem icon={Clock} text='Monday - Friday, 9AM - 6PM' />
                  <SupportItem
                    icon={MessageCircle}
                    text='Live chat available'
                  />
                  <SupportItem icon={ShieldCheck} text='Secure communication' />
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className='glass-card'>
              <CardContent className='space-y-4 p-6'>
                <Heading4>Frequently Asked</Heading4>

                <Muted>
                  Looking for quick answers? Browse our help center for common
                  questions.
                </Muted>

                <Button variant='outline' className='rounded-2xl w-full'>
                  Visit FAQ Center
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map / Location */}
      <section className='mx-auto px-4 container'>
        <Card className='overflow-hidden glass-card'>
          <div className='relative flex justify-center items-center bg-brand-surface h-80'>
            <div className='top-0 left-1/4 absolute bg-brand/15 blur-[120px] rounded-full size-72' />

            <div className='relative space-y-2 text-center'>
              <div className='flex justify-center items-center bg-brand mx-auto rounded-2xl size-16 text-brand-foreground'>
                <MapPinned className='size-8' />
              </div>

              <Heading4>Rent Nest Headquarters</Heading4>

              <Muted>Dhaka, Bangladesh</Muted>
            </div>
          </div>
        </Card>
      </section>

      {/* CTA */}
      <section className='mx-auto px-4 container'>
        <div className='relative bg-brand px-6 py-14 md:py-16 rounded-3xl overflow-hidden text-center'>
          <div className='top-0 right-0 absolute bg-white/10 blur-[120px] rounded-full size-80' />

          <div className='relative space-y-4'>
            <Heading2 className='border-0 text-brand-foreground'>
              Ready to find your next home?
            </Heading2>

            <Lead className='mx-auto max-w-xl text-brand-foreground/80'>
              Explore thousands of rental possibilities with Rent Nest.
            </Lead>

            <Button size='lg' variant='secondary' className='mt-2 rounded-2xl'>
              <Link href={"/properties"}>Browse Properties</Link>
              <ArrowRight className='ml-2 size-5' />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
