import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect} from "react"

const MODELS = [
  { id: "gpt-4o", label: "GPT-4.0" },
  { id: "claude-opus-4-7", label: "Claude Opus 4.7" },
  { id: "gemini-3-1", label: "Gemini 3.1" },
]

export function ModelDropdown() {
    const [model, setModel] = useState<string>(MODELS[0].id);
    const selectedModel = MODELS.find(m => m.id === model)

    // useEffect(() => {
    //   // Update chosen model
    // }, [model]);

    return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{selectedModel?.label}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Select Model</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={model}
            onValueChange={setModel}
          >
           {MODELS.map((model) => (
              <DropdownMenuRadioItem
                key={model.id}
                value={model.id}
                className="capitalize"
              >
                {model.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
