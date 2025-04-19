import "package:flutter/gestures.dart";
import "package:flutter/material.dart";
import "package:twitter/utils/url.dart";
import "package:twitter/widgets/tweet/quoted_tweet.dart";

class InteractiveText extends StatelessWidget {
  final String text;
  final double fontSize;
  final bool selectable;

  const InteractiveText({
    super.key,
    required this.text,
    this.fontSize = 16,
    this.selectable = false,
  });

  @override
  Widget build(BuildContext context) {
    final words = text.split(RegExp(r"(\s+)"));
    final twitterQuotedUrls = findTwitterUrls(words);
    final firstUrl = twitterQuotedUrls.firstOrNull ?? "";
    final quoteTweetId = getTwitterStatusUuid(firstUrl);
    final span = TextSpan(
        style: DefaultTextStyle.of(context).style,
        children: words.where((word) => word != firstUrl).map(
          (word) {
            if (word.startsWith("@")) {
              return TextSpan(
                recognizer: TapGestureRecognizer()..onTap = () => print("h"),
                text: "$word ",
                style: TextStyle(
                  color: Theme.of(context).primaryColor,
                  fontSize: fontSize,
                ),
              );
            }

            return TextSpan(
              text: "$word ",
              style: TextStyle(fontSize: fontSize),
            );
          },
        ).toList());
    final mainText =
        selectable ? SelectableText.rich(span) : RichText(text: span);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        mainText,
        if (quoteTweetId != null) QuotedTweet(id: quoteTweetId)
      ],
    );
  }
}
