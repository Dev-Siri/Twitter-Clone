import "package:flutter/material.dart";
import "package:twitter/screens/i/flow/login/step_two.dart";
import "package:twitter/screens/i/flow/signup/step_one.dart";
import "package:twitter/widgets/top_bar.dart";
import "package:twitter/widgets/ui/button.dart";

enum SignupSteps { identification, confirmation }

class SignupFlow extends StatefulWidget {
  const SignupFlow({super.key});

  @override
  State<SignupFlow> createState() => _SignupFlowState();
}

class _SignupFlowState extends State<SignupFlow> {
  SignupSteps _currentStep = SignupSteps.identification;

  String _email = "";
  String _password = "";
  String _errorMessage = "";
  bool _isLoading = false;

  Future<void> _signup() async {}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const TopBar(
        leading: CloseButton(),
      ),
      body: Padding(
        padding: const EdgeInsets.only(top: 40),
        child: Column(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                children: <Widget>[
                  const Text(
                    "Create your account",
                    textAlign: TextAlign.start,
                    style: TextStyle(
                      fontSize: 29,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  if (_currentStep == SignupSteps.identification)
                    StepOne(onChange: (value) => setState(() => _email = value))
                  else
                    StepTwo(onChange: (value) => _password = value),
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
                  if (_errorMessage != "")
                    Padding(
                      padding: const EdgeInsets.only(right: 10),
                      child: Text(
                        _errorMessage,
                        style: const TextStyle(color: Colors.red),
                      ),
                    ),
                  Button(
                    text: "Next",
                    small: true,
                    isLoading: _isLoading,
                    disabled: _email == "",
                    onPressed: _currentStep == SignupSteps.identification
                        ? () {
                            setState(
                                () => _currentStep = SignupSteps.confirmation);
                            FocusManager.instance.primaryFocus?.unfocus();
                          }
                        : _signup,
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
