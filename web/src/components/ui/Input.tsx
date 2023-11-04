import type { ComponentProps } from "react";

interface Props extends ComponentProps<"input"> {
  invalid?: boolean;
}

export default function Input({ className, invalid, ...props }: Props) {
  return (
    <input
      {...props}
      className={`p-3.5 w-full bg-black outline-none border-2 rounded-md ${
        invalid ? "border-red-700" : "border-gray-700 focus:border-twitter-blue"
      } ${className}`}
    />
  );
}
