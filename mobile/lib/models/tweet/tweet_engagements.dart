class TweetEngagements {
  final int likes;
  final int replies;
  final int retweets;
  final int quoteTweets;

  const TweetEngagements({
    required this.likes,
    required this.replies,
    required this.retweets,
    required this.quoteTweets,
  });

  factory TweetEngagements.fromJson(Map<String, dynamic> json) =>
      TweetEngagements(
        likes: json["likes"] as int,
        replies: json["replies"] as int,
        retweets: json["retweets"] as int,
        quoteTweets: json["quoteTweets"] as int,
      );
}
