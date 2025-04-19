import "package:flutter/material.dart";

class LinkButton extends StatelessWidget {
  final String text;
  final void Function() onPressed;

  const LinkButton({
    super.key,
    required this.text,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: onPressed,
      style: TextButton.styleFrom(
        minimumSize: Size.zero,
        padding: EdgeInsets.zero,
        tapTargetSize: MaterialTapTargetSize.shrinkWrap,
      ),
      child: Text(
        text,
        style: const TextStyle(color: Colors.blue),
      ),
    );
  }
}
