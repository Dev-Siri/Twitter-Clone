import "package:flutter/material.dart";
import "package:flutter_svg/flutter_svg.dart";
import "package:twitter/icons.dart";

class RetweetOptions extends StatelessWidget {
  final String tweetId;
  final void Function() onRetweet;
  final void Function() onQuoteTweet;

  const RetweetOptions({
    super.key,
    required this.tweetId,
    required this.onRetweet,
    required this.onQuoteTweet,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 200,
      width: double.infinity,
      child: Column(
        children: <Widget>[
          Container(
            decoration: BoxDecoration(
              color: Colors.grey,
              borderRadius: BorderRadius.circular(50),
            ),
            margin: const EdgeInsets.only(
              top: 10,
              bottom: 20,
            ),
            height: 6,
            width: 50,
          ),
          MaterialButton(
            onPressed: () => print("something happened²"),
            child: const Padding(
              padding: EdgeInsets.symmetric(vertical: 15),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  SvgPicture(
                    retweet,
                    colorFilter: ColorFilter.mode(Colors.grey, BlendMode.srcIn),
                  ),
                  Padding(
                    padding: EdgeInsets.only(left: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          "Retweet",
                          style: TextStyle(fontSize: 18),
                        ),
                        Text(
                          "Share this Tweet with your followers",
                          style: TextStyle(
                            color: Colors.grey,
                            fontWeight: FontWeight.normal,
                            fontSize: 12,
                          ),
                        )
                      ],
                    ),
                  )
                ],
              ),
            ),
          ),
          MaterialButton(
            onPressed: () => print("something happened²+1"),
            child: const Padding(
              padding: EdgeInsets.symmetric(vertical: 15),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  SvgPicture(
                    quote,
                    colorFilter: ColorFilter.mode(Colors.grey, BlendMode.srcIn),
                  ),
                  Padding(
                    padding: EdgeInsets.only(left: 10),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          "Quote Tweet",
                          style: TextStyle(fontSize: 18),
                        ),
                        Text(
                          "Add a comment, photo or GIF before you share this Tweet",
                          style: TextStyle(
                            color: Colors.grey,
                            fontWeight: FontWeight.normal,
                            fontSize: 12,
                          ),
                        )
                      ],
                    ),
                  )
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
