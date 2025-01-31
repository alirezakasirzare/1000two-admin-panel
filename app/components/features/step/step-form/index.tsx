import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import type { Step } from "~/lib/types";

import { stepApi } from "~/api/step";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { stepKeys } from "~/lib/query-key";

// form schema
const schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  chapterId: z.string().min(1),
});

// the component
export const StepForm = ({
  mode,
  initialValues,
  onSuccess,
}: {
  mode: "add" | "edit" | "view";
  initialValues?: Partial<Step>;
  onSuccess?: () => void;
}) => {
  // alias
  const isView = mode === "view";

  // form state
  const formDefaultValues = {
    name: initialValues?.name ?? "",
    description: initialValues?.description ?? "",
    question: initialValues?.question ?? "",
    answer: initialValues?.answer ?? "",
    chapterId: initialValues?.chapterId ?? "",
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    values: formDefaultValues,
  });
  // mutation
  const queryClient = useQueryClient();
  const addMutation = useMutation({
    mutationFn: stepApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: stepKeys.all,
      });

      onSuccess?.();
    },
  });

  const editMutation = useMutation({
    mutationFn: stepApi.edit.bind(null, initialValues?.id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: stepKeys.all,
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
              <FormLabel>نام مرحله</FormLabel>
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
              <FormLabel>توضیحات مرحله</FormLabel>
              <FormControl>
                <Textarea disabled={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* question */}
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>سوال مرحله</FormLabel>
              <FormControl>
                <Input disabled={isView} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* answer */}
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>جواب مرحله</FormLabel>
              <FormControl>
                <Input disabled={isView} {...field} />
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
