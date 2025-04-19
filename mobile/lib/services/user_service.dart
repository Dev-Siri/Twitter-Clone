import "dart:convert";

import "package:jwt_decode/jwt_decode.dart";
import "package:shared_preferences/shared_preferences.dart";
import "package:twitter/constants.dart";
import "package:twitter/models/user/individual_user.dart";
import "package:twitter/models/user/user_session.dart";
import "package:http/http.dart" as http;
import "package:twitter/utils/encoding.dart";

class UserService {
  static const _authTokenKey = "auth_token";
  static const _url = "$backendUrl/users";

  Future<UserSession?> get user async {
    final sharedPreferences = await SharedPreferences.getInstance();
    final authToken = sharedPreferences.getString(_authTokenKey);

    if (authToken == null) return null;

    final userJson = Jwt.parseJwt(authToken);

    return UserSession.fromJson(userJson);
  }

  Future<void> setUser(String authToken) async {
    final sharedPreferences = await SharedPreferences.getInstance();

    sharedPreferences.setString(_authTokenKey, authToken);
  }

  Future<ApiResponse> login({
    required String email,
    required String password,
  }) async {
    final response = await http.post(
      Uri.parse("$_url/login"),
      body: jsonEncode({
        "email": email,
        "password": password,
      }),
    );

    final parsedResponse =
        parseHttpResponse<String>(response, (token) => token);

    return parsedResponse;
  }

  Future<ApiResponse> fetchUserWithTag({required String tag}) async {
    final response = await http.get(Uri.parse("$_url/$tag"));

    final parsedResponse = parseHttpResponse<IndividualUser>(
      response,
      (user) => IndividualUser.fromJson(user),
    );

    return parsedResponse;
  }
}
