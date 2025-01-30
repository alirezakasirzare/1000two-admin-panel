import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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

// form schema
const schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

// component props
type Props = {
  mode: "add" | "edit" | "view";
  initialValues?: Chapter;
};

// the component
export const ChapterForm = (props: Props) => {
  // form state
  const initValues = {
    name: props.initialValues?.name ?? "",
    description: props.initialValues?.description ?? "",
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    values: initValues,
  });

  // mutation
  const addMutation = useMutation({
    mutationFn: chapterApi.create,
  });

  const editMutation = useMutation({
    mutationFn: chapterApi.edit.bind(null, ""),
  });

  // submit
  const onSubmit = (values: z.infer<typeof schema>) => {
    if (props.mode === "add") {
      addMutation.mutate(values);
    } else if (props.mode === "edit") {
      editMutation.mutate(values);
    }
  };

  // alias
  const isView = props.mode === "view";

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
            {props.mode === "add" ? "اضافه کردن" : "ویرایش کردن"}
          </Button>
        )}
      </form>
    </Form>
  );
};
