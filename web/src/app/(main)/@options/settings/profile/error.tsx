"use client";
import Modal from "@/components/Modal";
import Error from "@/components/icons/Error";

export default function ProfileSettingsError() {
  return (
    <Modal>
      <div className="flex flex-col items-center justify-center text-red-500 py-20">
        <Error height={24} width={24} />
        <p>An error occured while trying to load your profile</p>
      </div>
    </Modal>
  );
}
