import "package:flutter/material.dart";
import "package:twitter/screens/i/flow/login/screen.dart";
import "package:twitter/screens/i/flow/signup/screen.dart";
import "package:twitter/screens/login/screen.dart";
import "package:twitter/screens/home/screen.dart";
import "package:twitter/screens/signup/screen.dart";

final Map<String, WidgetBuilder> routes = {
  "/": (_) => const Home(),
  "/login": (_) => const Login(),
  "/signup": (_) => const Signup(),
  "/i/flow/login": (_) => const LoginFlow(),
  "/i/flow/signup": (_) => const SignupFlow(),
};
