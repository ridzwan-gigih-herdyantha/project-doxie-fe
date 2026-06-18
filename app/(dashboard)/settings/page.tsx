import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { listDocuments } from "../documents/action";
import { BillingTab } from "./_components/billing-tab";

const TABS = [
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

export default async function SettingsPage() {
  const result = await listDocuments();
  const documentCount = result.success ? result.data.length : 0;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

      <Tabs defaultValue="billing" className="gap-6">
        <TabsList variant="line" className="h-auto justify-start gap-6 rounded-none border-b border-border bg-transparent p-0">
          {TABS.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              className={cn(
                "rounded-none border-0 border-b-4 border-transparent bg-transparent px-1 pb-3 font-mono text-sm text-muted-foreground shadow-none",
                "data-[state=active]:border-[#68DBA9] data-[state=active]:bg-transparent data-[state=active]:text-[#68DBA9] data-[state=active]:shadow-none",
              )}
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="profile">
          <PlaceholderTab title="Profile" />
        </TabsContent>
        <TabsContent value="workspace">
          <PlaceholderTab title="Workspace" />
        </TabsContent>
        <TabsContent value="billing">
          <BillingTab documentCount={documentCount} limit={5} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
