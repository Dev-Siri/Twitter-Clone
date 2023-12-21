import 'package:flutter/material.dart';

class Button extends StatelessWidget {
  final String text;
  final void Function() onPressed;
  final Color bgColor;
  final Color textColor;
  final bool small;

  const Button({
    super.key,
    required this.text,
    required this.onPressed,
    this.bgColor = Colors.black,
    this.textColor = Colors.white,
    this.small = false,
  });

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(50),
      child: MaterialButton(
        color: bgColor,
        padding: EdgeInsets.all(small ? 12 : 15),
        onPressed: onPressed,
        child: Text(
          text,
          style: TextStyle(
            color: textColor,
            fontWeight: FontWeight.bold,
            fontSize: small ? 17 : 15,
          ),
        ),
      ),
    );
  }
}
