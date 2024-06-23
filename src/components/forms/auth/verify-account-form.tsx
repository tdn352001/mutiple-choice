"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import ErrorAlert from "@/components/custom/error-alert";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  useResendActiveCodeMutation,
  useVerifyAccountMutation,
} from "@/hooks/services/auth";
import { routers } from "@/lib/constants/routers";
import { VerifyAccountSchema, verifyAccountSchema } from "@/lib/schemas/auth";
import { sessionManager } from "@/lib/session";
import { userService } from "@/services/user";
import { useUserStore } from "@/store/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type VerifyAccountFormValue = VerifyAccountSchema;

interface UseVerifyAccountFormProps {
  email: string;
  isAuth?: boolean;
}

export default function UseVerifyAccountForm({
  email,
  isAuth,
}: UseVerifyAccountFormProps) {
  const form = useForm<VerifyAccountFormValue>({
    resolver: zodResolver(verifyAccountSchema),
    defaultValues: {
      activation_code: "",
    },
  });

  const setUser = useUserStore((state) => state.setUser);

  const [error, setError] = useState("");
  const [resendCountDown, setResendCountDown] = useState(0);
  const router = useRouter();
  const { isPending, mutateAsync: verifyAccount } = useVerifyAccountMutation();
  const { isPending: isResending, mutateAsync: resendActiveCode } =
    useResendActiveCodeMutation();

  const handleSubmit = async (formValue: VerifyAccountFormValue) => {
    return verifyAccount({ ...formValue, email })
      .then(() => {
        const tempToken = sessionManager.tempAccessToken;
        if (isAuth && tempToken) {
          sessionManager.accessToken = tempToken;
          sessionManager.tempAccessToken = "";
          userService
            .getMe()
            .then((res) => {
              setUser(res.data.user);
              router.push(routers.dashboard);
            })
            .catch(() => {
              router.push(routers.login);
            });
        } else {
          router.push(routers.login);
        }
      })
      .catch((err) => {
        setError(err.message || "Something went wrong!");
      });
  };

  const handleResendCode = async () => {
    return resendActiveCode({ email })
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
