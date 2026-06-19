"use server";

export interface UpdateProfileInput {
  name: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface UpdateProfileResult {
  success: boolean;
  message: string;
}

/**
 * Dummy profile update — simulates a request and always succeeds.
 * TODO: wire to the real endpoint, e.g. `api.put("/profile", input)` (and a
 * multipart upload for the avatar). Avatar is currently preview-only on the
 * client and not persisted.
 */
export async function updateProfile(
  input: UpdateProfileInput,
): Promise<UpdateProfileResult> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  console.log("updateProfile (dummy):", {
    name: input.name,
    email: input.email,
    changedPassword: Boolean(input.newPassword),
  });

  return { success: true, message: "Profile updated successfully." };
}
