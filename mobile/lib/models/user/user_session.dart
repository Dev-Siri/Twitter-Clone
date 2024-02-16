class UserSession {
  final String userId;
  final String name;
  final String userImage;
  final String email;
  final String tag;
  final String birthday;

  const UserSession({
    required this.userId,
    required this.name,
    required this.userImage,
    required this.email,
    required this.tag,
    required this.birthday,
  });

  factory UserSession.fromJson(Map<String, dynamic> json) => UserSession(
        userId: json["userId"] as String,
        name: json["name"] as String,
        userImage: json["userImage"] as String,
        email: json["email"] as String,
        tag: json["tag"] as String,
        birthday: json["birthday"] as String,
      );
}
