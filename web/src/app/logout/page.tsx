import Link from "next/link";

import logout from "@/actions/users/logout";
import { useSession } from "@/hooks/useSession";

import Modal from "@/components/Modal";
import Logo from "@/components/icons/Logo";

export default function Logout() {
  const user = useSession();

  return (
    <Modal closeAction={false} className="w-fit mt-[13%] py-6 pl-8 pr-10">
      <form
        action={logout}
        className="flex flex-col justify-center items-center gap-2"
      >
        <Logo height={48} width={53} />
        <h1 className="font-semibold self-start text-2xl">
          Log out of @{user?.tag}?
        </h1>
        <p className="text-md text-gray-500 self-start">
          This will only apply to this account, <br />
          and you&apos;ll still be logged in to your <br />
          other accounts.
        </p>
        <button
          className="font-bold text-black p-3 w-full mt-2 rounded-full bg-white duration-200 hover:bg-gray-200"
          type="submit"
        >
          Logout
        </button>
        <Link
          href="/"
          className="font-bold p-3 w-full mt-2 text-center rounded-full border border-gray-800 duration-200"
        >
          Cancel
        </Link>
      </form>
    </Modal>
  );
}
