import { Skeleton } from "~/components/ui/skeleton";

export const ListSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <Skeleton className="h-10" />
      <Skeleton className="h-10" />
      <Skeleton className="h-10" />
    </div>
  );
};
