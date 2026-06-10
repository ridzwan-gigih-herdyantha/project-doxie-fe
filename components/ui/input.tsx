import * as React from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, LockKeyhole, LucideIcon, LucideProps } from "lucide-react"

export type InputProps = React.ComponentProps<"input"> & {
  startIcon?: LucideIcon
  endIcon?: LucideIcon
  iconProps?: LucideProps
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon: StartIcon, endIcon: EndIcon, iconProps = {}, ...props }, ref) => {
    const [show, setShow] = React.useState(false)
    const { className: iconClassName, ...iconRest } = iconProps

    const baseInput = cn(
      "h-8 w-full min-w-0 rounded-sm border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
      className
    )

    const iconBase = cn("text-muted-foreground pointer-events-none", iconClassName)

    if (type === "password") {
      return (
        <div className="relative flex items-center w-full">
          <LockKeyhole
            size={14}
            className={cn("absolute left-2.5", iconBase)}
            {...iconRest}
          />
          <input
            {...props}
            ref={ref}
            autoComplete="off"
            type={show ? "text" : "password"}
            className={cn(baseInput, "pl-8 pr-8")}
          />
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute right-2.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            {show
              ? <Eye size={16} />
              : <EyeOff size={16} />
            }
          </button>
        </div>
      )
    }

    return (
      <div className="relative flex items-center w-full">
        {StartIcon && (
          <StartIcon
            size={14}
            className={cn("absolute left-2.5", iconBase)}
            {...iconRest}
          />
        )}
        <input
          {...props}
          ref={ref}
          type={type}
          className={cn(
            baseInput,
            StartIcon && "pl-8",
            EndIcon && "pr-8",
          )}
        />
        {EndIcon && (
          <EndIcon
            size={14}
            className={cn("absolute right-2.5", iconBase)}
            {...iconRest}
          />
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }