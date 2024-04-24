"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/hooks/services/auth";
import { RegisterSchema, registerSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorAlert from "@/components/custom/error-alert";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { routers } from "@/lib/constants/routers";

type UserRegisterFormValue = RegisterSchema;

const fields = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email...",
  },
  {
    name: "full_name",
    label: "Name",
    placeholder: "Enter your name...",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password...",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password...",
  },
];

export default function UserRegisterForm() {
  const form = useForm<UserRegisterFormValue>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      full_name: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [error, setError] = useState("");

  const { isPending, mutateAsync: register } = useRegisterMutation();

  const router = useRouter();

  const handleSubmit = async (formValue: UserRegisterFormValue) => {
    const { email, password, full_name } = formValue;
    return register({
      email,
      password,
      full_name,
    })
      .then(() => {
        router.push(`${routers.verifyAccount}?email=${email}`);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong!");
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 w-full"
      >
        <ErrorAlert show={!!error} message={error} />
        {fields.map(({ label, name, placeholder, type }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as keyof UserRegisterFormValue}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    disabled={isPending}
                    type={type}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button disabled={isPending} className="ml-auto w-full" type="submit">
          Continue With Email
        </Button>
      </form>
    </Form>
  );
}
