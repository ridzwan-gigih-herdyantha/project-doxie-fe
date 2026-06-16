import * as React from "react";
import Link from "next/link";
import { FileText, MessageSquare, Settings, type LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

type ActivityKind = "chat" | "document" | "system";

export interface ActivityItem {
  id: string | number;
  kind: ActivityKind;
  title: React.ReactNode;
  description: string;
  time: string;
}

const KIND: Record<ActivityKind, { Icon: LucideIcon; className: string }> = {
  chat: { Icon: MessageSquare, className: "text-[#68DBA9]" },
  document: { Icon: FileText, className: "text-[#68DBA9]" },
  system: { Icon: Settings, className: "text-muted-foreground" },
};

const SAMPLE: ActivityItem[] = [
  {
    id: 1,
    kind: "chat",
    title: (
      <>
        New chat on <span className="text-[#68DBA9]">Q4 Report.pdf</span>
      </>
    ),
    description: "“Can you summarize the Q3 financials?”",
    time: "2m ago",
  },
  {
    id: 2,
    kind: "document",
    title: (
      <>
        Document <span className="text-[#68DBA9]">Product Spec v2.pdf</span> uploaded
      </>
    ),
    description: "Successfully parsed 12 pages of content.",
    time: "15m ago",
  },
  {
    id: 3,
    kind: "system",
    title: "API Key generated",
    description: "A new private key was created for production use.",
    time: "1h ago",
  },
];

export default function RecentActivity({
  items = SAMPLE,
  viewAllHref = "#",
  className,
}: {
  items?: ActivityItem[];
  viewAllHref?: string;
  className?: string;
}) {
  return (
    <Card className={cn("gap-0 p-0", className)}>
      <div className="flex items-center justify-between px-5 py-4">
        <h3 className="text-sm font-semibold text-foreground">Recent Activities</h3>
        <Link
          href={viewAllHref}
          className="text-xs font-medium text-[#68DBA9] hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="flex flex-col">
        {items.map((item) => {
          const { Icon, className: iconClassName } = KIND[item.kind];

          return (
            <div key={item.id}>
              <div className="flex items-start gap-3 px-5 my-1 py-3.5">
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted/40",
                    iconClassName,
                  )}
                >
                  <Icon className="size-4" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground">{item.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                <span className="shrink-0 text-[0.65rem] font-medium uppercase tracking-wide text-muted-foreground">
                  {item.time}
                </span>
              </div>
              {item.id !== items[items.length - 1]?.id && (
                <div className="px-5">
                  <Separator />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
