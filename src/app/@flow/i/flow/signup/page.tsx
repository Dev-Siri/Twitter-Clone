"use client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { experimental_useFormState as useFormState } from "react-dom";

import signup from "@/actions/users/signup";
import { MONTHS, getDays } from "@/constants/date";

import Modal from "@/components/Modal";
import SubmitButton from "@/components/SubmitButton";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

export default function SignupFlow() {
  const [birthMonth, setBirthMonth] =
    useState<(typeof MONTHS)[number]>("January");
  const [state, action] = useFormState(signup, { success: false });
  const daysOptions = useMemo(() => getDays(birthMonth), [birthMonth]);

  const router = useRouter();

  useEffect(() => {
    if (state.success) router.replace("/");
  }, [state, router]);

  return (
    <Modal open={!state.success}>
      <form action={action} className="p-8 pt-4">
        <h2 className="font-bold text-4xl">Create your account</h2>
        <div className="flex flex-col mt-8 gap-2">
          <Input
            name="name"
            type="text"
            placeholder="Name"
            invalid={!state.success && !!state.errors?.["name"]}
          />
          {!state.success && state.errors?.["name"] && (
            <p className="text-red-500">{state.errors["name"]}</p>
          )}
          <Input
            name="email"
            type="email"
            placeholder="Email"
            invalid={!state.success && !!state.errors?.["email"]}
          />
          {!state.success && state.errors?.["email"] && (
            <p className="text-red-500">{state.errors["email"]}</p>
          )}
          <Input
            name="password"
            type="password"
            placeholder="Password"
            invalid={!state.success && !!state.errors?.["password"]}
          />
          {!state.success && state.errors?.["password"] && (
            <p className="text-red-500">{state.errors["password"]}</p>
          )}
        </div>
        <p className="font-bold mt-6">Date of birth</p>
        <p className="text-gray-500 text-sm mt-1 leading-tight">
          This will not be shown publicly. Confirm your own age, even if this
          account is for a business, a pet, or something else.
        </p>
        <div className="flex my-2 gap-1.5">
          <Select
            label="Month"
            name="birthMonth"
            value={birthMonth}
            onChange={(e) =>
              setBirthMonth(e.target.value as (typeof MONTHS)[number])
            }
          >
            {MONTHS.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </Select>
          <Select label="Day" name="birthDay">
            {[...new Array(daysOptions)]
              .map((_, index) => index + 1)
              .map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
          </Select>
          <Select label="Year" name="birthYear">
            {[...new Array(new Date().getFullYear() - 1902)]
              .map((_: any, i) => i + 1903)
              .reverse()
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
          </Select>
        </div>
        {!state.success && state.message && (
          <p className="text-red-500 mt-2">{state.message}</p>
        )}
        <SubmitButton className="flex items-center justify-center gap-2 bg-twitter-blue text-center p-3.5 w-full rounded-full mt-2 font-semibold">
          Signup
        </SubmitButton>
      </form>
    </Modal>
  );
}
