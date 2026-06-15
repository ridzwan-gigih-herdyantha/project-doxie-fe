import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

export default function NotificationBell() {
    return (
        <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell />
        </Button>
    )
}