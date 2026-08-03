import Link from "next/link";
import { Button } from "../ui/button";

export default function DashboardButton() {
  return (
    <Button
      className='bg-brand hover:bg-brand/90 text-brand-foreground'
      asChild
    >
      <Link href='/dashboard'>Go to Dashboard</Link>
    </Button>
  );
}
