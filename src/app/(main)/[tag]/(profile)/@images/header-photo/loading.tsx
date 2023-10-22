import Loading from "@/components/ui/Loading";

export default function HeaderPhotoLoading() {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-600 h-[300px] w-full p-4">
      <Loading />
    </div>
  );
}
