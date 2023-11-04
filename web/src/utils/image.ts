export async function getMediaType(
  url: string
): Promise<("image" | "video") | null> {
  try {
    const response = await fetch(url, { method: "HEAD" });

    const contentTypeHeader = response.headers.get("Content-Type");
    const fileExtension = contentTypeHeader
      ? contentTypeHeader.split("/").pop()
      : null;

    switch (fileExtension) {
      case "jpeg":
      case "jpg":
      case "png":
      case "gif":
        return "image";
      case "mp4":
      case "webm":
      case "avi":
      case "mkv":
        return "video";
      default:
        return null;
    }
  } catch {
    return null;
  }
}
