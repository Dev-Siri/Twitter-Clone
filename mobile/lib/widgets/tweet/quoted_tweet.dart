import "package:flutter/widgets.dart";

class QuotedTweet extends StatefulWidget {
  final String id;

  const QuotedTweet({
    super.key,
    required this.id,
  });

  @override
  State<QuotedTweet> createState() => _QuotedTweetState();
}

class _QuotedTweetState extends State<QuotedTweet> {
  @override
  Widget build(BuildContext context) {
    return Text(widget.id);
  }
}
