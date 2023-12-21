import "dart:convert";

import "package:http/http.dart" as http;
import "package:twitter/models/responses/api_response.dart";

ApiResponse<T> parseHttpResponse<T>(
  http.Response response,
  T Function(dynamic) converter,
) {
  if (response.statusCode == 200) {
    final Map<String, dynamic> jsonResponse = jsonDecode(response.body);

    return ApiResponse.fromJson(jsonResponse, converter);
  }

  final Map<String, dynamic> jsonResponse = jsonDecode(response.body);
  return ApiResponse<T>(
    success: false,
    status: jsonResponse["status"],
    message: jsonResponse["message"],
  );
}
