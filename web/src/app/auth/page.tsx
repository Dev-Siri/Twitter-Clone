import Image from "next/image";
import Link from "next/link";

import Logo from "@/components/icons/Logo";
import authBanner from "./auth-hero-banner.png";

export default function Auth() {
  return (
    <>
      <section className="relative items-center justify-center h-screen w-1/2 hidden md:flex">
        <div className="absolute text-white">
          <Logo fill="white" height={200} width={250} />
        </div>
        <Image
          src={authBanner}
          alt="Twitter. It's what's happening."
          height={800}
          width={800}
          priority
          className="h-full w-full object-cover"
        />
      </section>
      <section className="h-screen flex flex-col p-10 w-full md:w-1/2">
        <div className="md:hidden">
          <Logo fill="white" height={35} width={40} />
        </div>
        <h1 className="text-5xl mt-10 font-extrabold-xl block text-wrap md:text-6xl">
          Happening now
        </h1>
        <h2 className="text-2xl mt-10 font-extrabold-xl md:text-4xl">
          Join Twitter today.
        </h2>
        <Link
          href="/i/flow/signup"
          className="bg-twitter-blue p-2 text-center font-semibold rounded-full px-20 mt-10 md:w-fit"
        >
          Create account
        </Link>
        <p className="leading-tight text-xs mt-2 text-gray-500">
          By signing up, you agree to the{" "}
          <Link href="/legal/tos" className="text-twitter-blue hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/legal/privacy"
            className="text-twitter-blue hover:underline"
          >
            Privacy
          </Link>{" "}
          <br />
          Policy, including{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://help.twitter.com/rules-and-policies/twitter-cookies"
            className="text-twitter-blue hover:underline"
          >
            Cookie Use.
          </a>
        </p>
        <h4 className="font-semibold mt-auto">Already have an account?</h4>
        <Link
          href="/i/flow/login"
          className="text-twitter-blue border text-center border-gray-500 p-2 font-semibold rounded-full px-28 mt-3 duration-200 hover:bg-gray-900 md:w-fit"
        >
          Sign in
        </Link>
      </section>
    </>
  );
}
