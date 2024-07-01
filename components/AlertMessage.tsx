import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CircleCheck } from "lucide-react";

const AlertMessage = ({ type, message }) => {
  return (
    <Alert variant={type === "success" ? "success" : "destructive"}>
      {type === "success" ? (
        <CircleCheck className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}
      <AlertTitle>{type === "success" ? "Success" : "Error"}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default AlertMessage;
