import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// TODO: Implement download logic export something(not sure yet what's to export)
export default function ExportButton() {
    return (
        <Button className="bg-gray-800 hover:bg-gray-900 items-center py-4 px-2" aria-label="Export to PDF">
            <Download/>
            <span className="ml-1">Export</span>
        </Button>
    );
}