class IndividualUser {
  final String tag;
  final String userId;
  final String name;
  final String? bio;
  final String? location;
  final String? website;
  final String? banner;
  final String userImage;
  final String birthday;
  final String createdAt;

  const IndividualUser({
    required this.tag,
    required this.userId,
    required this.name,
    this.bio,
    this.location,
    this.website,
    this.banner,
    required this.userImage,
    required this.birthday,
    required this.createdAt,
  });

  factory IndividualUser.fromJson(Map<String, dynamic> json) => IndividualUser(
        tag: json["tag"] as String,
        userId: json["userId"] as String,
        name: json["name"] as String,
        bio: json["bio"] as String?,
        location: json["location"] as String?,
        website: json["website"] as String?,
        banner: json["banner"] as String?,
        userImage: json["userImage"] as String,
        birthday: json["birthday"] as String,
        createdAt: json["createdAt"] as String,
      );
}
