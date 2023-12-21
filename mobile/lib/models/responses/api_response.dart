class ApiResponse<T> {
  final bool success;
  final int status;
  final T? data;
  final String? message;

  const ApiResponse({
    required this.success,
    required this.status,
    this.data,
    this.message,
  });

  factory ApiResponse.fromJson(
    Map<String, dynamic> json,
    T Function(dynamic) converter,
  ) =>
      ApiResponse(
        success: json["success"] as bool,
        status: json["status"] as int,
        data: converter(json["data"]) as T?,
        message: json["message"] as String?,
      );
}
