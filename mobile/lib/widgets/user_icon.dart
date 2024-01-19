import "package:cached_network_image/cached_network_image.dart";
import "package:flutter/material.dart";
import "package:provider/provider.dart";
import "package:twitter/services/user_service.dart";

class UserIcon extends StatelessWidget {
  const UserIcon({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8),
      child: FutureBuilder(
        future: context.watch<UserService>().user,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting ||
              snapshot.data == null) {
            return CircleAvatar(
              backgroundColor: Colors.grey.shade400,
            );
          }

          return MaterialButton(
            padding: EdgeInsets.zero,
            onPressed: () => Scaffold.of(context).openDrawer(),
            child: CircleAvatar(
              foregroundImage: CachedNetworkImageProvider(
                snapshot.data!.userImage,
              ),
            ),
          );
        },
      ),
    );
  }
}
