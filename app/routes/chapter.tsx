import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { chapterApi } from "~/api/chapter";
import { ListSkeleton } from "~/components/common/list-skeleton";
import { ChapterForm } from "~/components/features/chapter/chapter-form";
import { ChapterTable } from "~/components/features/chapter/chapter-table";
import { Button } from "~/components/ui/button";
import { chapterKeys } from "~/lib/query-key";

import {
  DataPagination,
  useCurrentPage,
} from "~/components/common/data-pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export default function ChapterPage() {
  // dialog state
  const [open, setOpen] = useState(false);

  // dialog events
  const onDialogFormSuccess = () => setOpen(false);

  // fetch data
  const [currentPage] = useCurrentPage("queryParams");

  const { data, isLoading } = useQuery({
    queryKey: chapterKeys.pagination({ page: currentPage }),
    queryFn: chapterApi.findAll.bind(null, { page: currentPage }),
  });

  return (
    <div className="bg-accent p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <h3>فصل ها</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size={"sm"}>اضافه کردن فصل</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>اضافه کردن فصل</DialogTitle>
            </DialogHeader>
            <ChapterForm mode="add" onSuccess={onDialogFormSuccess} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <ListSkeleton />
        ) : (
          <>
            <ChapterTable chapters={data?.items ?? []} />
            {!!data?.meta && (
              <DataPagination meta={data.meta} strategy="queryParams" />
            )}
          </>
        )}
      </div>
    </div>
  );
}
