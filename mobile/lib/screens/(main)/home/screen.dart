import "package:flutter/material.dart";
import "package:provider/provider.dart";
import "package:twitter/models/tweet/grouped_tweet.dart";
import "package:twitter/services/tweet_service.dart";
import "package:twitter/utils/encoding.dart";
import "package:twitter/widgets/tweet/tweet_card.dart";
import "package:twitter/widgets/ui/button.dart";
import "package:twitter/widgets/ui/loading_indicator.dart";

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

int page = 1;

class _HomeState extends State<Home> {
  final List<GroupedTweet> _tweets = [];

  bool _errorOccured = false;
  bool _reachedEndOfTimeline = false;
  bool _isLoading = true;

  @override
  void initState() {
    page = 1;
    _fetchTweets(page);
    super.initState();
  }

  Future<void> _fetchTweets(int page) async {
    final tweetsRespose =
        await context.read<TweetService>().fetchTweets(page: page);

    if (tweetsRespose is ApiResponseError) {
      setState(() {
        _errorOccured = true;
        _isLoading = false;
      });
      return;
    }

    if (tweetsRespose is ApiResponseSuccess) {
      final tweets = tweetsRespose.data as List<GroupedTweet>;

      setState(() {
        if (tweets.isEmpty) {
          _reachedEndOfTimeline = true;
        } else {
          _tweets.addAll(tweets);
        }

        _isLoading = false;
      });
    }
  }

  Future<void> _refreshTweets() async {
    setState(() => _isLoading = true);
    page = 1;
    _fetchTweets(page);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        border: Border(
          top: BorderSide(
            width: 1,
            color: Colors.grey.shade200,
          ),
        ),
      ),
      child: (() {
        if (_isLoading) {
          return const Padding(
            padding: EdgeInsets.symmetric(vertical: 50),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[LoadingIndicator()],
            ),
          );
        }

        if (_errorOccured) {
          return Padding(
            padding: const EdgeInsets.symmetric(vertical: 50),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: <Widget>[
                const Icon(
                  Icons.error,
                  color: Colors.red,
                ),
                const Padding(
                  padding: EdgeInsets.symmetric(vertical: 16),
                  child: Text(
                    "Failed to get Tweets",
                    style: TextStyle(color: Colors.red),
                  ),
                ),
                SizedBox(
                  width: 100,
                  child: Button(
                    onPressed: () {
                      setState(() {
                        _isLoading = true;
                        _errorOccured = false;
                      });
                      _fetchTweets(page);
                    },
                    text: "Retry",
                    small: true,
                  ),
                ),
              ],
            ),
          );
        }

        return RefreshIndicator(
          onRefresh: _refreshTweets,
          color: Theme.of(context).primaryColor,
          child: ListView.builder(
            addAutomaticKeepAlives: false,
            itemCount: _tweets.length,
            itemBuilder: (context, index) {
              final tweet = _tweets[index];

              if (!_reachedEndOfTimeline && index + 1 == _tweets.length) {
                page++;
                _fetchTweets(page);

                return const Padding(
                  padding: EdgeInsets.all(8),
                  child: Center(child: LoadingIndicator(size: 10)),
                );
              }

              return TweetCard(
                caption: tweet.caption,
                createdAt: tweet.createdAt,
                tweetId: tweet.tweetId,
                userId: tweet.userId,
                media: tweet.media,
                name: tweet.name,
                tag: tweet.tag,
                userImage: tweet.userImage,
              );
            },
          ),
        );
      })(),
    );
  }
}
