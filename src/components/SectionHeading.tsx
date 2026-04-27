import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "text-center" : "text-left",
        "max-w-2xl",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-[11px] tracking-[0.22em] uppercase text-ink-50">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 font-display text-3xl tracking-tight text-ink-300 sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-base leading-7 text-ink-50">{subtitle}</p>
      ) : null}
    </div>
  );
}

