"use server";

import { api } from "@/lib/api/client";
import { ApiError } from "@/lib/api/errors";
import { setToken, setUser } from "@/lib/auth/session";

interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      avatar_url?: string | null;
    };
    token: string;
  };
}

export interface AuthFormState {
  /** Top-level error (invalid credentials, network, etc.). */
  error?: string;
  /** Field-keyed validation messages from a Laravel 422 response. */
  fieldErrors?: Record<string, string[]>;
  /** Submitted values to repopulate the form after an error. */
  values?: Record<string, string>;
  /** Set on a successful auth so the client can toast + navigate. */
  success?: boolean;
}

export async function login(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const values = { email };

  if (!email || !password) {
    return { error: "Email and password required to fill.", values };
  }

  try {
    const res = await api.post<AuthResponse>(
      "/auth/login",
      { email, password },
      { skipAuth: true },
    );
    await setToken(res.data?.token);
    if (res.data?.user) {
      await setUser({
        ...res.data.user,
        avatar_url: res.data.user.avatar_url ?? null,
      });
    }
  } catch (error) {
    return { ...toAuthError(error), values };
  }

  return { success: true };
}

export async function register(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const passwordConfirmation = String(formData.get("password_confirmation") ?? "");
  const values = { name, email };

  if (!name || !email || !password) {
    return { error: "All fields required to fill.", values };
  }
  if (password !== passwordConfirmation) {
    return {
      fieldErrors: { password_confirmation: ["Password confirmation doesn't match"] },
      values,
    };
  }

  try {
    const res = await api.post<AuthResponse>(
      "/auth/register",
      { name, email, password, password_confirmation: passwordConfirmation },
      { skipAuth: true },
    );
    await setToken(res.data?.token);
    if (res.data?.user) {
      await setUser({
        ...res.data.user,
        avatar_url: res.data.user.avatar_url ?? null,
      });
    }
  } catch (error) {
    return { ...toAuthError(error), values };
  }

  return { success: true };
}

/** Translate an API failure into form state, surfacing the API's own message. */
function toAuthError(error: unknown): AuthFormState {
  if (error instanceof ApiError) {
    return {
      error: error.message,
      fieldErrors: error.validationErrors ?? undefined,
    };
  }
  return { error: "Couldn't connect to the server. Please try again later." };
}
