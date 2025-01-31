import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { ListSkeleton } from "~/components/common/list-skeleton";
import { Button } from "~/components/ui/button";
import { stepKeys } from "~/lib/query-key";

import { useParams } from "react-router";
import { stepApi } from "~/api/step";
import {
  DataPagination,
  useCurrentPage,
} from "~/components/common/data-pagination";
import { StepForm } from "~/components/features/step/step-form";
import { StepTable } from "~/components/features/step/step-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export default function ChapterStepsPage() {
  // dialog state
  const [open, setOpen] = useState(false);

  // dialog events
  const onDialogFormSuccess = () => setOpen(false);

  // fetch data
  const [currentPage] = useCurrentPage("queryParams");
  const params = useParams();
  const chapterId = params.chapterId as string;

  const { data, isLoading } = useQuery({
    queryKey: stepKeys.byChapterPagination({ page: currentPage, chapterId }),
    queryFn: stepApi.findAllByChapter.bind(null, {
      page: currentPage,
      chapterId,
    }),
  });

  return (
    <div className="bg-accent p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <h3>مراحل</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size={"sm"}>اضافه کردن مرحله</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>اضافه کردن مرحله</DialogTitle>
            </DialogHeader>
            <StepForm
              mode="add"
              initialValues={{ chapterId }}
              onSuccess={onDialogFormSuccess}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <ListSkeleton />
        ) : (
          <>
            <StepTable steps={data?.items ?? []} />
            {!!data?.meta && (
              <DataPagination meta={data.meta} strategy="queryParams" />
            )}
          </>
        )}
      </div>
    </div>
  );
}
