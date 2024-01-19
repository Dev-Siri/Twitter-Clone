import "package:cached_network_image/cached_network_image.dart";
import "package:flutter/material.dart";

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
          bottom: BorderSide(width: 1, color: Colors.grey.shade300),
        ),
      ),
      child: MaterialButton(
        onPressed: () => print("something happened"),
        padding: const EdgeInsets.all(10),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.only(right: 10),
              child: CircleAvatar(
                foregroundImage: CachedNetworkImageProvider(userImage),
                radius: 23,
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
                          "@$tag",
                          style: const TextStyle(
                            color: Colors.grey,
                            fontWeight: FontWeight.normal,
                          ),
                        ),
                      )
                    ],
                  ),
                  Text(
                    caption,
                    softWrap: true,
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
