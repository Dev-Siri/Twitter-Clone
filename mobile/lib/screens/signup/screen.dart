import "package:flutter/material.dart";
import "package:twitter/widgets/top_bar.dart";
import "package:twitter/widgets/ui/button.dart";
import "package:twitter/widgets/ui/text_button.dart";
import "package:url_launcher/url_launcher.dart";

class Signup extends StatelessWidget {
  const Signup({super.key});

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
                "See what's happening in the world right now.",
                style: TextStyle(
                  fontSize: 31,
                  fontWeight: FontWeight.bold,
                  height: 1.3,
                ),
              ),
            ),
            Container(
              margin: const EdgeInsets.only(
                top: 220,
                bottom: 20,
              ),
              width: double.infinity,
              child: Button(
                text: "Create account",
                onPressed: () => Navigator.pushNamed(context, "/i/flow/signup"),
              ),
            ),
            Wrap(
              alignment: WrapAlignment.start,
              children: <Widget>[
                Text(
                  "By signing up, you agree to our ",
                  style: TextStyle(color: Colors.grey.shade700),
                ),
                LinkButton(
                  text: "Terms",
                  onPressed: () => launchUrl(
                    Uri.parse("https://twitter-revived.vercel.app/legal/tos"),
                  ),
                ),
                const Text(", "),
                LinkButton(
                  text: "Privacy",
                  onPressed: () => launchUrl(
                    Uri.parse(
                      "https://twitter-revived.vercel.app/legal/privacy",
                    ),
                  ),
                ),
                LinkButton(
                  text: "Policy",
                  onPressed: () => launchUrl(
                    Uri.parse(
                      "https://twitter-revived.vercel.app/legal/privacy",
                    ),
                  ),
                ),
                const Text(", and "),
                LinkButton(
                  text: "Cookie Use",
                  onPressed: () => launchUrl(
                    Uri.parse(
                      "https://help.twitter.com/en/rules-and-policie/twitter-cookies",
                    ),
                  ),
                ),
                const Text("."),
              ],
            ),
            const Spacer(),
            Row(
              children: <Widget>[
                Text(
                  "Have an account already?",
                  style: TextStyle(
                    color: Colors.grey.shade700,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 5),
                  child: LinkButton(
                    onPressed: () => Navigator.pushNamed(context, "/login"),
                    text: "Log in",
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
