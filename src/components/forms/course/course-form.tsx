"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { courseSchema, CourseSchema } from "@/lib/schemas/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type FormValue = CourseSchema;

interface CourseFormProps {
  defaultValues?: Partial<FormValue>;
}

const fields = [
  {
    name: "course_name",
    label: "Course Name",
  },
  {
    name: "course_code",
    label: "Course Code",
  },
  {
    name: "description",
    label: "Description",
  },
];

const CourseForm = ({ defaultValues = {} }: CourseFormProps) => {
  const form = useForm<FormValue>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      course_name: "",
      course_code: "",
      description: "",
      active: false,
      ...defaultValues,
    },
  });

  const isPending = false;

  const handleSubmit = async (formValue: FormValue) => {};

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 w-full"
        >
          {fields.map(({ label, name, ...inputProps }) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof FormValue}
              render={({ field, fieldState: { invalid } }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input
                      invalid={invalid}
                      {...(field as any)}
                      {...inputProps}
                    />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          ))}

          <FormField
            key="active"
            control={form.control}
            name="active"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>
                  <span>Active Course: </span>
                </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button disabled={isPending} className="ml-auto w-full" type="submit">
            Continue With Email
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CourseForm;
