"use client";
import { useFormStatus } from "react-dom";

import type { ComponentProps } from "react";

import Loading from "@/components/ui/Loading";

export default function SubmitButton({
  children,
  disabled,
  ...props
}: ComponentProps<"button">) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending || disabled} {...props}>
      {children} {pending && <Loading />}
    </button>
  );
}
