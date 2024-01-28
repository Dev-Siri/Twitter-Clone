import "package:flutter/material.dart";
import "package:twitter/utils/formatting.dart";

class TweetInteractionMetric extends StatelessWidget {
  final void Function() onPressed;
  final Widget icon;
  final int count;
  final bool showCount;

  const TweetInteractionMetric({
    super.key,
    required this.onPressed,
    required this.count,
    required this.icon,
    this.showCount = true,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 40,
      child: Row(
        children: <Widget>[
          TextButton(
            style: TextButton.styleFrom(
              minimumSize: Size.zero,
              padding: const EdgeInsets.all(3),
              tapTargetSize: MaterialTapTargetSize.shrinkWrap,
            ),
            onPressed: onPressed,
            child: icon,
          ),
          if (count > 0 && showCount)
            Text(
              compactify(count),
              style: const TextStyle(
                color: Colors.grey,
                fontWeight: FontWeight.normal,
              ),
            ),
        ],
      ),
    );
  }
}
