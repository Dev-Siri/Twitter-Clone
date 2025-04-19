import "package:flutter/material.dart";

class Input extends StatelessWidget {
  final TextEditingController? controller;
  final void Function(String value)? onChanged;
  final String? placeholder;
  final Widget? leading;
  final TextInputType? keyboardType;
  final bool censored;

  const Input({
    super.key,
    this.controller,
    this.onChanged,
    this.placeholder,
    this.leading,
    this.keyboardType,
    this.censored = false,
  });

  @override
  Widget build(BuildContext context) {
    final primaryColor = Theme.of(context).primaryColor;

    return TextField(
      controller: controller,
      onChanged: onChanged,
      cursorColor: primaryColor,
      keyboardType: keyboardType,
      obscureText: censored,
      decoration: InputDecoration(
        border: OutlineInputBorder(
          borderSide: BorderSide(
            color: Colors.grey.shade600,
            width: 2,
          ),
        ),
        focusedBorder: OutlineInputBorder(
          borderSide: BorderSide(
            color: primaryColor,
            width: 2,
          ),
        ),
        suffixIcon: leading,
        floatingLabelStyle: TextStyle(color: primaryColor),
        labelText: placeholder,
      ),
    );
  }
}
