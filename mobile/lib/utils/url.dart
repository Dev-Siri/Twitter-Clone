bool isTwitterStatusUrl(String url) {
  final urlPattern = RegExp(
    r"^https:\/\/twitter-revived\.vercel\.app\/[^\/]+\/status\/[a-f0-9-]+$",
  );

  return urlPattern.hasMatch(url);
}

String? getTwitterStatusUuid(String url) {
  final urlPattern = RegExp(
    r"^https:\/\/twitter-revived\.vercel\.app\/[^\/]+\/status\/([a-f0-9-]+)$",
  );
  final match = urlPattern.firstMatch(url);

  if (match == null) return null;

  return match.groupCount < 1 ? null : match.group(1);
}

List<String> findTwitterUrls(List<String> strings) {
  final pattern = RegExp(
    r"https:\/\/twitter-revived\.vercel\.app\/[^\/]+\/status\/[^\/]+",
  );

  return strings.where((str) => pattern.hasMatch(str)).toList();
}
