import type { ComponentProps } from "react";

interface Props extends ComponentProps<"select"> {
  label?: string;
}

export default function Select({ className, name, label, ...props }: Props) {
  return (
    <div className="flex flex-col bg-white dark:bg-black rounded-md border-2 border-gray-300 dark:border-gray-700 p-3 focus:border-twitter-blue">
      <label htmlFor={name} className="text-gray-500 text-sm">
        {label}
      </label>
      <select
        {...props}
        name={name}
        id={name}
        className={`bg-white dark:bg-black text-left outline-none ${className}`}
      />
    </div>
  );
}
