import "package:http/http.dart" as http;
import "package:twitter/constants.dart";
import "package:twitter/models/tweet.dart";
import "package:twitter/utils/encoding.dart";

class TweetService {
  static const url = "$backendUrl/tweets";
  static const limit = 10;

  Future<ApiResponse> fetchTweets({
    required int page,
  }) async {
    final response = await http.get(
      Uri.parse("$url?page=$page&limit=$limit"),
    );

    final parsedResponse = parseHttpResponse<List<Tweet>>(
        response,
        (tweets) => (tweets as List<dynamic>)
            .map((final tweet) => Tweet.fromJson(tweet))
            .toList());

    return parsedResponse;
  }
}
