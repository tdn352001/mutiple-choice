"use client";
import ErrorAlert from "@/components/custom/error-alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "@/hooks/services/auth";
import { routers } from "@/lib/constants/routers";
import { ResetPasswordSchema, resetPasswordSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ResetPasswordFormValue = ResetPasswordSchema;

interface ResetPasswordFormProps {
  email: string;
}

const fields = [
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Enter your password...",
  },
  {
    name: "confirm_password",
    label: "Confirm Password",
    type: "password",
    placeholder: "Confirm your password...",
  },
];

export default function ResetPasswordForm({ email }: ResetPasswordFormProps) {
  const form = useForm<ResetPasswordFormValue>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
      activation_code: "",
    },
  });

  const router = useRouter();
  const [error, setError] = useState("");
  const [resendCountDown, setResendCountDown] = useState(0);

  const { isPending, mutateAsync: resetPassword } = useResetPasswordMutation();
  const { isPending: isResending, mutateAsync: resendCode } =
    useForgotPasswordMutation();

  const handleSubmit = async (formValue: ResetPasswordFormValue) => {
    return resetPassword({ ...formValue, email })
      .then(() => {
        toast.success("Password updated successfully!");
        router.push(routers.login);
      })

      .catch((err) => {
        setError(err.message || "Something went wrong!");
      });
  };

  const handleResendCode = async () => {
    return resendCode({ email })
      .then(() => {
        toast.success("OTP sent successfully!");
        setResendCountDown(60);
      })
      .catch((err) => {
        toast.error(err.message || "Resend code failed. Please try later!");
      });
  };

  const isCountdown = !!resendCountDown;

  useEffect(() => {
    if (isCountdown) {
      const interval = setInterval(() => {
        setResendCountDown((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isCountdown]);

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
            name={name as keyof ResetPasswordFormValue}
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
        <FormField
          control={form.control}
          name="activation_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OTP</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className="w-full justify-between">
                    <InputOTPSlot
                      className="flex-1 h-auto aspect-square"
                      index={0}
                    />
                    <InputOTPSlot
                      className="flex-1 h-auto aspect-square"
                      index={1}
                    />
                    <InputOTPSlot
                      className="flex-1 h-auto aspect-square"
                      index={2}
                    />
                    <InputOTPSlot
                      className="flex-1 h-auto aspect-square"
                      index={3}
                    />
                    <InputOTPSlot
                      className="flex-1 h-auto aspect-square"
                      index={4}
                    />
                    <InputOTPSlot
                      className="flex-1 h-auto aspect-square"
                      index={5}
                    />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Enter the OTP sent to <strong>{email}</strong>.
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="ml-auto w-full flex gap-2">
          <Button
            className="flex-1"
            type="button"
            disabled={!!resendCountDown || isResending || isPending}
            variant="secondary"
            onClick={handleResendCode}
          >
            {resendCountDown ? `Resend in ${resendCountDown}s` : "Resend OTP"}
          </Button>
          <Button className="flex-1" disabled={isPending}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
