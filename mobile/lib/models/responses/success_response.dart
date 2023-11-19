/// Success model of the API, so success is always true
class SuccessResponse<T> {
  final bool success = true;
  final int status;
  final T data;

  const SuccessResponse({
    required this.status,
    required this.data,
  });

  factory SuccessResponse.fromJson(Map<String, dynamic> json) =>
      SuccessResponse(
        status: json["status"] as int,
        data: json["data"] as T,
      );
}
