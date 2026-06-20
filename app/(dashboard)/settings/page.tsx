import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { getUser } from "@/lib/auth/session";
import { serverEnv } from "@/lib/env";
import { ADMIN_EMAIL } from "@/lib/brand-theme";
import { listDocuments } from "../documents/action";
import { BillingTab } from "./_components/billing-tab";
import { EditProfile } from "./_components/edit-profile";
import { BrandEditor } from "./_components/brand-editor";

const BASE_TABS = [
  { value: "profile", label: "Profile" },
  { value: "workspace", label: "Workspace" },
  { value: "billing", label: "Billing" },
];

function PlaceholderTab({ title }: { title: string }) {
  return (
    <Card className="items-center justify-center gap-1 p-12 text-center">
      <p className="text-sm font-semibold">{title} settings</p>
      <p className="text-sm text-muted-foreground">Coming soon.</p>
    </Card>
  );
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const [result, user, { tab }] = await Promise.all([
    listDocuments(),
    getUser(),
    searchParams,
  ]);
  const documentCount = result.success ? result.data.length : 0;
  const isAdmin =
    serverEnv.allowRuntimeBranding && user?.email === ADMIN_EMAIL;
  const tabs = isAdmin
    ? [...BASE_TABS, { value: "branding", label: "Branding" }]
    : BASE_TABS;
  const activeTab = tabs.some((t) => t.value === tab) ? tab : "billing";

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

      <Tabs defaultValue={activeTab} className="gap-6">
        <TabsList variant="line" className="h-auto justify-start gap-6 rounded-none border-b border-border bg-transparent p-0">
          {tabs.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              className={cn(
                "rounded-none border-0 border-b-4 border-transparent bg-transparent px-1 pb-3 font-mono text-sm text-muted-foreground shadow-none",
                "data-[state=active]:border-brand data-[state=active]:bg-transparent data-[state=active]:text-brand data-[state=active]:shadow-none",
              )}
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile">
          <EditProfile
            defaultName={user?.name ?? ""}
            defaultEmail={user?.email ?? ""}
            defaultAvatarUrl={user?.avatar_url ?? undefined}
          />
        </TabsContent>
        <TabsContent value="workspace">
          <PlaceholderTab title="Workspace" />
        </TabsContent>
        <TabsContent value="billing">
          <BillingTab documentCount={documentCount} limit={5} />
        </TabsContent>
        {isAdmin && (
          <TabsContent value="branding">
            <BrandEditor />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
