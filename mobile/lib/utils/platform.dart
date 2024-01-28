String getPlatformText(String platform) {
  switch (platform) {
    case "android":
      return "Twitter for Android";
    case "ios":
      return "Twitter for iPhone";
    case "web":
      return "Twitter Web App";
    default:
      return "Twitter for something";
  }
}
