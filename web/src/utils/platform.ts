export function getPlatformText(platform: "android" | "ios" | "web") {
  switch (platform) {
    case "android":
      return "Twitter for Android";
    case "ios":
      return "Twitter for iPhone";
    case "web":
      return "Twitter Web Client";
  }
}
