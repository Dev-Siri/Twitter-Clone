import "package:flutter/material.dart";

class TopBar extends StatelessWidget implements PreferredSizeWidget {
  final Widget? leading;

  @override
  final Size preferredSize = const Size.fromHeight(50.0);

  const TopBar({
    super.key,
    this.leading,
  });

  @override
  Widget build(BuildContext context) {
    return AppBar(
      centerTitle: true,
      leading: leading ??
          const SizedBox(
            height: 0,
            width: 0,
          ),
      title: Image.asset(
        "assets/icon-blue.png",
        height: 90,
        width: 90,
      ),
    );
  }
}
