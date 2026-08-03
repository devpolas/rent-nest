import Link from "next/link";
import { Button } from "../ui/button";

export default function AuthButtons() {
  return (
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
  );
}
