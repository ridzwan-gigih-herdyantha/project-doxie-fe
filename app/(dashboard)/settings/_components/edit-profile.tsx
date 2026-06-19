"use client";

import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { updateProfile } from "../action";

const MAX_AVATAR_MB = 3;

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  return parts
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

export function EditProfile({
  defaultName = "",
  defaultEmail = "",
  defaultAvatarUrl,
}: {
  defaultName?: string;
  defaultEmail?: string;
  defaultAvatarUrl?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(defaultName);
  const [email, setEmail] = useState(defaultEmail);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    defaultAvatarUrl ?? null,
  );
  const [saving, setSaving] = useState(false);

  const handlePickAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Avatar must be an image file.");
      return;
    }
    if (file.size > MAX_AVATAR_MB * 1024 * 1024) {
      toast.error(`Avatar must be smaller than ${MAX_AVATAR_MB}MB.`);
      return;
    }
    setAvatarPreview(URL.createObjectURL(file));
    toast.success("Avatar selected. Save changes to apply.");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return toast.error("Name is required.");
    if (!email.trim()) return toast.error("Email is required.");

    const changingPassword =
      currentPassword !== "" || newPassword !== "" || confirmPassword !== "";
    if (changingPassword) {
      if (!currentPassword)
        return toast.error("Enter your current password to change it.");
      if (newPassword.length < 8)
        return toast.error("New password must be at least 8 characters.");
      if (newPassword !== confirmPassword)
        return toast.error("Password confirmation doesn't match.");
    }

    setSaving(true);
    const toastId = toast.loading("Saving changes…");
    try {
      const result = await updateProfile({
        name: name,
        email: email.trim(),
        currentPassword: changingPassword ? currentPassword : undefined,
        newPassword: changingPassword ? newPassword : undefined,
      });

      if (result.success) {
        toast.success(result.message, { id: toastId });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(result.message, { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Couldn't save changes. Please try again.", { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Profile */}
      <Card className="gap-6 p-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Avatar className="size-20">
              {avatarPreview ? (
                <AvatarImage src={avatarPreview} alt={name || "Avatar"} />
              ) : null}
              <AvatarFallback className="text-2xl">
                {initialsOf(name)}
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              aria-label="Change avatar"
              className="absolute bottom-0 right-1 flex size-7 items-center justify-center rounded-full bg-[#68DBA9] text-[#141B2B] ring-4 ring-card transition-colors hover:bg-[#68DBA9]/90"
            >
              <Camera className="size-4" />
            </button>
          </div>

          <div>
            <p className="text-sm font-medium">Profile photo</p>
            <p className="text-xs text-muted-foreground">
              JPG, PNG or GIF. Max {MAX_AVATAR_MB}MB.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => fileRef.current?.click()}
            >
              Change photo
            </Button>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePickAvatar}
          />
        </div>

        <Separator />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
        </div>
      </Card>

      {/* Change password */}
      <Card className="gap-4 p-6">
        <div>
          <h3 className="text-sm font-semibold">Change password</h3>
          <p className="text-xs text-muted-foreground">
            Leave these blank to keep your current password.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="currentPassword">Current password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="newPassword">New password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="confirmPassword">Confirm new password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={saving}
          className="gap-2 bg-[#68DBA9] text-[#141B2B] hover:bg-[#68DBA9]/90"
        >
          {saving && <Spinner className="size-4" />}
          Save changes
        </Button>
      </div>
    </form>
  );
}