import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { Chapter } from "~/lib/types";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { chapterApi } from "~/api/chapter";
import { chapterKeys } from "~/lib/query-key";

// form schema
const schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

// the component
export const ChapterForm = ({
  mode,
  initialValues,
  onSuccess,
}: {
  mode: "add" | "edit" | "view";
  initialValues?: Chapter;
  onSuccess?: () => void;
}) => {
  // alias
  const isView = mode === "view";

  // form state
  const formDefaultValues = {
    name: initialValues?.name ?? "",
    description: initialValues?.description ?? "",
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    values: formDefaultValues,
  });

  // mutation
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: chapterApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: chapterKeys.all,
      });

      onSuccess?.();
    },
  });

  const editMutation = useMutation({
    mutationFn: chapterApi.edit.bind(null, initialValues?.id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: chapterKeys.all,
      });

      onSuccess?.();
    },
  });

  // submit
  const onSubmit = (values: z.infer<typeof schema>) => {
    if (mode === "add") {
      addMutation.mutate(values);
    } else if (mode === "edit") {
      editMutation.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نام فصل</FormLabel>
              <FormControl>
                <Input disabled={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>توضیحات فصل</FormLabel>
              <FormControl>
                <Textarea disabled={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* btn */}
        {!isView && (
          <Button loading={addMutation.isPending || editMutation.isPending}>
            {mode === "add" ? "اضافه کردن" : "ویرایش کردن"}
          </Button>
        )}
      </form>
    </Form>
  );
};
