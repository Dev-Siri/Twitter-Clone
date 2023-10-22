"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

import login from "@/actions/users/login";

import Modal from "@/components/Modal";
import SubmitButton from "@/components/SubmitButton";
import Eye from "@/components/icons/Eye";
import Input from "@/components/ui/Input";

export default function LoginFlow() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action] = useFormState(login, { success: false });

  const router = useRouter();

  useEffect(() => {
    if (state.success) router.replace("/");
  }, [state, router]);

  return (
    <Modal open={!state.success}>
      <form action={action} className="p-8 pt-4">
        <h2 className="font-bold text-4xl">Sign in to Twitter</h2>
        <div className="flex flex-col mt-8 mb-[30%] gap-2">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            invalid={!state.success && !!state.errors?.["email"]}
          />
          {!state.success && state.errors?.["email"] && (
            <p className="text-red-500">{state.errors["email"]}</p>
          )}
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              invalid={!state.success && !!state.errors?.["password"]}
            />
            <button
              type="button"
              className="absolute z-50 inset-0 bg-transparent h-fit w-fit p-2 rounded-md ml-auto mt-auto"
              onClick={() =>
                setShowPassword((prevShowPassword) => !prevShowPassword)
              }
            >
              <Eye />
            </button>
          </div>
          {!state.success && state.errors?.["password"] && (
            <p className="text-red-500">{state.errors["password"]}</p>
          )}
        </div>
        {!state.success && state.message && (
          <p className="text-red-500">{state.message}</p>
        )}
        <SubmitButton
          className="flex items-center justify-center gap-2 bg-twitter-blue text-center p-3.5 w-full rounded-full mt-4 font-semibold"
          onClick={() => setShowPassword(false)}
        >
          Log in
        </SubmitButton>
      </form>
    </Modal>
  );
}
