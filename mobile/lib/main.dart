import "package:flutter/material.dart";
import "package:provider/provider.dart";
import "package:twitter/routes.dart";
import "package:twitter/services/tweet_service.dart";
import "package:twitter/services/user_service.dart";
import "package:twitter/widgets/ui/loading_indicator.dart";

void main() => runApp(const App());

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider(create: (_) => UserService()),
        Provider(create: (_) => TweetService()),
      ],
      builder: (_, __) => const StateWrapper(),
    );
  }
}

class StateWrapper extends StatelessWidget {
  const StateWrapper({super.key});

  @override
  Widget build(BuildContext context) {
    const twitterBlue = Color.fromRGBO(29, 155, 240, 1);

    return FutureBuilder(
        future: context.read<UserService>().user,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const LoadingIndicator();
          }

          return MaterialApp(
            title: "Twitter",
            onGenerateRoute: generateRoute,
            initialRoute: snapshot.data == null ? "/login" : "/",
            theme: ThemeData(
              primaryColor: twitterBlue,
              useMaterial3: true,
              fontFamily: "Chirp",
              colorScheme:
                  const ColorScheme.light().copyWith(secondary: twitterBlue),
              textSelectionTheme: TextSelectionThemeData(
                selectionColor: twitterBlue.withOpacity(0.3),
                cursorColor: twitterBlue,
                selectionHandleColor: twitterBlue,
              ),
            ),
          );
        });
  }
}
