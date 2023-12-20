"use client";
import { useRef, useState, type ChangeEvent, type ComponentProps } from "react";

interface Props extends Omit<ComponentProps<"textarea">, "onChange" | "value"> {
  onChange(value: string): void;
  value: string;
  inputHeight?: number;
}

export default function ExpandableTextArea({
  onChange,
  value,
  inputHeight,
  ...props
}: Props) {
  const [textAreaHeight, setTextAreaHeight] = useState(inputHeight ?? 40);

  const textAreaInput = useRef<HTMLTextAreaElement>(null);

  function handleTextAreaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    if (textAreaInput.current)
      setTextAreaHeight(textAreaInput.current.scrollHeight);

    onChange(e.target.value);
  }

  return (
    <textarea
      {...props}
      value={value}
      onChange={handleTextAreaChange}
      ref={textAreaInput}
      style={{
        paddingBottom: inputHeight,
        height: textAreaHeight,
      }}
    />
  );
}
