import { EllipsisVerticalIcon } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import type { Chapter } from "~/lib/types";
import { ChapterForm } from "../chapter-form";

// table row item component
const TableItem = ({ chapter }: { chapter: Chapter }) => {
  const [open, setOpen] = useState(false);
  const [dialogPurpose, setDialogPurpose] = useState<"view" | "edit">("view");

  const dialogTitle = dialogPurpose === "view" ? "نمایش فصل" : "ویرایش فصل";

  const onViewClick = () => {
    setDialogPurpose("view");
    setOpen(true);
  };
  const onEditClick = () => {
    setDialogPurpose("edit");
    setOpen(true);
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
              <DropdownMenuItem>حذف</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
            </DialogHeader>
            <ChapterForm mode={dialogPurpose} initialValues={chapter} />
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
