import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex gap-3 flex-wrap py-6 px-2 text-sm leading-3 text-gray-500">
      <Link className="cursor-pointer hover:underline" href="/legal/tos">
        Terms of Service
      </Link>
      <Link className="cursor-pointer hover:underline" href="/legal/privacy">
        Privacy Policy
      </Link>
      <span className="cursor-pointer hover:underline">Cookie Policy</span>
      <span className="cursor-pointer hover:underline">Accessibility</span>
      <span className="cursor-pointer hover:underline">Ads info</span>©{" "}
      {new Date().getFullYear()} Twitter Inc.
    </footer>
  );
}
