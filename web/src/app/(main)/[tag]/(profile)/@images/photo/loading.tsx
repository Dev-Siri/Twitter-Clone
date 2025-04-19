import Loading from "@/components/ui/Loading";

export default function PhotoLoading() {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-600 h-[300px] w-[300px] rounded-full p-4">
      <Loading />
    </div>
  );
}
