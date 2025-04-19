import "package:flutter/material.dart";

class TransparentBackButton extends StatelessWidget {
  const TransparentBackButton({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialButton(
      onPressed: () => Navigator.pop(context),
      padding: EdgeInsets.zero,
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(100),
          color: Colors.black.withOpacity(0.4),
        ),
        height: 40,
        width: 40,
        padding: const EdgeInsets.all(6),
        child: const Icon(
          Icons.arrow_back,
          color: Colors.white,
        ),
      ),
    );
  }
}
