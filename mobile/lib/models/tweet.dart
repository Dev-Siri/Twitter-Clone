class Tweet {
  final String caption;
  final String createdAt;
  final String? media;
  final String tweetId;
  final String userId;
  final String name;
  final String userImage;
  final String tag;

  const Tweet({
    required this.caption,
    required this.createdAt,
    this.media,
    required this.tweetId,
    required this.userId,
    required this.name,
    required this.userImage,
    required this.tag,
  });

  factory Tweet.fromJson(Map<String, dynamic> json) => Tweet(
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

class IndividualTweet extends Tweet {
  final String? inReplyToTweetId;
  final String platform;

  const IndividualTweet({
    required super.caption,
    required super.createdAt,
    super.media,
    required super.tweetId,
    required super.userId,
    required super.name,
    required super.userImage,
    required super.tag,
    this.inReplyToTweetId,
    required this.platform,
  });

  factory IndividualTweet.fromJson(Map<String, dynamic> json) =>
      IndividualTweet(
        caption: json["caption"] as String,
        createdAt: json["createdAt"] as String,
        media: json["media"] as String?,
        tweetId: json["tweetId"] as String,
        userId: json["userId"] as String,
        name: json["name"] as String,
        userImage: json["userImage"] as String,
        tag: json["tag"] as String,
        inReplyToTweetId: json["inReplyToTweetId"] as String?,
        platform: json["platform"] as String,
      );
}
