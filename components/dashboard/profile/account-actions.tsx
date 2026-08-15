import { KeyRound, LogOut, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth/mutations/use-logout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import UpdateProfile from "./update-profile";
import { useState } from "react";
import { MeResponse } from "@/types/user";
import ActionButton from "@/components/button/action-button";
import { ReusableDialog } from "@/components/dialog/dialog";

export default function AccountActions({ user }: { user: MeResponse }) {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();
  const { mutateAsync, isPending } = useLogout();

  async function logOut() {
    try {
      const response = await mutateAsync();
      if (response.success) {
        toast.success(response.message ?? "Logout successfully!");
        router.push("/signin");
      }
      toast.error(response.message ?? "Logout failed");
    } catch (error) {
      toast.error("something went wrong");
    }
  }

  function handleOpen() {
    setIsEdit(true);
  }
  function handleClose() {
    setIsEdit(false);
  }

  return (
    <>
      <Card className='glass-card'>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>

        <CardContent className='space-y-3'>
          <Button onClick={handleOpen} variant='outline' className='w-full'>
            <Pencil className='mr-2 size-4' />
            Edit Profile
          </Button>

          <Button variant='outline' className='w-full'>
            <KeyRound className='mr-2 size-4' />
            Change Password
          </Button>

          <ActionButton
            isLoading={isPending}
            variant='destructive'
            className='w-full'
            onClick={logOut}
            loadingText='logout...'
          >
            <LogOut className='mr-2 size-4' />
            Logout
          </ActionButton>
        </CardContent>
      </Card>
      <ReusableDialog isOpen={isEdit} onOpenChange={handleClose}>
        <UpdateProfile user={user} handleClose={handleClose} />
      </ReusableDialog>
    </>
  );
}
