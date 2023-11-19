class UserServiceResponse<T> {
  final T data;
  final bool success;

  const UserServiceResponse({required this.data, required this.success});
}

class UserService {}
