import type { Communicator } from "@/types";
import { getDmMessageCreatedDate } from "@/utils/date";
import type { DmMessage } from "@/utils/validation/dm-message";

interface Props extends DmMessage {
  oppositeUser: Communicator;
}

export default function Message({
  createdAt,
  message,
  oppositeUser,
  receiverTag,
}: Props) {
  const isMessageSentByCurrentUser = oppositeUser.tag === receiverTag;

  return (
    <div
      className={`flex flex-col ${
        isMessageSentByCurrentUser
          ? "self-end items-end"
          : "self-start items-start"
      }`}
    >
      <div
        className={`p-3 px-4 w-fit ${
          isMessageSentByCurrentUser
            ? "bg-twitter-blue rounded-t-full rounded-bl-full rounded-br-lg"
            : "bg-gray-200 dark:bg-gray-800 rounded-t-full rounded-br-full rounded-bl-lg"
        }`}
      >
        {message}
      </div>
      <time dateTime={createdAt} className="text-gray-500 text-xs mt-1">
        {getDmMessageCreatedDate(createdAt)}
      </time>
    </div>
  );
}
