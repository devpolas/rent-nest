import {
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
import SupportItem from "./support-item";

export default function Contact() {
  return (
    <div className='space-y-20 mx-auto py-16 container'>
      {/* Hero */}
      <section className='bg-brand-surface py-20 rounded-3xl text-center'>
        <div className='space-y-5 mx-auto max-w-3xl'>
          <Badge className='bg-brand/10 text-brand'>Contact Rent Nest</Badge>

          <Heading1>We are here to help you find your perfect home</Heading1>

          <Lead>
            Have questions about properties, rental requests, or becoming a
            landlord? Our team is ready to help.
          </Lead>
        </div>
      </section>

      {/* Contact Information */}
      <section className='gap-6 grid md:grid-cols-3'>
        <ContactCard
          icon={Mail}
          title='Email Support'
          value='support@rentnest.com'
          description='Get help from our support team.'
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
          description='Visit our office anytime.'
        />
      </section>

      {/* Main Contact Area */}
      <section className='gap-8 grid lg:grid-cols-5'>
        {/* Form */}
        <Card className='lg:col-span-3 bg-brand-surface'>
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>

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
                  placeholder='
                Write your message here...
                '
                  className='min-h-32'
                />
              </div>

              <Button
                size='lg'
                className='bg-brand hover:bg-brand/90 w-full text-brand-foreground'
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
          <Card className='bg-brand-surface'>
            <CardContent className='space-y-5 p-6'>
              <div className='flex items-center gap-3'>
                <div className='bg-brand-success/20 p-3 rounded-full'>
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

                <SupportItem icon={MessageCircle} text='Live chat available' />

                <SupportItem icon={ShieldCheck} text='Secure communication' />
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card className='bg-brand-surface'>
            <CardContent className='space-y-4 p-6'>
              <Heading4>Frequently Asked</Heading4>

              <Muted>Looking for quick answers?</Muted>

              <Button variant='outline' className='w-full'>
                Visit FAQ Center
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Map / Location */}
      <section>
        <Card className='bg-brand-surface overflow-hidden'>
          <div className='flex justify-center items-center bg-background h-80'>
            <div className='text-center'>
              <MapPinned className='mx-auto size-12 text-brand' />

              <Heading4>Rent Nest Headquarters</Heading4>

              <Muted>Dhaka, Bangladesh</Muted>
            </div>
          </div>
        </Card>
      </section>

      {/* CTA */}
      <section className='bg-brand px-6 py-14 rounded-3xl text-brand-foreground text-center'>
        <Heading2 className='border-0 text-brand-foreground'>
          Ready to find your next home?
        </Heading2>

        <Lead className='text-brand-foreground/80'>
          Explore thousands of rental possibilities with Rent Nest.
        </Lead>

        <Button size='lg' variant='secondary' className='mt-6'>
          Browse Properties
        </Button>
      </section>
    </div>
  );
}
