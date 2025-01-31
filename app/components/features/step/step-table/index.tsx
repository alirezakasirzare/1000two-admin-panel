import { useQueryClient } from "@tanstack/react-query";
import { EllipsisVerticalIcon } from "lucide-react";
import { useState } from "react";

import { confirm } from "~/components/common/dialog-confirmation";
import { stepKeys } from "~/lib/query-key";
import type { Step } from "~/lib/types";

import { stepApi } from "~/api/step";
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
import { StepForm } from "../step-form";

// table row item component
const TableItem = ({ step }: { step: Step }) => {
  // dialog
  const [open, setOpen] = useState(false);
  const [dialogPurpose, setDialogPurpose] = useState<"view" | "edit">("view");

  const dialogTitle = dialogPurpose === "view" ? "نمایش مرحله" : "ویرایش مرحله";

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
    if (
      await confirm({
        onConfirm: stepApi.delete.bind(null, step.id),
      })
    ) {
      queryClient.invalidateQueries({
        queryKey: stepKeys.all,
      });
    }
  };

  // dialog events
  const onDialogFormSuccess = () => {
    setOpen(false);
  };
  return (
    <TableRow>
      <TableCell>{step.name}</TableCell>
      <TableCell>{step.description}</TableCell>
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
            <StepForm
              mode={dialogPurpose}
              initialValues={step}
              onSuccess={onDialogFormSuccess}
            />
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

// the table component
export const StepTable = ({ steps }: { steps: Step[] }) => {
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
        {steps.map((step) => (
          <TableItem step={step} key={step.id} />
        ))}
      </TableBody>
    </Table>
  );
};
