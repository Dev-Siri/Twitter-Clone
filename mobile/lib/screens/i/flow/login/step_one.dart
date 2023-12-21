import "package:flutter/material.dart";
import "package:twitter/widgets/ui/input.dart";

enum LoginType { email, username }

class StepOne extends StatelessWidget {
  final void Function(String value, LoginType type) onChange;

  const StepOne({
    super.key,
    required this.onChange,
  });

  void _parseValue(String value) {
    final loginType =
        value.startsWith("@") ? LoginType.username : LoginType.email;

    onChange(value, loginType);
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 20),
      child: Input(
        placeholder: "Email, or username",
        onChanged: _parseValue,
      ),
    );
    // return Padding();
  }
}
