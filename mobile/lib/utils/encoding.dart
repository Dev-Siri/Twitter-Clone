import "dart:convert";

import "package:http/http.dart" as http;

class ApiResponse {}

class ApiResponseSuccess<T> extends ApiResponse {
  final T data;

  ApiResponseSuccess({required this.data});
}

class ApiResponseError extends ApiResponse {
  final String message;

  ApiResponseError({required this.message});
}

ApiResponse parseHttpResponse<T>(
  http.Response response,
  T Function(dynamic) converter,
) {
  final Map<String, dynamic> jsonResponse = jsonDecode(response.body);

  if (jsonResponse["success"]) {
    return ApiResponseSuccess<T>(data: converter(jsonResponse["data"]));
  }

  return ApiResponseError(message: jsonResponse["message"]);
}
