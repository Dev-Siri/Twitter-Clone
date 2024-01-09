"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  lazy,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

import createTweet from "@/actions/tweets/create";
import { LoadingContext } from "@/context/LoadingContext";

import SubmitButton from "@/components/SubmitButton";
import Close from "@/components/icons/Close";
import Media from "@/components/icons/Media";
import { useQuotedTweetStore } from "@/stores/predefined-tweet";
import { getTwitterStatusUuid } from "@/utils/url";
import ExpandableTextArea from "./ExpandableTextArea";
import QuotedTweet from "./QuotedTweet";

const VideoPlayer = lazy(() => import("@/components/VideoPlayer"));

interface Props {
  placeholder?: string;
  replyingTo?: string;
  inputHeight?: number;
}

export default function CreateTweet({
  placeholder,
  inputHeight,
  replyingTo,
}: Props) {
  const [state, action] = useFormState(createTweet, { success: false });

  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);

  const loadingBar = useContext(LoadingContext);
  const mediaInput = useRef<HTMLInputElement>(null);
  const { quotedTweetUrl, setQuotedTweetUrl } = useQuotedTweetStore();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success("Your Tweet was sent.");
      clearMedia();
      setCaption("");
      setQuotedTweetUrl(null);

      if (location.href === "/") {
        loadingBar?.current?.complete();
        router.refresh();
      } else router.back();
    }
  }, [state, loadingBar, router, setQuotedTweetUrl]);

  function handleMediaChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setMedia(file);

    if (file.type.startsWith("image/")) return setMediaType("image");
    if (file.type.startsWith("video/")) return setMediaType("video");
    setMediaType(null);
  }

  function clearMedia() {
    setMedia(null);
    setMediaType(null);

    // clears it from the actual input so the server receives null if cleared
    if (mediaInput.current) mediaInput.current.value = "";
  }

  function handleCaptionChange(value: string) {
    if (caption.length > 280) return;

    setCaption(value);
  }

  function handleSubmit() {
    if (!replyingTo && quotedTweetUrl)
      setCaption(
        (prevCaption) => `${prevCaption}
${quotedTweetUrl}`
      );

    if (location.href === "/") loadingBar?.current?.continuousStart();
  }

  const mediaUrl = useMemo(() => media && URL.createObjectURL(media), [media]);

  return (
    <form action={action} className="mt-2 w-full pr-4" onSubmit={handleSubmit}>
      <ExpandableTextArea
        name="caption"
        placeholder={placeholder ?? "What is happening?!"}
        className="bg-transparent outline-none text-xl w-full resize-none"
        onChange={handleCaptionChange}
        value={caption}
        maxLength={280}
        inputHeight={inputHeight}
      />
      {quotedTweetUrl && !replyingTo && (
        <QuotedTweet id={getTwitterStatusUuid(quotedTweetUrl) ?? ""} />
      )}
      {!state.success && state.errors?.["caption"] && (
        <p className="text-red-500 mt-2">{state.errors["caption"]}</p>
      )}
      {media && mediaType && (
        <div className="relative mt-4">
          <button
            className="absolute p-2 mt-4 mr-4 ml-auto right-0 z-50 bg-white dark:bg-gray-900 rounded-full duration-200 hover:bg-gray-300 hover:dark:bg-gray-800"
            onClick={clearMedia}
          >
            <Close height={24} width={24} />
          </button>
          {mediaType === "image" ? (
            <Image
              src={mediaUrl!}
              alt="Media Preview"
              height={media.size}
              width={media.size}
              className="rounded-md object-contain"
            />
          ) : (
            <VideoPlayer url={mediaUrl!} />
          )}
        </div>
      )}
      <div className="border-t border-t-gray-300 dark:border-t-gray-800 mt-4 pt-2 flex">
        <div className="flex items-center gap-2">
          <label
            htmlFor="media"
            aria-label="Add Media"
            className={`w-8 h-8 cursor-pointer p-1.5 rounded-full duration-200 hover:bg-blue-950 ${
              !state.success && state.errors?.["media"]
                ? "text-red-500"
                : "text-twitter-blue"
            }`}
          >
            <Media height={20} width={20} />
          </label>
          {!state.success && state.errors?.["media"] && (
            <p className="text-red-500 text-sm">{state.errors["media"]}</p>
          )}
        </div>
        <input
          type="hidden"
          name="replyingTo"
          id="replyingTo"
          value={replyingTo}
        />
        <input
          type="file"
          name="media"
          id="media"
          accept="video/*,image/*"
          onChange={handleMediaChange}
          className="h-0 w-0"
          ref={mediaInput}
        />
        {!state.success && state.message && (
          <p className="inset-x-0 text-red-500 ml-auto my-auto">
            {state.message}
          </p>
        )}
        <SubmitButton
          disabled={
            !caption.length ||
            /*
              This ensures that when media is not null, then mediaType isn't either.
              because if mediaType is null, it means that the file type is not valid for upload as
              seen by the logic in the handleMediaChange function
            */
            !!(media && !mediaType)
          }
          className={`flex justify-center font-bold items-center rounded-full gap-2 text-white bg-twitter-blue p-2 px-5 duration-200 disabled:opacity-50 disabled:bg-darker-twitter-blue hover:bg-darker-twitter-blue ${
            !state.success && state.message ? "ml-2" : "ml-auto"
          }`}
        >
          {replyingTo ? "Reply" : "Tweet"}
        </SubmitButton>
      </div>
    </form>
  );
}
