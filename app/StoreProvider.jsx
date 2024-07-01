"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";
import { Toaster } from "@/components/ui/toaster";

export default function StoreProvider({ children }) {
  const storeRef = useRef();

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      {children}
      <Toaster />
    </Provider>
  );
}
