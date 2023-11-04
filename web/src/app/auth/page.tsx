import Image from "next/image";
import Link from "next/link";

export default function Auth() {
  return (
    <>
      <section className="h-screen w-1/2">
        <Image
          src="/images/auth-hero-banner.avif"
          alt="Twitter. It's what's happening."
          height={800}
          width={800}
          priority
          className="h-full w-full object-cover"
        />
      </section>
      <section className="h-screen flex flex-col p-10 w-1/2">
        <h1 className="text-6xl mt-10 font-extrabold-xl">Happening now</h1>
        <h2 className="text-4xl mt-10 font-extrabold-xl">
          Join Twitter today.
        </h2>
        <Link
          href="/i/flow/signup"
          className="bg-twitter-blue p-2 w-fit font-semibold rounded-full px-20 mt-10"
        >
          Create account
        </Link>
        <h4 className="font-semibold mt-auto">Already have an account?</h4>
        <Link
          href="/i/flow/login"
          className="text-twitter-blue border border-gray-500 p-2 w-fit font-semibold rounded-full px-28 mt-3 duration-200 hover:bg-gray-900"
        >
          Sign in
        </Link>
      </section>
    </>
  );
}
