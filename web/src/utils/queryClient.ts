type Method =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "OPTIONS"
  | "HEAD"
  | "TRACE"
  | "CONNECT"
  | "PATCH";

interface Options {
  method: Method;
  body: Record<string, any>;
  searchParams: Record<string, any>;
  cache: RequestInit["cache"];
  revalidate: number;
  tags: string[];
}

type ApiResponse<T> = { status: number } & (
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      message: string;
    }
);

export default async function queryClient<T>(
  endpoint: string,
  {
    method = "GET",
    body,
    searchParams,
    cache,
    revalidate,
    tags,
  }: Partial<Options>
): Promise<ApiResponse<T>> {
  const url = new URL(endpoint, process.env.NEXT_PUBLIC_BACKEND_URL);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (searchParams)
    Object.keys(searchParams).forEach((searchParamKey) =>
      url.searchParams.set(searchParamKey, searchParams[searchParamKey])
    );

  try {
    const opts = {
      method,
      body: JSON.stringify(body),
      headers,
      cache,
      next: {
        revalidate,
        tags,
      },
    };

    const response = await fetch(url, opts);

    /*
      No need to care about the `response.ok`. Since the backend response is in the same structure as the
      TypeScript type `ApiResponse<T>` but instead follow the success: false structure  
     */

    if (response.headers.get("Content-Type")?.includes("application/json"))
      return await response.json();

    return {
      success: false,
      status: response.status,
      message: await response.text(),
    };
  } catch (error) {
    // Print the error message on the server, only trigger the error.tsx on the client.
    // Extra validation to make sure actual error objects are never printed in the browser.
    if (typeof window !== "undefined") throw error;

    if (error instanceof TypeError)
      console.error("A network error was thrown with message:", error.message);
    else if (error instanceof SyntaxError)
      console.error("Failed to parse JSON body:", error.message);
    else if (
      typeof DOMException !== "undefined" &&
      error instanceof DOMException &&
      error.name === "AbortError"
    )
      console.error("Request was aborted with message:", error.message);
    else if (error instanceof Error)
      console.error(
        "A new instance of `Error` was thrown with message:",
        error.message
      );
    else console.error("An unknown error was thrown:", error);

    throw error; // triggers error.tsx
  }
}
