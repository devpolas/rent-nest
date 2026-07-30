import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForgetPasswordForm from "./forget-password-form";
import { Metadata } from "next";
import { Heading4 } from "@/components/typography/typography";
import Logo from "@/components/logo/logo";

export const metadata: Metadata = {
  title: "Forget Password",
  description: "Rent Nest Forget Password Page",
};

export default function ForgetPassword() {
  return (
    <Card className='w-full max-w-sm'>
      <div className='flex flex-col justify-center items-center gap-4'>
        <Logo />
        <Heading4 text='Welcome Back to Rent Nest' />
      </div>
      <CardHeader>
        <CardTitle>Forget Password</CardTitle>
        <CardDescription>
          Please provide the email address associated with your account. We will
          send you a link to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgetPasswordForm />
      </CardContent>
    </Card>
  );
}
