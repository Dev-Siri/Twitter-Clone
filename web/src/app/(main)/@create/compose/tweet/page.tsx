import Image from "next/image";

import { useSession } from "@/hooks/useSession";

import CreateTweet from "@/components/CreateTweet";
import Modal from "@/components/Modal";

export default function ComposeTweet() {
  const user = useSession();

  return (
    <Modal>
      {user && (
        <div className="flex gap-4 mt-[28px]">
          <Image
            src={user.userImage}
            alt={user.name}
            height={44}
            width={44}
            className="h-11 w-11 rounded-full"
          />
          <CreateTweet inputHeight={100} />
        </div>
      )}
    </Modal>
  );
}
