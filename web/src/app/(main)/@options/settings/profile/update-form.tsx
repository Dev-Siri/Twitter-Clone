"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

import type { User } from "@/types";

import updateUser from "@/actions/users/update";

import Modal from "@/components/Modal";
import SubmitButton from "@/components/SubmitButton";
import Close from "@/components/icons/Close";
import Media from "@/components/icons/Media";
import Input from "@/components/ui/Input";

type Props = Omit<User, "email" | "pinnedTweetId" | "highlightedTweetId">;

export default function UpdateForm({
  name,
  userImage,
  banner,
  bio,
  tag,
  location,
  website,
}: Props) {
  const [previewBanner, setPreviewBanner] = useState<File | null>(null);
  const [previewPfp, setPreviewPfp] = useState<File | null>(null);

  const [state, action] = useFormState(updateUser, { success: false });
  const bannerRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success("Profile updated successfully.");
      router.back();
      router.refresh();
    }
  }, [state, router, tag]);

  function removeBanner() {
    setPreviewBanner(null);

    if (bannerRef.current) bannerRef.current.value = "";
  }

  return (
    <Modal
      open={!state.success}
      title="Edit Profile"
      defaultPadding={false}
      trailing={
        <SubmitButton
          form="update-profile-form"
          className="bg-white font-semibold text-black p-2 px-6 rounded-full"
        >
          Save
        </SubmitButton>
      }
    >
      <form
        id="update-profile-form"
        action={action}
        className="relative overflow-y-auto"
      >
        <label
          htmlFor="userImage"
          className="absolute bg-black p-3 mt-[160px] ml-[73px] z-50 opacity-70 cursor-pointer rounded-full"
        >
          <Media height={24} width={24} />
        </label>
        <Image
          src={previewPfp ? URL.createObjectURL(previewPfp) : userImage}
          alt={`${name}'s Avatar`}
          width={112}
          className="absolute ml-10 mt-[18%] h-28 w-28 rounded-full"
          height={112}
        />
        <label
          htmlFor="banner"
          className={`absolute bg-black p-3 mt-16 opacity-70 cursor-pointer rounded-full ${
            banner || previewBanner ? "ml-64" : "ml-72"
          }`}
        >
          <Media height={24} width={24} />
        </label>
        {(banner || previewBanner) && (
          <button
            type="button"
            className="absolute bg-black p-3 mt-16 ml-80 opacity-70 cursor-pointer rounded-full"
            onClick={removeBanner}
          >
            <Close height={24} width={24} />
          </button>
        )}
        <section className="h-[200px] w-full bg-twitter-blue">
          {(banner || previewBanner) && (
            <Image
              src={banner || URL.createObjectURL(previewBanner!)}
              alt={`${name}'s Banner`}
              height={200}
              width={600}
              className="h-full w-full object-cover"
            />
          )}
        </section>
        <input
          type="file"
          name="banner"
          id="banner"
          className="h-0 w-0"
          accept="image/*"
          ref={bannerRef}
          onChange={(e) => setPreviewBanner(e.target.files?.[0] as File | null)}
        />
        <input
          type="file"
          name="userImage"
          id="userImage"
          className="h-0 w-0"
          accept="image/*"
          onChange={(e) => setPreviewPfp(e.target.files?.[0] as File | null)}
        />
        <section className="flex flex-col gap-2 pb-10 px-4 mt-12">
          <Input
            name="name"
            placeholder="Name"
            defaultValue={name}
            invalid={!state.success && !!state.errors?.["name"]}
          />
          {!state.success && state.errors?.["name"] && (
            <p className="text-red-500 ml-1">{state.errors["name"]}</p>
          )}
          <Input
            name="bio"
            placeholder="Bio"
            defaultValue={bio ?? ""}
            invalid={!state.success && !!state.errors?.["bio"]}
          />
          {!state.success && state.errors?.["bio"] && (
            <p className="text-red-500 ml-1">{state.errors["bio"]}</p>
          )}
          <Input
            name="location"
            placeholder="Location"
            defaultValue={location ?? ""}
            invalid={!state.success && !!state.errors?.["location"]}
          />
          {!state.success && state.errors?.["location"] && (
            <p className="text-red-500 ml-1">{state.errors["location"]}</p>
          )}
          <Input
            name="website"
            placeholder="Website"
            defaultValue={website ?? ""}
            invalid={!state.success && !!state.errors?.["website"]}
          />
          {!state.success && state.errors?.["website"] && (
            <p className="text-red-500 ml-1">{state.errors["website"]}</p>
          )}
          {!state.success && state.message && (
            <p className="text-red-500 ml-1 mt-5">{state.message}</p>
          )}
        </section>
      </form>
    </Modal>
  );
}
