import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"

/**
 * @param title Card title (rendered as a small uppercase label)
 * @param description Optional secondary line under the title
 * @param value Main statistic value
 * @param total Optional denominator rendered as “/ total” after the value
 * @param textPosition Side the text column sits on; the icon/action takes the other
 * @param icon Icon shown in an accent badge, vertically centered in its column
 * @param action Element shown instead of the icon (e.g. a button)
 */
export interface StatCardProps
  extends React.ComponentPropsWithoutRef<typeof Card> {
  title: string
  description?: string
  value: string | number
  total?: string | number
  textPosition?: "left" | "right"
  icon?: React.ReactNode
  action?: React.ReactNode
}

export default function StatCard({
  title,
  description,
  value,
  total,
  textPosition = "left",
  icon,
  action,
  className,
  ...props
}: StatCardProps) {
  return (
    <Card className={className} {...props}>
      <CardContent
        className={cn(
          "flex items-center justify-between gap-4 mx-1",
          textPosition === "right" && "flex-row-reverse"
        )}
      >
        <div
          className={cn(
            "flex min-w-0 flex-col gap-2",
            textPosition === "right" && "items-end text-right"
          )}
        >
          <div className="grid gap-1">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {title}
            </CardTitle>

            {description && (
              <CardDescription className="text-xs">{description}</CardDescription>
            )}
          </div>

          <p className="flex items-baseline gap-1.5">
            <span className="font-heading text-2xl font-semibold text-foreground">
              {value}
            </span>

            {total !== undefined && (
              <span className="text-sm font-medium text-muted-foreground">
                / {total}
              </span>
            )}
          </p>
        </div>

        {action ? (
          <div className="shrink-0">{action}</div>
        ) : icon ? (
          <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#68DBA9]/10 text-[#68DBA9] ring-1 ring-[#68DBA9]/15 [&_svg]:size-5">
            {icon}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}
