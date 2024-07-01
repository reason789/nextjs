import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Popup = ({ value, children }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* <Button variant="outline">Hover</Button> */}
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{value}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Popup;
