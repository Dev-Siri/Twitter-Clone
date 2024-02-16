import "package:http/http.dart" as http;
import "package:twitter/constants.dart";
import "package:twitter/models/tweet/grouped_tweet.dart";
import "package:twitter/models/tweet/individual_tweet.dart";
import "package:twitter/models/tweet/tweet_engagements.dart";
import "package:twitter/utils/encoding.dart";

class TweetService {
  static const _url = "$backendUrl/tweets";
  static const _limit = 10;

  Future<ApiResponse> fetchTweets({required int page}) async {
    final response = await http.get(
      Uri.parse("$_url?page=$page&limit=$_limit"),
    );

    final parsedResponse =
        parseHttpResponse<List<GroupedTweet>>(response, (tweets) {
      final typedTweets = (tweets as List<dynamic>?);

      if (typedTweets == null) return [];

      return typedTweets
          .map((final tweet) => GroupedTweet.fromJson(tweet))
          .toList();
    });

    return parsedResponse;
  }

  Future<ApiResponse> fetchTweet({required String tweetId}) async {
    final response = await http.get(Uri.parse("$_url/$tweetId"));

    final parsedResponse = parseHttpResponse<IndividualTweet>(
        response, (tweet) => IndividualTweet.fromJson(tweet));

    return parsedResponse;
  }

  Future<ApiResponse> fetchTweetEngagements({required String tweetId}) async {
    final response = await http.get(
      Uri.parse("$_url/$tweetId/engagements"),
    );

    final parsedResponse = parseHttpResponse<TweetEngagements>(
      response,
      (engagements) => TweetEngagements.fromJson(engagements),
    );

    return parsedResponse;
  }

  Future<ApiResponse> fetchIsAlreadyLiked({
    required String tweetId,
    required String userId,
  }) async {
    final response = await http.get(
      Uri.parse("$_url/$tweetId/engagements/already-liked?userId=$userId"),
    );

    final parsedResponse =
        parseHttpResponse<bool>(response, (isAlreadyLiked) => isAlreadyLiked);

    return parsedResponse;
  }

  Future<ApiResponse> fetchIsAlreadyRetweeted({
    required String tweetId,
    required String userId,
  }) async {
    final response = await http.get(
      Uri.parse("$_url/$tweetId/engagements/already-retweeted?userId=$userId"),
    );

    final parsedResponse = parseHttpResponse<bool>(
        response, (isAlreadyRetweeted) => isAlreadyRetweeted);

    return parsedResponse;
  }
}
