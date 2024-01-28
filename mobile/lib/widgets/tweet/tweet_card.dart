import "package:cached_network_image/cached_network_image.dart";
import "package:flutter/material.dart";
import "package:full_screen_image/full_screen_image.dart";
import "package:twitter/models/tweet/grouped_tweet.dart";
import "package:twitter/utils/date.dart";
import "package:twitter/widgets/interactive_text.dart";
import "package:twitter/widgets/tweet/tweet_interactions.dart";

class TweetCard extends StatelessWidget {
  final String caption;
  final String createdAt;
  final String? media;
  final String tweetId;
  final String userId;
  final String name;
  final String userImage;
  final String tag;

  const TweetCard({
    super.key,
    required this.caption,
    required this.createdAt,
    this.media,
    required this.tweetId,
    required this.userId,
    required this.name,
    required this.userImage,
    required this.tag,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(width: 1, color: Colors.grey.shade200),
        ),
      ),
      child: MaterialButton(
        onPressed: () => Navigator.pushNamed(
          context,
          "/user/status",
          arguments: GroupedTweet(
            caption: caption,
            createdAt: createdAt,
            tweetId: tweetId,
            userId: userId,
            name: name,
            userImage: userImage,
            tag: tag,
          ),
        ),
        padding: const EdgeInsets.all(10),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.only(right: 10),
              child: CircleAvatar(
                foregroundImage: CachedNetworkImageProvider(userImage),
                radius: 20,
              ),
            ),
            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Row(
                    children: <Widget>[
                      Text(
                        name,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(left: 4),
                        child: Text(
                          "@$tag · ${getRelativeTime(createdAt)}",
                          style: const TextStyle(
                            color: Colors.grey,
                            fontWeight: FontWeight.normal,
                          ),
                        ),
                      )
                    ],
                  ),
                  InteractiveText(text: caption),
                  if (media != null)
                    Padding(
                      padding: const EdgeInsets.only(top: 10),
                      child: FullScreenWidget(
                        disposeLevel: DisposeLevel.Low,
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(10),
                          child: CachedNetworkImage(imageUrl: media!),
                        ),
                      ),
                    ),
                  Padding(
                    padding: const EdgeInsets.only(top: 10, right: 38),
                    child: TweetInteractions(
                      layout: TweetInteractionsLayout.card,
                      tweetId: tweetId,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
