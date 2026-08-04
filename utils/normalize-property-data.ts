import { Option } from "@/components/rhf-input/form-rfh-select";
import type { LucideIcon } from "lucide-react";

interface SelectEntity {
  id: string;
  name: string;
  icon: string | null;
}

export function normalizeSelectOptions<T extends SelectEntity>(
  items: T[],
  iconMap?: Record<string, LucideIcon>,
): Option[] {
  return items.map((item) => ({
    value: item.id,
    label: item.name,
    icon: item.icon && iconMap ? iconMap[item.icon] : undefined,
  }));
}
