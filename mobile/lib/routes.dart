import "package:flutter/material.dart";
import "package:page_transition/page_transition.dart";
import "package:twitter/models/tweet/grouped_tweet.dart";
import "package:twitter/screens/(main)/(profile)/status/screen.dart";
import "package:twitter/screens/(main)/layout.dart";
import "package:twitter/screens/i/flow/login/screen.dart";
import "package:twitter/screens/i/flow/signup/screen.dart";
import "package:twitter/screens/login/screen.dart";
import "package:twitter/screens/signup/screen.dart";

Route<dynamic>? generateRoute(RouteSettings setting) {
  switch (setting.name) {
    case "/":
      return PageTransition(
        child: const MainLayout(),
        type: PageTransitionType.rightToLeft,
        duration: const Duration(milliseconds: 500),
      );
    case "/login":
      return PageTransition(
        child: const Login(),
        type: PageTransitionType.rightToLeft,
        duration: const Duration(milliseconds: 500),
      );
    case "/signup":
      return PageTransition(
        child: const Signup(),
        type: PageTransitionType.rightToLeft,
        duration: const Duration(milliseconds: 500),
      );
    case "/i/flow/login":
      return PageTransition(
        child: const LoginFlow(),
        type: PageTransitionType.rightToLeft,
        duration: const Duration(milliseconds: 500),
      );
    case "/i/flow/signup":
      return PageTransition(
        child: const SignupFlow(),
        type: PageTransitionType.rightToLeft,
        duration: const Duration(milliseconds: 500),
      );
    case "/user/status":
      if (setting.arguments == null || setting.arguments is! GroupedTweet) {
        throw Exception(
            "Missing or invalid GroupedTweet argument to /user/status");
      }

      return PageTransition(
        child: TweetStatus(tweet: setting.arguments as GroupedTweet),
        type: PageTransitionType.rightToLeft,
        duration: const Duration(milliseconds: 500),
      );
  }

  return null;
}
