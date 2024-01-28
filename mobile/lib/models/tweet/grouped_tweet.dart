class GroupedTweet {
  final String caption;
  final String createdAt;
  final String? media;
  final String tweetId;
  final String userId;
  final String name;
  final String userImage;
  final String tag;

  const GroupedTweet({
    required this.caption,
    required this.createdAt,
    this.media,
    required this.tweetId,
    required this.userId,
    required this.name,
    required this.userImage,
    required this.tag,
  });

  factory GroupedTweet.fromJson(Map<String, dynamic> json) => GroupedTweet(
        caption: json["caption"] as String,
        createdAt: json["createdAt"] as String,
        media: json["media"] as String?,
        tweetId: json["tweetId"] as String,
        userId: json["userId"] as String,
        name: json["name"] as String,
        userImage: json["userImage"] as String,
        tag: json["tag"] as String,
      );
}
