"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { register, type AuthFormState } from "@/app/(auth)/actions";
import { AuthField } from "@/app/(auth)/_components/auth-field";
import { FormError } from "@/app/(auth)/_components/form-error";
import { SubmitButton } from "@/app/(auth)/_components/submit-button";

const initialState: AuthFormState = {};

export function RegisterForm() {
  const [state, formAction] = useActionState(register, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success("Account created successfully! Please sign in.");
      router.push("/login");
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      <FormError message={state.error} />

      <AuthField
        label="Name"
        name="name"
        autoComplete="name"
        required
        defaultValue={state.values?.name}
        errors={state.fieldErrors?.name}
      />

      <AuthField
        label="Email Address"
        name="email"
        type="email"
        autoComplete="email"
        required
        defaultValue={state.values?.email}
        errors={state.fieldErrors?.email}
      />

      <AuthField
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        errors={state.fieldErrors?.password}
      />

      <AuthField
        label="Confirm Password"
        name="password_confirmation"
        type="password"
        autoComplete="new-password"
        required
        errors={state.fieldErrors?.password_confirmation}
      />

      <SubmitButton pendingText="Processing…">Sign Up</SubmitButton>
    </form>
  );
}
