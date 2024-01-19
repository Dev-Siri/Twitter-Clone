import "dart:convert";

import "package:jwt_decode/jwt_decode.dart";
import "package:shared_preferences/shared_preferences.dart";
import "package:twitter/constants.dart";
import "package:twitter/models/user.dart";
import "package:http/http.dart" as http;
import "package:twitter/utils/encoding.dart";

class UserService {
  static const authTokenKey = "auth_token";
  static const url = "$backendUrl/users";

  Future<UserSession?> get user async {
    final sharedPreferences = await SharedPreferences.getInstance();
    final authToken = sharedPreferences.getString(authTokenKey);

    if (authToken == null) return null;

    final userJson = Jwt.parseJwt(authToken);

    return UserSession.fromJson(userJson);
  }

  Future<void> setUser(String authToken) async {
    final sharedPreferences = await SharedPreferences.getInstance();

    sharedPreferences.setString(authTokenKey, authToken);
  }

  Future<ApiResponse> login({
    required String email,
    required String password,
  }) async {
    final response = await http.post(
      Uri.parse("$url/login"),
      body: jsonEncode({
        "email": email,
        "password": password,
      }),
    );

    final parsedResponse =
        parseHttpResponse<String>(response, (token) => token);

    return parsedResponse;
  }
}
