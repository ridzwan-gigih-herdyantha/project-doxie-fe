"use client";

import { useState } from "react";
import {
  CircleCheck,
  CreditCard,
  Download,
  Info,
  Plus,
  TriangleAlert,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

const PRO_FEATURES = [
  "Unlimited Documents",
  "Advanced AI Model access",
  "Team Collaboration tools",
  "Priority Support",
];

const INVOICES = [
  { period: "Nov 2023", amount: "$0.00 (Free)" },
  { period: "Oct 2023", amount: "$0.00 (Free)" },
];

export function BillingTab({
  documentCount = 0,
  limit = 5,
}: {
  documentCount?: number;
  limit?: number;
}) {
  return (
    <div className="grid items-start gap-4 lg:grid-cols-3">
      <div className="flex flex-col gap-4 lg:col-span-2">
        {/* Equal-height plan cards (grid items stretch). */}
        <div className="grid gap-4 sm:grid-cols-2">
          <CurrentPlanCard documentCount={documentCount} limit={limit} />
          <ProCard />
        </div>
        <PaymentMethodsCard />
      </div>

      <div className="flex flex-col gap-4">
        <RecentInvoicesCard />
        <BillingPreferencesCard />
      </div>
    </div>
  );
}

function CurrentPlanCard({
  documentCount,
  limit,
}: {
  documentCount: number;
  limit: number;
}) {
  const used = Math.min(documentCount, limit);
  const percent = limit > 0 ? Math.min(100, (documentCount / limit) * 100) : 0;
  const reached = documentCount >= limit;

  return (
    <Card className="flex flex-col gap-0 p-6">
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            Current Plan
          </span>
          <Info className="size-4 text-muted-foreground" />
        </div>

        <h3 className="mt-4 text-xl font-semibold">Free Plan</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          For personal exploration and small tasks.
        </p>

        <div className="mt-6">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Usage</span>
            <span className="font-medium">
              {used} / {limit} Documents
            </span>
          </div>
          <Progress
            value={percent}
            className="mt-2 h-1.5 [&>[data-slot=progress-indicator]]:bg-[#68DBA9]"
          />
          {reached ? (
            <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-amber-500">
              <TriangleAlert className="size-3.5" />
              Limit reached
            </p>
          ) : (
            <p className="mt-2 text-xs text-muted-foreground">
              {limit - documentCount} document
              {limit - documentCount === 1 ? "" : "s"} remaining
            </p>
          )}
        </div>
      </div>

      <Button
        variant="secondary"
        className="mt-6 w-full"
        onClick={() => toast("Usage management is coming soon.")}
      >
        Manage Usage
      </Button>
    </Card>
  );
}

function ProCard() {
  return (
    <Card className="flex flex-col gap-0 border-0 bg-linear-to-br from-[#3DDC97] to-[#34D399] p-6 text-[#0C2A1E]">
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <span className="rounded-md bg-[#0C2A1E]/15 px-2.5 py-1 text-xs font-semibold">
            Recommended
          </span>
          <p className="flex items-baseline gap-0.5 text-lg font-bold">
            $19
            <span className="text-xs font-medium opacity-70">/mo</span>
          </p>
        </div>

        <h3 className="mt-4 text-xl font-semibold">Doxie Pro</h3>
        <p className="mt-1 text-sm opacity-80">
          Unlock the full power of AI research.
        </p>

        <ul className="mt-5 flex flex-col gap-2.5">
          {PRO_FEATURES.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm font-medium">
              <CircleCheck className="size-4 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <Button
        className="mt-6 w-full bg-[#0C2A1E] text-[#3DDC97] hover:bg-[#0C2A1E]/90"
        onClick={() => toast.success("Upgrade flow coming soon — this is a PoC.")}
      >
        Upgrade Now
      </Button>
    </Card>
  );
}

function PaymentMethodsCard() {
  return (
    <Card className="gap-0 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Payment Methods</h3>
        <button
          type="button"
          onClick={() => toast("Add payment method coming soon.")}
          className="flex items-center gap-1.5 text-sm font-medium text-[#68DBA9] hover:underline"
        >
          <Plus className="size-4" />
          Add method
        </button>
      </div>

      <div className="mt-5 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-14 text-center">
        <div className="flex size-12 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <CreditCard className="size-5" />
        </div>
        <div>
          <p className="text-sm font-semibold">No payment methods found</p>
          <p className="mx-auto mt-1 max-w-xs text-xs text-muted-foreground">
            Add a credit card or PayPal to start your Pro subscription.
          </p>
        </div>
      </div>
    </Card>
  );
}

function RecentInvoicesCard() {
  return (
    <Card className="gap-0 p-6">
      <h3 className="text-lg font-semibold">Recent Invoices</h3>

      <div className="mt-5 flex flex-col gap-4">
        {INVOICES.map((inv) => (
          <div key={inv.period} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{inv.period}</p>
              <p className="text-xs text-muted-foreground">{inv.amount}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Download ${inv.period} invoice`}
              className="text-muted-foreground"
              onClick={() => toast.success(`Downloading ${inv.period} invoice…`)}
            >
              <Download className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => toast("Invoice history coming soon.")}
        className="mt-5 block w-full text-center text-sm font-medium text-[#68DBA9] hover:underline"
      >
        View all history
      </button>
    </Card>
  );
}

function BillingPreferencesCard() {
  const [emailReceipts, setEmailReceipts] = useState(true);

  return (
    <Card className="gap-0 p-6">
      <h3 className="text-lg font-semibold">Billing Preferences</h3>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Email Receipts</p>
          <p className="text-xs text-muted-foreground">Send monthly statements</p>
        </div>
        <Switch
          checked={emailReceipts}
          onCheckedChange={(checked) => {
            setEmailReceipts(checked);
            toast.success(
              checked ? "Email receipts enabled." : "Email receipts disabled.",
            );
          }}
          className="data-checked:bg-[#68DBA9]"
        />
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">Tax ID</p>
          <p className="text-xs text-muted-foreground">VAT / GST Information</p>
        </div>
        <button
          type="button"
          onClick={() => toast("Edit Tax ID coming soon.")}
          className="text-sm font-medium text-[#68DBA9] hover:underline"
        >
          Edit
        </button>
      </div>
    </Card>
  );
}
