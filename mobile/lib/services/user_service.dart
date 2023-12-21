import "package:jwt_decode/jwt_decode.dart";
import "package:shared_preferences/shared_preferences.dart";
import "package:twitter/constants.dart";
import "package:twitter/models/user.dart";
import "package:http/http.dart" as http;
import "package:twitter/utils/encoding.dart";

class UserServiceResponse<T> {
  final bool success;
  final T? data;
  final String? message;

  const UserServiceResponse({
    required this.success,
    this.data,
    this.message,
  });
}

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

  Future<UserServiceResponse<String>> login({
    required String email,
    required String password,
  }) async {
    final response = await http.post(
      Uri.parse("$url/login"),
      body: {
        "email": email,
        "password": password,
      },
    );

    final parsedResponse = parseHttpResponse(response, (message) => message);

    if (parsedResponse.success) {
      return UserServiceResponse(
        success: false,
        message: parsedResponse.message,
      );
    }

    return UserServiceResponse(
      success: true,
      data: parsedResponse.data,
    );
  }
}
