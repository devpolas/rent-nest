import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Caption } from "@/components/typography/typography";

type Props = {
  icon: LucideIcon;
  title: string;
  className?: string;
};

export default function HeroFeatureChip({
  icon: Icon,
  title,
  className,
}: Props) {
  return (
    <div
      className={cn(
        `
        group
        flex
        items-center
        gap-2.5
        rounded-full
        border
        border-white/20
        bg-white/10
        px-4
        py-2
        backdrop-blur-xl
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-brand/30
        hover:bg-brand/10
        `,
        className,
      )}
    >
      <div
        className="
        grid
        size-7
        place-items-center
        rounded-full
        bg-brand/10
        transition-colors
        duration-300
        group-hover:bg-brand/20
        "
      >
        <Icon
          className="
          size-4
          text-brand
          transition-transform
          duration-300
          group-hover:scale-110
          "
        />
      </div>

      <Caption className="text-white/90 whitespace-nowrap">
        {title}
      </Caption>
    </div>
  );
}
