import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type TypographyProps = {
  children: ReactNode;
  className?: string;
};

export function Heading1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "font-extrabold text-foreground text-4xl md:text-5xl lg:text-6xl text-balance tracking-tight scroll-m-20",
        className,
      )}
    >
      {children}
    </h1>
  );
}

export function Heading2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "first:mt-0 pb-3 border-border border-b font-bold text-foreground text-3xl md:text-4xl tracking-tight scroll-m-20",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function Heading3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        "font-semibold text-foreground text-2xl md:text-3xl tracking-tight scroll-m-20",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function Heading4({ children, className }: TypographyProps) {
  return (
    <h4
      className={cn(
        "font-semibold text-foreground text-xl tracking-tight scroll-m-20",
        className,
      )}
    >
      {children}
    </h4>
  );
}

export function Heading5({ children, className }: TypographyProps) {
  return (
    <h5
      className={cn(
        "font-semibold text-foreground text-lg tracking-tight scroll-m-20",
        className,
      )}
    >
      {children}
    </h5>
  );
}

export function Heading6({ children, className }: TypographyProps) {
  return (
    <h6
      className={cn(
        "font-semibold text-foreground text-base tracking-tight scroll-m-20",
        className,
      )}
    >
      {children}
    </h6>
  );
}

export function Lead({ children, className }: TypographyProps) {
  return (
    <p
      className={cn("text-brand-muted text-lg md:text-xl leading-8", className)}
    >
      {children}
    </p>
  );
}

export function Paragraph({ children, className }: TypographyProps) {
  return (
    <p
      className={cn(
        "not-first:mt-4 text-muted-foreground leading-7",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Large({ children, className }: TypographyProps) {
  return (
    <p className={cn("font-semibold text-foreground text-lg", className)}>
      {children}
    </p>
  );
}

export function Small({ children, className }: TypographyProps) {
  return (
    <small
      className={cn(
        "font-medium text-muted-foreground text-sm leading-none",
        className,
      )}
    >
      {children}
    </small>
  );
}

export function Muted({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>
  );
}

export function Caption({ children, className }: TypographyProps) {
  return (
    <span className={cn("text-muted-foreground text-xs", className)}>
      {children}
    </span>
  );
}

export function Label({ children, className }: TypographyProps) {
  return (
    <span className={cn("font-medium text-foreground text-sm", className)}>
      {children}
    </span>
  );
}

export function Brand({ children, className }: TypographyProps) {
  return (
    <span className={cn("font-semibold text-brand", className)}>
      {children}
    </span>
  );
}
