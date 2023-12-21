import "package:flutter/material.dart";

class Input extends StatelessWidget {
  final TextEditingController? controller;
  final void Function(String value)? onChanged;
  final String? placeholder;

  const Input({
    super.key,
    this.controller,
    this.onChanged,
    this.placeholder,
  });

  @override
  Widget build(BuildContext context) {
    final primaryColor = Theme.of(context).primaryColor;

    return TextField(
      controller: controller,
      onChanged: onChanged,
      cursorColor: primaryColor,
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
        floatingLabelStyle: TextStyle(color: primaryColor),
        labelText: placeholder,
      ),
    );
  }
}
