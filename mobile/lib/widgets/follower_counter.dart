import "package:flutter/material.dart";

class FollowerCounter extends StatefulWidget {
  final String tag;

  const FollowerCounter({
    super.key,
    required this.tag,
  });

  @override
  State<FollowerCounter> createState() => _FollowerCounterState();
}

class _FollowerCounterState extends State<FollowerCounter> {
  int _followerCount = 0;
  int _followingCount = 0;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: <Widget>[
        Row(
          children: <Text>[
            Text(
              _followingCount.toString(),
              style: const TextStyle(fontWeight: FontWeight.bold),
            ),
            Text(
              " Following",
              style: TextStyle(color: Colors.grey.shade700),
            ),
          ],
        ),
        Padding(
          padding: const EdgeInsets.only(left: 8),
          child: Row(
            children: <Text>[
              Text(
                _followerCount.toString(),
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
              Text(
                " Followers",
                style: TextStyle(color: Colors.grey.shade700),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
