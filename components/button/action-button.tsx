import { cn } from "@/lib/utils";
import LoadingSpinner from "@/components/spinner/loading-spinner";
import { Button } from "@/components/ui/button";

type ActionButtonProps = {
  children: React.ReactNode;
  loadingText?: string;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
  icon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function ActionButton({
  children,
  loadingText = "Please wait...",
  isLoading = false,
  disabled = false,
  className,
  variant = "default",
  icon,
  type = "button",
  onClick,
}: ActionButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      variant={variant}
      disabled={disabled || isLoading}
      className={cn(
        "group relative w-full overflow-hidden",
        "transition-all duration-300",
        "active:scale-[0.98]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variant === "default" && [
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90",
          "hover:shadow-md",
          "hover:-translate-y-0.5",
        ],
        className,
      )}
    >
      <span
        className={cn(
          "flex justify-center items-center gap-2",
          "transition-all duration-300",
          isLoading && "opacity-0",
        )}
      >
        {icon}
        {children}
      </span>

      {isLoading && (
        <span className='absolute inset-0 flex justify-center items-center animate-in duration-200 fade-in zoom-in-95'>
          <LoadingSpinner text={loadingText} />
        </span>
      )}
    </Button>
  );
}
