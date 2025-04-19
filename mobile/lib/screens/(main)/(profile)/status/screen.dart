import "package:cached_network_image/cached_network_image.dart";
import "package:flutter/material.dart";
import "package:provider/provider.dart";
import "package:twitter/models/tweet/grouped_tweet.dart";
import "package:twitter/models/tweet/individual_tweet.dart";
import "package:twitter/services/tweet_service.dart";
import "package:twitter/utils/date.dart";
import "package:twitter/utils/encoding.dart";
import "package:twitter/utils/platform.dart";
import "package:twitter/widgets/interactive_text.dart";
import "package:twitter/widgets/tweet/tweet_card.dart";
import "package:twitter/widgets/tweet/tweet_interactions.dart";

class TweetStatus extends StatefulWidget {
  final GroupedTweet tweet;

  const TweetStatus({
    super.key,
    required this.tweet,
  });

  @override
  State<TweetStatus> createState() => _TweetStatusState();
}

class _TweetStatusState extends State<TweetStatus> {
  String _platform = "";

  List<GroupedTweet> _replies = [];

  @override
  void initState() {
    _fetchExtraTweetInfo();
    super.initState();
  }

  Future<void> _fetchExtraTweetInfo() async {
    final tweetService = context.read<TweetService>();
    final tweetResponse =
        await tweetService.fetchTweet(tweetId: widget.tweet.tweetId);
    final tweetRepliesResponse = await tweetService.fetchTweetReplies(
        tweetId: widget.tweet.tweetId, page: 1);

    if (tweetResponse is ApiResponseSuccess) {
      final tweet = tweetResponse.data as IndividualTweet;

      setState(() => _platform = getPlatformText(tweet.platform));
    }

    if (tweetRepliesResponse is ApiResponseSuccess) {
      final replies = tweetRepliesResponse.data as List<GroupedTweet>;

      setState(() => _replies = replies);
      print(replies);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: const BackButton(),
        title: const Text(
          "Tweet",
          style: TextStyle(fontWeight: FontWeight.w500),
        ),
      ),
      body: Container(
        decoration: BoxDecoration(
          border: Border(
            top: BorderSide(
              width: 1,
              color: Colors.grey.shade200,
            ),
          ),
        ),
        child: Column(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      CircleAvatar(
                        foregroundImage:
                            CachedNetworkImageProvider(widget.tweet.userImage),
                        radius: 20,
                      ),
                      Padding(
                        padding: const EdgeInsets.only(left: 8),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Text(
                              widget.tweet.name,
                              style:
                                  const TextStyle(fontWeight: FontWeight.bold),
                            ),
                            Text(
                              "@${widget.tweet.tag}",
                              style: const TextStyle(color: Colors.grey),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 8),
                    child: InteractiveText(
                      text: widget.tweet.caption,
                      fontSize: 20,
                      selectable: true,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 8),
                    child: Row(
                      children: <Widget>[
                        Text(
                          "${getTweetCreatedDate(widget.tweet.createdAt)} · ",
                          style: const TextStyle(color: Colors.grey),
                        ),
                        Text(
                          _platform,
                          style: TextStyle(
                            color: Theme.of(context).primaryColor,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(
                top: 4,
                left: 10,
                right: 10,
              ),
              child: TweetInteractions(
                layout: TweetInteractionsLayout.screen,
                tweetId: widget.tweet.tweetId,
              ),
            ),
            Container(
              width: double.infinity,
              decoration: BoxDecoration(
                border: Border(
                  top: BorderSide(
                    width: 1,
                    color: Colors.grey.shade200,
                  ),
                ),
              ),
              child: Column(
                children: _replies
                    .map((reply) => TweetCard(
                          caption: reply.caption,
                          createdAt: reply.createdAt,
                          name: reply.name,
                          tag: reply.tag,
                          tweetId: reply.tweetId,
                          userId: reply.userId,
                          userImage: reply.userImage,
                          media: reply.media,
                        ))
                    .toList(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
