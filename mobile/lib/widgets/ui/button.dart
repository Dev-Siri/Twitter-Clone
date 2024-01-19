import "package:flutter/material.dart";
import "package:twitter/widgets/ui/loading_indicator.dart";

class Button extends StatelessWidget {
  final String text;
  final void Function() onPressed;
  final Color bgColor;
  final Color textColor;
  final bool small;
  final bool disabled;
  final bool isLoading;

  const Button({
    super.key,
    required this.text,
    required this.onPressed,
    this.bgColor = Colors.black,
    this.textColor = Colors.white,
    this.small = false,
    this.disabled = false,
    this.isLoading = false,
  });

  // TODO: Make colors dark mode compatible
  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(50),
      child: MaterialButton(
        color: bgColor,
        padding: EdgeInsets.all(small ? 12 : 15),
        disabledColor: Colors.black87,
        onPressed: disabled ? null : onPressed,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Padding(
              padding: EdgeInsets.only(right: isLoading ? 8 : 0),
              child: Text(
                text,
                style: TextStyle(
                  color: disabled ? Colors.grey.shade400 : textColor,
                  fontWeight: FontWeight.bold,
                  fontSize: small ? 17 : 15,
                ),
              ),
            ),
            if (isLoading) const LoadingIndicator(),
          ],
        ),
      ),
    );
  }
}
