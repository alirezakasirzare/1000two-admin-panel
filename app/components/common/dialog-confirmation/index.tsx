import { useState } from "react";
import {
  confirmable,
  createConfirmation,
  type ConfirmDialog,
} from "react-confirm";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";

const ConfirmationDialog: ConfirmDialog<
  {
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm?: Function;
  },
  boolean
> = ({
  onConfirm,
  proceed,
  show,
  cancelLabel = "لغو عملیات",
  confirmLabel = "تایید عملیات",
  title = "آیا عملیات را تایید میکنید؟",
  description = "این عملیات قابل برگشت نیست و با تایید آن نمیتوانید به حالت قبل برگردید.",
}) => {
  const [loading, setLoading] = useState(false);

  const onCancelClick = () => proceed(false);
  const onConfirmClick = async () => {
    if (onConfirm) {
      setLoading(true);
      await onConfirm();
      setLoading(false);
    }
    proceed(true);
  };
  return (
    <AlertDialog open={show}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancelClick}>
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onConfirmClick} loading={loading}>
              {confirmLabel}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const confirm = createConfirmation(confirmable(ConfirmationDialog));
