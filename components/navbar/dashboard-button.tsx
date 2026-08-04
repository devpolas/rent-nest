import Link from "next/link";
import { Button } from "../ui/button";

export default function DashboardButton() {
  return (
    <Button variant='brand' asChild>
      <Link href='/dashboard'>Go to Dashboard</Link>
    </Button>
  );
}
