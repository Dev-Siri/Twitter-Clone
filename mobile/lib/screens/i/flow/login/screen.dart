import "package:flutter/material.dart";
import "package:twitter/screens/i/flow/login/step_one.dart";
import "package:twitter/widgets/top_bar.dart";
import "package:twitter/widgets/ui/button.dart";

class LoginFlow extends StatefulWidget {
  const LoginFlow({super.key});

  @override
  State<LoginFlow> createState() => _LoginFlowState();
}

enum LoginSteps { identification, password }

class _LoginFlowState extends State<LoginFlow> {
  LoginSteps _currentStep = LoginSteps.identification;

  String _loginValue = "";
  LoginType _loginType = LoginType.email;

  Widget _getCurrentStep() {
    if (_currentStep == LoginSteps.identification) {
      return StepOne(
        onChange: (value, type) => setState(() {
          _loginValue = value;
          _loginType = type;
        }),
      );
    }

    return const Placeholder();
  }

  Future<void> _login() async {}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: TopBar(
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: const Icon(Icons.close),
        ),
      ),
      body: Padding(
        padding: const EdgeInsets.only(top: 40),
        child: Column(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                children: <Widget>[
                  Text(
                    _currentStep == LoginSteps.identification
                        ? "To get started, first enter your email, or @username"
                        : "Enter your password",
                    textAlign: TextAlign.start,
                    style: const TextStyle(
                      fontSize: 29,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  _getCurrentStep(),
                ],
              ),
            ),
            const Spacer(),
            Container(
              decoration: BoxDecoration(
                border: Border(
                  top: BorderSide(
                    color: Colors.grey.shade600,
                    width: 1,
                  ),
                ),
              ),
              padding: const EdgeInsets.all(15),
              child: Row(
                children: <Widget>[
                  const Spacer(),
                  Button(
                    text: "Next",
                    small: true,
                    onPressed: _currentStep == LoginSteps.identification
                        ? () =>
                            setState(() => _currentStep = LoginSteps.password)
                        : _login,
                  ),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
