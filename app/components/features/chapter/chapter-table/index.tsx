import { useQueryClient } from "@tanstack/react-query";
import { EllipsisVerticalIcon } from "lucide-react";
import { useState } from "react";

import { chapterApi } from "~/api/chapter";
import { confirm } from "~/components/common/dialog-confirmation";
import { chapterKeys } from "~/lib/query-key";
import type { Chapter } from "~/lib/types";
import { ChapterForm } from "../chapter-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

// table row item component
const TableItem = ({ chapter }: { chapter: Chapter }) => {
  // dialog
  const [open, setOpen] = useState(false);
  const [dialogPurpose, setDialogPurpose] = useState<"view" | "edit">("view");

  const dialogTitle = dialogPurpose === "view" ? "نمایش فصل" : "ویرایش فصل";

  // view
  const onViewClick = () => {
    setDialogPurpose("view");
    setOpen(true);
  };

  // edit
  const onEditClick = () => {
    setDialogPurpose("edit");
    setOpen(true);
  };

  // delete
  const queryClient = useQueryClient();
  const onDeleteClick = async () => {
    console.log(chapter);
    if (
      await confirm({
        onConfirm: chapterApi.delete.bind(null, chapter.id),
      })
    ) {
      queryClient.invalidateQueries({
        queryKey: chapterKeys.all,
      });
    }
  };

  // dialog events
  const onDialogFormSuccess = () => {
    setOpen(false);
  };
  return (
    <TableRow>
      <TableCell>{chapter.name}</TableCell>
      <TableCell>{chapter.description}</TableCell>
      <TableCell>
        <Dialog open={open} onOpenChange={setOpen}>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <EllipsisVerticalIcon className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onViewClick}>نمایش</DropdownMenuItem>
              <DropdownMenuItem onClick={onEditClick}>ویرایش</DropdownMenuItem>
              <DropdownMenuItem onClick={onDeleteClick}>حذف</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
            </DialogHeader>
            <ChapterForm
              mode={dialogPurpose}
              initialValues={chapter}
              onSuccess={onDialogFormSuccess}
            />
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

// the table component
export const ChapterTable = ({ chapters }: { chapters: Chapter[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>نام</TableHead>
          <TableHead>توضیحات</TableHead>
          <TableHead>عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {chapters.map((chapter) => (
          <TableItem chapter={chapter} key={chapter.id} />
        ))}
      </TableBody>
    </Table>
  );
};
