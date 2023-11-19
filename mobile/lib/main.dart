import "package:flutter/material.dart";
import "package:provider/provider.dart";
import "package:twitter/routes.dart";
import "package:twitter/services/user_service.dart";

void main() => runApp(const App());

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [Provider(create: (_) => UserService())],
      builder: (_, __) => const StateWrapper(),
    );
  }
}

class StateWrapper extends StatefulWidget {
  const StateWrapper({super.key});

  @override
  State<StateWrapper> createState() => _StateWrapperState();
}

class _StateWrapperState extends State<StateWrapper> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "Twitter",
      routes: routes,
      // TODO: Update to change based on session
      initialRoute: "/login",
      theme: ThemeData(
        primaryColor: const Color.fromRGBO(29, 155, 240, 1),
        useMaterial3: true,
      ),
    );
  }
}
