import "package:flutter/material.dart";
import "package:twitter/widgets/ui/input.dart";

class StepOne extends StatelessWidget {
  final void Function(String value) onChange;

  const StepOne({
    super.key,
    required this.onChange,
  });

  void _parseValue(String newValue) {
    onChange(newValue);
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
  }
}
