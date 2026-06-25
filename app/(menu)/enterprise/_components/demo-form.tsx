"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VOLUMES = [
  "Under 10,000 pages",
  "10,000 - 50,000 pages",
  "50,000 - 200,000 pages",
  "200,000+ pages",
];

const labelClass =
  "font-mono text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground";

export function DemoForm() {
  return (
    <form
      className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 ring-1 ring-foreground/5 sm:p-8"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="first-name" className={labelClass}>
            First Name
          </Label>
          <Input id="first-name" placeholder="John" className="h-10" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="last-name" className={labelClass}>
            Last Name
          </Label>
          <Input id="last-name" placeholder="Doe" className="h-10" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="work-email" className={labelClass}>
          Work Email
        </Label>
        <Input
          id="work-email"
          type="email"
          placeholder="john@enterprise.com"
          className="h-10"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="company" className={labelClass}>
          Company Name
        </Label>
        <Input id="company" placeholder="Acme Global Inc." className="h-10" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className={labelClass}>Estimated Monthly Volume</Label>
        <Select defaultValue={VOLUMES[1]}>
          <SelectTrigger className="h-10 w-full">
            <SelectValue placeholder="Select volume" />
          </SelectTrigger>
          <SelectContent>
            {VOLUMES.map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        type="submit"
        className="mt-1 h-11 w-full bg-brand text-brand-foreground hover:bg-brand/90"
      >
        Request Enterprise Demo
      </Button>
    </form>
  );
}
