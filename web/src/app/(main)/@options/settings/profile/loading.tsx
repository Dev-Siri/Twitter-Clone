import Modal from "@/components/Modal";
import Loading from "@/components/ui/Loading";

export default function ProfileSettingsLoading() {
  return (
    <Modal>
      <div className="flex flex-col items-center justify-center py-20">
        <Loading />
      </div>
    </Modal>
  );
}
