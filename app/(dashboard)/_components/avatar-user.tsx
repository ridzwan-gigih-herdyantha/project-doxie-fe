import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ModalLogout } from "./modal/modal-logout"

export function AvatarUser() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar size="default">
            <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
            My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start"
            >
              <Link href="/profile">Profile</Link>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start"
            >
              <Link href="/settings">Settings</Link>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <ModalLogout/>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
