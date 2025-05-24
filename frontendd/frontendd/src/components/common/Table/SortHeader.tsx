
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SortDirection = 'asc' | 'desc' | null;

interface SortHeaderProps {
  label: string;
  sortKey: string;
  currentSortKey: string | null;
  currentSortDirection: SortDirection;
  onSort: (key: string, direction: SortDirection) => void;
  className?: string;
}

const SortHeader = ({
  label,
  sortKey,
  currentSortKey,
  currentSortDirection,
  onSort,
  className,
}: SortHeaderProps) => {
  const isActive = currentSortKey === sortKey;

  const handleSort = () => {
    if (isActive) {
      const nextDirection = currentSortDirection === 'asc' ? 'desc' : currentSortDirection === 'desc' ? null : 'asc';
      onSort(sortKey, nextDirection);
    } else {
      onSort(sortKey, 'asc');
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleSort}
      className={cn("p-0 h-auto font-medium flex items-center gap-1 hover:bg-transparent hover:underline group", className)}
    >
      {label}
      <div className={cn(
        "transition-opacity",
        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
      )}>
        {isActive && currentSortDirection === 'asc' && (
          <ArrowUp className="h-3 w-3" />
        )}
        {isActive && currentSortDirection === 'desc' && (
          <ArrowDown className="h-3 w-3" />
        )}
        {(!isActive || currentSortDirection === null) && (
          <ArrowUp className="h-3 w-3" />
        )}
      </div>
    </Button>
  );
};

export default SortHeader;
