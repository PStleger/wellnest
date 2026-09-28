import { startDemo } from "@/app/(auth)/actions";
import { SubmitButton } from "@/components/ui/submit-button";

type DemoButtonProps = {
  children?: React.ReactNode;
  next?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "soft" | "ghost";
  className?: string;
};

/** Starts a guest session pre-filled with two weeks of sample data. Works without JavaScript. */
export function DemoButton({ children = "Try the demo", next, size, variant, className }: DemoButtonProps) {
  return (
    <form action={startDemo} className="contents">
      {next ? <input type="hidden" name="next" value={next} /> : null}
      <SubmitButton size={size} variant={variant} className={className} pendingLabel="Preparing your nest…">
        {children}
      </SubmitButton>
    </form>
  );
}
