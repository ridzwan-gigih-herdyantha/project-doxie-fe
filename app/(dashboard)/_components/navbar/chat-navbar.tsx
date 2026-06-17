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
import { ChevronDown, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ExportButton from "../export-button";

// AI ChatBot Models
const MODELS = [
  { id: "gpt-4o", label: "ChatGPT 4.0" },
  { id: "claude-3-5-sonnet-20241022", label: "Claude 3.5 Sonnet" },
  { id: "gemini-2.5-flash", label: "Gemini 2.5 Flash" },
]

export function ChatNavbar() {
    const [model, setModel] = useState<string>(MODELS[0].id);
    const selectedModel = MODELS.find(m => m.id === model)
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedDocument, setSelectedDocument] = useState<string>("");

    function handleOpenChange(open: boolean) {
      setIsOpen(open);
    }

    // useEffect(() => {
    //   // Update chosen model
    //   if (isOpen) {
        
    //   }
    // }, [model, isOpen]);

    return (
      <div className="flex w-full justify-between items-center gap-2 p-2">
        <div className="flex w-full justify-start items-center gap-2">
          {selectedDocument && (
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                <h1 className="text-sm font-semibold text-foreground">{selectedDocument}</h1>
              </div>
              <Separator orientation="vertical" className="my-2 mx-4" />
            </div>
          )}
          <div className="flex gap-2 items-center py-1 pl-2 pr-1 rounded-xl border border-border bg-[#141B2B]">
            <h1 className="text-sm font-semibold text-foreground">
              Model 
            </h1>
            <DropdownMenu onOpenChange={handleOpenChange}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {selectedModel?.label}
                  {isOpen ? (
                    <ChevronDown className="ml-2 h-4 w-4 transform transition duration-300 rotate-180" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4 transform transition duration-300" />
                  )}
                </Button>
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
          </div>
        </div>
        <ExportButton/>
      </div>
  )
}
