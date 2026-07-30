import { Metadata } from "next";
import VerifyEmail from "./VerifyEmail";

export const metadata: Metadata = {
  title: "Verify Account",
  description: "Rent Nest Verify Account Page",
};

export default function VerifyAccount() {
  return <VerifyEmail />;
}
