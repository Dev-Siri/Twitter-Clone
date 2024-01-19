import "package:flutter/material.dart";
import "package:provider/provider.dart";
import "package:twitter/models/tweet.dart";
import "package:twitter/services/tweet_service.dart";
import "package:twitter/utils/encoding.dart";
import "package:twitter/widgets/profile_drawer.dart";
import "package:twitter/widgets/top_bar.dart";
import "package:twitter/widgets/tweet/tweet_card.dart";
import "package:twitter/widgets/ui/button.dart";
import "package:twitter/widgets/ui/loading_indicator.dart";
import "package:twitter/widgets/user_icon.dart";

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  final List<Tweet> _tweets = [];

  int _page = 1;
  bool _errorOccured = false;
  bool _isLoading = true;

  @override
  void initState() {
    _fetchTweets();
    super.initState();
  }

  Future<void> _fetchTweets() async {
    final tweetsRespose =
        await context.read<TweetService>().fetchTweets(page: _page);

    if (tweetsRespose is ApiResponseError) {
      setState(() {
        _errorOccured = true;
        _isLoading = false;
      });
      return;
    }

    if (tweetsRespose is ApiResponseSuccess) {
      setState(() {
        _tweets.addAll(tweetsRespose.data);
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const ProfileDrawer(),
      appBar: const TopBar(
        leading: UserIcon(),
      ),
      body: Container(
        width: double.infinity,
        decoration: BoxDecoration(
          border: Border(
            top: BorderSide(width: 1, color: Colors.grey.shade300),
          ),
        ),
        child: (() {
          if (_isLoading) {
            return const Padding(
              padding: EdgeInsets.symmetric(vertical: 50),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[LoadingIndicator(size: 20)],
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
                        _fetchTweets();
                      },
                      text: "Retry",
                      small: true,
                    ),
                  ),
                ],
              ),
            );
          }

          return ListView.builder(
            addAutomaticKeepAlives: false,
            itemCount: _tweets.length,
            itemBuilder: (context, index) {
              final tweet = _tweets[index];

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
          );
        })(),
      ),
    );
  }
}
