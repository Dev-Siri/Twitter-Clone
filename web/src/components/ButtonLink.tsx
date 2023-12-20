"use client";
import { useRouter } from "next/navigation";

import type { ComponentProps } from "react";

interface Props extends ComponentProps<"span"> {
  href: string;
}

/**
 * This component is purely intended to prevent validDOMNesting() errors and it only works with JS enabled
 *
 * Try to always use the Next.js <Link> tag. ONLY, AND ONLY use this Component if you are facing a situation like this:
 *
 * ```tsx
 * <Link href="/">
 *   {...}
 *   <Link href="/somewhere">
 *     This is a link inside a link which isn't allowed and causes
 *     a hydration error in React + is a non-semantic syntax in HTML.
 *   </Link>
 *  <ButtonLink href="/somewhere">
 *    Use this instead ✅
 *    This uses useRouter() from Next.js with onClick instead.
 *  </ButtonLink>
 * </Link>
 * ```
 */
export default function ButtonLink({ children, href, ...props }: Props) {
  const router = useRouter();

  return (
    <span onClick={() => router.push(href)} {...props}>
      {children}
    </span>
  );
}
