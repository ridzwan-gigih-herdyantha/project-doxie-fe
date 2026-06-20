import type { Metadata } from "next";

import { LoginForm } from "@/app/(auth)/login/login-form";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-lg">Welcome Back</CardTitle>
        <CardDescription className="font-inter">Please enter your details to sign in.</CardDescription>
        <Button type="submit" variant="outline" className="w-full my-4 rounded-sm dark:bg-[#3D4A42]/10 dark:border-[#3D4A42] hover:dark:bg-[#3D4A42]/30">
          <Image
            src="/logo/google-icon.svg"
            alt="Google"
            width={14}
            height={14}
            priority
            unoptimized
          />
          Sign in with Google
        </Button>
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
