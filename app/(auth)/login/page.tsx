import type { Metadata } from "next";

import { LoginForm } from "@/app/(auth)/login/login-form";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth/session";
import { GoogleAuthButton } from "@/app/(auth)/google-auth-button";

export const metadata: Metadata = {
  title: "Sign In",
};

export default async function LoginPage() {
  const token = await getToken();
  if (token) {
    redirect("/dashboard");
  }

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Welcome Back</CardTitle>
        <CardDescription className="font-inter">Please enter your details to sign in.</CardDescription>
        <GoogleAuthButton label="Sign in with Google" />
        <div className="flex items-center w-full gap-4">
          <Separator className="flex-1 bg-[#3D4A42]" />
          <span className="text-sm whitespace-nowrap text-muted-foreground">
            or continue with email
          </span>
          <Separator className="flex-1 bg-[#3D4A42]" />
        </div>
      </CardHeader>

      <CardContent>
        <LoginForm />

        {/* <p className="text-muted-foreground mt-6 text-center text-sm">
          Belum punya akun?{" "}
          <Link href="/register" className="text-primary font-medium underline">
            Daftar
          </Link>
        </p> */}
      </CardContent>

      <CardContent>
        <p className="text-muted-foreground mt-4 text-center text-sm font-inter">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-brand font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </CardContent>
    </>
  );
}
