"use client";

import { useActionState, useEffect } from "react";

import { login, type AuthFormState } from "@/app/(auth)/actions";
import { AuthField } from "@/app/(auth)/_components/auth-field";
import { FormError } from "@/app/(auth)/_components/form-error";
import { SubmitButton } from "@/app/(auth)/_components/submit-button";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const initialState: AuthFormState = {};

export function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success("Signed in successfully!");
      router.push("/");
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      <FormError message={state.error} />

      <AuthField
        label="Email Address"
        name="email"
        type="email"
        startIcon={Mail}
        autoComplete="email"
        required
        defaultValue={state.values?.email}
        errors={state.fieldErrors?.email}
      />

      <AuthField
        label="Password"
        name="password"
        type="password"
        ref_text="Forgot password?"
        ref_link="/forgot-password"
        autoComplete="current-password"
        required
        errors={state.fieldErrors?.password}
      />

      <div className="flex items-center justify-start gap-2 my-2">
        <Checkbox id="remember" name="remember" value="true" />
        <label
          htmlFor="remember"
          className="flex cursor-pointer items-start text-sm text-muted-foreground peer-data-[state=checked]:text-[#68DBA9]"
        >
          <span className="font-inter">Remember me for 30 days</span>
        </label>
      </div>

      <SubmitButton pendingText="Processing...">Sign In</SubmitButton>
    </form>
  );
}
