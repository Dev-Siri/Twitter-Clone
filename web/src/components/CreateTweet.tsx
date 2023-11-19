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
  const [textAreaHeight, setTextAreaHeight] = useState(inputHeight ?? 40);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);

  const loadingBar = useContext(LoadingContext);
  const captionInput = useRef<HTMLTextAreaElement>(null);
  const mediaInput = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success("Your tweet was sent.");
      clearMedia();
      setCaption("");
      if (location.href === "/") loadingBar?.current?.complete();
      else router.back();
    }
  }, [state, loadingBar, router]);

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

  function handleCaptionChange(e: ChangeEvent<HTMLTextAreaElement>) {
    if (captionInput.current)
      setTextAreaHeight(captionInput.current.scrollHeight);

    if (caption.length > 280) return;

    setCaption(e.target.value);
  }

  function handleSubmit() {
    if (location.href === "/") loadingBar?.current?.continuousStart();
  }

  const mediaUrl = useMemo(() => media && URL.createObjectURL(media), [media]);

  return (
    <form action={action} className="mt-2 w-full pr-4" onSubmit={handleSubmit}>
      <textarea
        name="caption"
        placeholder={placeholder ?? "What is happening?!"}
        className="bg-transparent outline-none text-xl w-full resize-none"
        value={caption}
        onChange={handleCaptionChange}
        ref={captionInput}
        maxLength={280}
        style={{
          paddingBottom: inputHeight,
          height: textAreaHeight,
        }}
      />
      {!state.success && state.errors?.["caption"] && (
        <p className="text-red-500 mt-2">{state.errors["caption"]}</p>
      )}
      {media && mediaType && (
        <div className="relative mt-4">
          <button
            className="absolute p-2 mt-4 mr-4 ml-auto right-0 z-50 bg-gray-900 rounded-full duration-200 hover:bg-gray-800"
            onClick={clearMedia}
          >
            <Close />
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
      <div className="border-t border-t-gray-800 mt-4 pt-2 flex">
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
          className={`flex justify-center font-bold items-center rounded-full gap-2 bg-twitter-blue p-2 px-4 disabled:opacity-50 ${
            !state.success && state.message ? "ml-2" : "ml-auto"
          }`}
        >
          Tweet
        </SubmitButton>
      </div>
    </form>
  );
}
