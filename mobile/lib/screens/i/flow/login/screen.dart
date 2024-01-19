import "package:flutter/material.dart";
import "package:provider/provider.dart";
import "package:twitter/screens/i/flow/login/step_one.dart";
import "package:twitter/screens/i/flow/login/step_two.dart";
import "package:twitter/services/user_service.dart";
import "package:twitter/utils/encoding.dart";
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

  String _email = "";
  String _password = "";
  String _errorMessage = "";
  bool _isLoading = false;

  Future<void> _login() async {
    setState(() => _isLoading = true);

    final service = context.read<UserService>();
    final loginResponse = await context
        .read<UserService>()
        .login(email: _email, password: _password);

    if (loginResponse is ApiResponseError) {
      setState(() {
        _errorMessage = loginResponse.message;
        _isLoading = false;
      });
      return;
    }

    if (loginResponse is ApiResponseSuccess) {
      service.setUser(loginResponse.data);
      Navigator.pushReplacementNamed(context, "/");
    }

    _isLoading = false;
  }

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
                  Text(
                    _currentStep == LoginSteps.identification
                        ? "To get started, first enter your email"
                        : "Enter your password",
                    textAlign: TextAlign.start,
                    style: const TextStyle(
                      fontSize: 29,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  StepOne(onChange: (value) => setState(() => _email = value)),
                  if (_currentStep == LoginSteps.password)
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
                    onPressed: _currentStep == LoginSteps.identification
                        ? () {
                            setState(() => _currentStep = LoginSteps.password);
                            FocusManager.instance.primaryFocus?.unfocus();
                          }
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
