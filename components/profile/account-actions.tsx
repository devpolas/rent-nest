import { KeyRound, LogOut, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AccountActions() {
  return (
    <Card className='glass-card'>
      <CardHeader>
        <CardTitle>Account</CardTitle>
      </CardHeader>

      <CardContent className='space-y-3'>
        <Button variant='outline' className='w-full'>
          <Pencil className='mr-2 size-4' />
          Edit Profile
        </Button>

        <Button variant='outline' className='w-full'>
          <KeyRound className='mr-2 size-4' />
          Change Password
        </Button>

        <Button variant='outline' className='w-full'>
          <LogOut className='mr-2 size-4' />
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}
