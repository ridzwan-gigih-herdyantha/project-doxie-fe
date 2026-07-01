import Link from "next/link";
import type { Metadata } from "next";

import { RegisterForm } from "@/app/(auth)/register/register-form";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GoogleAuthButton } from "@/app/(auth)/google-auth-button";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function RegisterPage() {
  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Create an account</CardTitle>
        <CardDescription>Complete the following details to register.</CardDescription>
        <GoogleAuthButton label="Sign up with Google" />
        <div className="flex items-center w-full gap-4">
          <Separator className="flex-1 bg-[#3D4A42]" />
          <span className="text-sm whitespace-nowrap text-muted-foreground">
            or continue with email
          </span>
          <Separator className="flex-1 bg-[#3D4A42]" />
        </div>
      </CardHeader>

      <CardContent>
        <RegisterForm />

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-brand font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </CardContent>
    </>
  );
}
