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
import { routers } from "@/lib/constants/routers";
import { useLoginMutation } from "@/hooks/services/auth";
import { LoginSchema, loginSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useUserStore } from "@/store/user";
import { sessionManager } from "@/lib/session";
import { useClientSearchParams } from "@/hooks/next";

type UserFormValue = LoginSchema;

export default function UserLoginForm() {
  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser);

  const [error, setError] = useState("");
  const searchParams = useClientSearchParams();

  const { isPending, mutateAsync: login } = useLoginMutation();

  const form = useForm<UserFormValue>({
    resolver: zodResolver(loginSchema),
    shouldUseNativeValidation: false,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (formValue: UserFormValue) => {
    return login(formValue)
      .then((res) => {
        const { token, user } = res.data;
        if (user.active) {
          setUser(user);
          sessionManager.accessToken = token;

          const callbackUrl = searchParams.get("callbackUrl");
          console.log({ callbackUrl });
          const isValidCallbackUrl = callbackUrl && callbackUrl.startsWith("/");
          router.push(isValidCallbackUrl ? callbackUrl : routers.dashboard);
        } else {
          sessionManager.tempAccessToken = token;
          router.push(
            `${routers.verifyAccount}?email=${user.email}&isAuth=true`,
          );
        }
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
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password..."
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isPending} className="ml-auto w-full" type="submit">
          Continue With Email
        </Button>
      </form>
    </Form>
  );
}
