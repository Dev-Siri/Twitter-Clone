import "package:flutter/material.dart";
import "package:twitter/screens/login.dart";
import "package:twitter/screens/home.dart";

final Map<String, WidgetBuilder> routes = {
  "/": (_) => const Home(),
  "/login": (_) => const Login(),
};
