import TickIcon from "@/components/icons/Tick";

interface Props {
  selected: boolean;
}

export default function Selected({ selected }: Props) {
  return (
    <div
      aria-selected={selected}
      className={`p-0.5 text-white rounded-full border-2 ${
        selected
          ? "bg-twitter-blue border-transparent"
          : "border-gray-400 h-5 w-5"
      }`}
    >
      {selected && <TickIcon height={18} width={18} />}
    </div>
  );
}
