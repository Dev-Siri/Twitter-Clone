import Link from "next/link";

export default function Messages() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-32">
      <div className="flex flex-col">
        <h4 className="text-4xl font-bold">Select a message</h4>
        <p className="my-4 text-gray-500 ml-1">
          Choose from your existing conversations, start a new one, or just keep
          swimming.
        </p>
        <Link
          href="/messages/compose"
          className="bg-twitter-blue w-fit hover:bg-darker-twitter-blue duration-200 text-white rounded-full font-bold text-lg px-8 p-3.5"
        >
          New message
        </Link>
      </div>
    </div>
  );
}
