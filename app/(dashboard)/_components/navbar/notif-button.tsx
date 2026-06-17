import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { cn } from "@/lib/utils"

export default function NotificationBell({className}: {className?: string}) {
    return (
        <Button className={cn(className)} variant="ghost" size="icon" aria-label="Notifications">
            <Bell />
        </Button>
    )
}