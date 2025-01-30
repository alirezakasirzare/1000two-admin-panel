import { useQuery } from "@tanstack/react-query";
import { chapterApi } from "~/api/chapter";
import { ChapterForm } from "~/components/features/chapter/chapter-form";
import { ChapterTable } from "~/components/features/chapter/chapter-table";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { chapterKeys } from "~/lib/query-key";

export default function ChapterPage() {
  const { data, isLoading } = useQuery({
    queryKey: chapterKeys.all,
    queryFn: chapterApi.findAll,
  });

  return (
    <div className="bg-accent p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <h3>فصل ها</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"sm"}>اضافه کردن فصل</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>اضافه کردن فصل</DialogTitle>
            </DialogHeader>
            <ChapterForm mode="add" />
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-4">
        <ChapterTable chapters={data?.items ?? []} />
      </div>
    </div>
  );
}
