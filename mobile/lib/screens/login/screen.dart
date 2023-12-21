import "package:flutter/material.dart";
import "package:twitter/widgets/top_bar.dart";
import "package:twitter/widgets/ui/button.dart";
import "package:twitter/widgets/ui/text_button.dart";

class Login extends StatelessWidget {
  const Login({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const TopBar(),
      body: Padding(
        padding: const EdgeInsets.symmetric(
          vertical: 30,
          horizontal: 40,
        ),
        child: Column(
          children: <Widget>[
            const Padding(
              padding: EdgeInsets.only(top: 190),
              child: Text(
                "Welcome back! Log in to see the latest.",
                style: TextStyle(
                  fontSize: 31,
                  fontWeight: FontWeight.bold,
                  height: 1.3,
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.only(top: 50),
              width: double.infinity,
              child: Button(
                text: "Log in",
                onPressed: () => Navigator.pushNamed(context, "/i/flow/login"),
              ),
            ),
            const Spacer(),
            Row(
              children: <Widget>[
                Text(
                  "Don't have an account?",
                  style: TextStyle(
                    color: Colors.grey.shade700,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 5),
                  child: LinkButton(
                    onPressed: () => Navigator.pushNamed(context, "/signup"),
                    text: "Sign up",
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
