import "package:flutter/material.dart";
import "package:twitter/widgets/ui/input.dart";

class StepTwo extends StatefulWidget {
  final void Function(String value) onChange;

  const StepTwo({
    super.key,
    required this.onChange,
  });

  @override
  State<StepTwo> createState() => _StepTwoState();
}

class _StepTwoState extends State<StepTwo> {
  bool _isPasswordHidden = true;

  void _parseValue(String value) {
    widget.onChange(value);
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 20),
      child: Input(
        placeholder: "Password",
        onChanged: _parseValue,
        keyboardType: TextInputType.visiblePassword,
        censored: _isPasswordHidden,
        leading: Padding(
          padding: const EdgeInsets.only(right: 10, top: 10, bottom: 10),
          child: IconButton(
            onPressed: () =>
                setState(() => _isPasswordHidden = !_isPasswordHidden),
            icon: const Icon(Icons.remove_red_eye),
          ),
        ),
      ),
    );
  }
}
