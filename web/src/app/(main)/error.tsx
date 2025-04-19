"use client";

interface Props {
  reset(): void;
}

export default function RootError({ reset }: Props) {
  return (
    <article className="h-screen flex flex-col items-center justify-center">
      <h4 className="text-gray-500">Something went wrong...</h4>
      <button
        onClick={reset}
        className="bg-twitter-blue p-2 rounded-full px-6 font-bold mt-6"
      >
        Retry
      </button>
    </article>
  );
}
