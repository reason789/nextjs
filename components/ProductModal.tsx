"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ProductDisplay from "./ProductDisplay";
import Link from "next/link";

export function ProductModal({ product }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" className=" text-xs text-[#face14]" variant="outline">
          View
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="  max-w-max  overflow-y-auto max-h-[750px]">
        <AlertDialogHeader>
          <AlertDialogFooter>
            <div className="  w-full flex justify-end gap-2 items-center">
              {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
              <Link href={`/products/${product._id}`}>
                <p className=" underline text-xs hover:font-bold transition-all">
                  Product details
                </p>
              </Link>
              <AlertDialogAction>✖</AlertDialogAction>
            </div>
          </AlertDialogFooter>
          <AlertDialogDescription className=" text-left">
            <ProductDisplay product={product} />
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
