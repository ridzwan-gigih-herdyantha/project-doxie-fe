import Link from "next/link";
import type { Metadata } from "next";

import { RegisterForm } from "@/app/(auth)/register/register-form";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function RegisterPage() {
  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Create an account</CardTitle>
        <CardDescription>Complete the following details to register.</CardDescription>
      </CardHeader>

      <CardContent>
        <RegisterForm />

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-[#68DBA9] font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </CardContent>
    </>
  );
}
