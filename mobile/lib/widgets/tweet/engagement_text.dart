import "package:flutter/material.dart";

class EngagementText extends StatelessWidget {
  final int metric;
  final String type;
  final String screenTo;

  const EngagementText({
    super.key,
    required this.metric,
    required this.type,
    required this.screenTo,
  });

  @override
  Widget build(BuildContext context) {
    return TextButton(
      style: TextButton.styleFrom(
        minimumSize: Size.zero,
        padding: EdgeInsets.zero,
        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
      ),
      onPressed: () => Navigator.pushNamed(context, "/user/status/$screenTo"),
      child: Row(
        children: <Widget>[
          Text(
            "$metric ",
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 16,
            ),
          ),
          Text(
            metric == 1 ? type : "${type}s",
            style: const TextStyle(
              color: Colors.grey,
              fontWeight: FontWeight.normal,
              fontSize: 16,
            ),
          ),
        ],
      ),
    );
  }
}
