import "package:flutter/material.dart";
import "package:flutter_svg/flutter_svg.dart";
import "package:provider/provider.dart";
import "package:twitter/icons.dart";
import "package:twitter/models/tweet/tweet_engagements.dart";
import "package:twitter/services/tweet_service.dart";
import "package:twitter/services/user_service.dart";
import "package:twitter/utils/encoding.dart";
import "package:twitter/widgets/tweet/engagement_text.dart";
import "package:twitter/widgets/tweet/retweet_options.dart";
import "package:twitter/widgets/tweet/tweet_interaction_metric.dart";

enum TweetInteractionsLayout { card, screen }

class TweetInteractions extends StatefulWidget {
  final TweetInteractionsLayout layout;
  final String tweetId;

  const TweetInteractions({
    super.key,
    required this.layout,
    required this.tweetId,
  });

  @override
  State<TweetInteractions> createState() => _TweetInteractionsState();
}

class _TweetInteractionsState extends State<TweetInteractions> {
  bool _isLiked = false;
  bool _isRetweeted = false;
  int _likes = 0;
  int _replies = 0;
  int _retweets = 0;
  int _quoteTweets = 0;

  Future<void> _fetchEngagements() async {
    final tweetService = context.read<TweetService>();
    final user = await context.read<UserService>().user;

    final engagementFuture =
        tweetService.fetchTweetEngagements(tweetId: widget.tweetId);
    final isAlreadyLikedFuture = tweetService.fetchIsAlreadyLiked(
      tweetId: widget.tweetId,
      userId: user?.userId ?? "",
    );
    final isAlreadyRetweetedFuture = tweetService.fetchIsAlreadyRetweeted(
      tweetId: widget.tweetId,
      userId: user?.userId ?? "",
    );

    final (tweetEngagementResponse, isLikedResponse, isRetweetedResponse) =
        await (engagementFuture, isAlreadyLikedFuture, isAlreadyRetweetedFuture)
            .wait;

    if (tweetEngagementResponse is ApiResponseSuccess && mounted) {
      final data = tweetEngagementResponse.data as TweetEngagements;

      setState(() {
        _likes = data.likes;
        _replies = data.replies;
        _retweets = data.retweets;
        _quoteTweets = data.quoteTweets;
      });
    }

    if (isLikedResponse is ApiResponseSuccess && mounted) {
      setState(() => _isLiked = isLikedResponse.data as bool);
    }

    if (isRetweetedResponse is ApiResponseSuccess && mounted) {
      setState(() => _isRetweeted = isRetweetedResponse.data as bool);
    }
  }

  @override
  void initState() {
    _fetchEngagements();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    final retweetsAndQuoteTweets = _retweets + _quoteTweets;

    return Column(
      children: <Widget>[
        if (widget.layout == TweetInteractionsLayout.screen &&
            !(_likes < 1 && _retweets < 1 && _quoteTweets < 1))
          Container(
            decoration: BoxDecoration(
              border: Border(
                top: BorderSide(
                  color: Colors.grey.shade200,
                  width: 1,
                ),
              ),
            ),
            padding: const EdgeInsets.all(10),
            child: Row(
              children: <Widget>[
                if (_likes > 0)
                  EngagementText(
                    metric: _likes,
                    type: "Like",
                    screenTo: "likes",
                  ),
                if (_retweets > 0)
                  Padding(
                    padding: const EdgeInsets.only(left: 10),
                    child: EngagementText(
                      metric: _retweets,
                      type: "Retweet",
                      screenTo: "retweets",
                    ),
                  ),
                if (_quoteTweets > 0)
                  Padding(
                    padding: const EdgeInsets.only(left: 10),
                    child: EngagementText(
                      metric: _quoteTweets,
                      type: "Quote Tweet",
                      screenTo: "quotes",
                    ),
                  ),
              ],
            ),
          ),
        Container(
          decoration: BoxDecoration(
            border: Border(
              top: BorderSide(
                width: widget.layout == TweetInteractionsLayout.screen ? 1 : 0,
                color: widget.layout == TweetInteractionsLayout.screen
                    ? Colors.grey.shade200
                    : Colors.transparent,
              ),
            ),
          ),
          padding: EdgeInsets.symmetric(
            vertical: widget.layout == TweetInteractionsLayout.screen ? 8 : 0,
          ),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: <Widget>[
              TweetInteractionMetric(
                onPressed: () =>
                    Navigator.pushNamed(context, "/user/status/reply"),
                count: _replies,
                textColor: Colors.grey,
                showCount: widget.layout == TweetInteractionsLayout.card,
                icon: SvgPicture(
                  comment,
                  height:
                      widget.layout == TweetInteractionsLayout.card ? 18 : 20,
                  width:
                      widget.layout == TweetInteractionsLayout.card ? 18 : 20,
                  colorFilter:
                      const ColorFilter.mode(Colors.grey, BlendMode.srcIn),
                ),
              ),
              TweetInteractionMetric(
                onPressed: () => showModalBottomSheet(
                  context: context,
                  builder: (_) => RetweetOptions(
                    tweetId: widget.tweetId,
                    onRetweet: () => setState(() {
                      _retweets++;
                      _isRetweeted = true;
                    }),
                    onQuoteTweet: () => setState(() => _quoteTweets++),
                  ),
                ),
                textColor: _isRetweeted ? Colors.green : Colors.grey,
                count: retweetsAndQuoteTweets,
                showCount: widget.layout == TweetInteractionsLayout.card,
                icon: SvgPicture(
                  retweet,
                  height:
                      widget.layout == TweetInteractionsLayout.card ? 18 : 20,
                  width:
                      widget.layout == TweetInteractionsLayout.card ? 18 : 20,
                  colorFilter: ColorFilter.mode(
                    _isRetweeted ? Colors.green : Colors.grey,
                    BlendMode.srcIn,
                  ),
                ),
              ),
              TweetInteractionMetric(
                onPressed: () => setState(() {
                  if (_isLiked) {
                    _isLiked = false;
                    _likes--;
                  } else {
                    _isLiked = true;
                    _likes++;
                  }
                }),
                count: _likes,
                textColor: _isLiked ? Colors.red : Colors.grey,
                showCount: widget.layout == TweetInteractionsLayout.card,
                icon: SvgPicture(
                  _isLiked ? heartFilled : heartOutlined,
                  height:
                      widget.layout == TweetInteractionsLayout.card ? 18 : 20,
                  width:
                      widget.layout == TweetInteractionsLayout.card ? 18 : 20,
                  colorFilter: ColorFilter.mode(
                    _isLiked ? Colors.red : Colors.grey,
                    BlendMode.srcIn,
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
