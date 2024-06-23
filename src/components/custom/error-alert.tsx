import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import React from "react";
import { AnimatePresence } from "framer-motion";

interface ErrorAlertProps {
  show?: boolean;
  message?: string;
}

const ErrorAlert = ({ show, message }: ErrorAlertProps) => {
  return (
    <AnimatePresence>
      {show && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </AnimatePresence>
  );
};
export default ErrorAlert;
