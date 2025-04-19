import "package:cached_network_image/cached_network_image.dart";
import "package:flutter/material.dart";
import "package:flutter_svg/flutter_svg.dart";
import "package:provider/provider.dart";
import "package:twitter/icons.dart";
import "package:twitter/screens/(main)/(profile)/route_data.dart";
import "package:twitter/services/user_service.dart";
import "package:twitter/widgets/follower_counter.dart";
import "package:twitter/widgets/ui/loading_indicator.dart";

class ProfileDrawer extends StatelessWidget {
  const ProfileDrawer({super.key});

  @override
  Widget build(BuildContext context) {
    return Drawer(
      width: MediaQuery.of(context).size.width - 60,
      child: FutureBuilder(
        future: context.watch<UserService>().user,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting ||
              snapshot.data == null) {
            return const Padding(
              padding: EdgeInsets.only(top: 100),
              child: LoadingIndicator(size: 10),
            );
          }

          final user = snapshot.data!;

          return Column(
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 30),
                child: Container(
                  decoration: BoxDecoration(
                    border: Border(
                      bottom: BorderSide(
                        width: 1,
                        color: Colors.grey.shade200,
                      ),
                    ),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Padding(
                        padding: const EdgeInsets.only(top: 60, bottom: 20),
                        child: CircleAvatar(
                          radius: 25,
                          foregroundImage: CachedNetworkImageProvider(
                            user.userImage,
                          ),
                        ),
                      ),
                      Text(
                        user.name,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 18,
                        ),
                      ),
                      Text(
                        "@${user.tag}",
                        style: TextStyle(
                          fontSize: 16,
                          color: Colors.grey.shade600,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 15),
                        child: FollowerCounter(tag: user.tag),
                      )
                    ],
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 20),
                child: MaterialButton(
                  onPressed: () => Navigator.pushNamed(
                    context,
                    "/user",
                    arguments: ProfileRouteData(
                      name: user.name,
                      tag: user.tag,
                      userImage: user.userImage,
                    ),
                  ),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 30,
                    vertical: 16,
                  ),
                  child: const Row(
                    children: <Widget>[
                      SvgPicture(
                        profileOutlined,
                        height: 24,
                        width: 24,
                      ),
                      SizedBox(width: 20),
                      Text(
                        "Profile",
                        style: TextStyle(fontSize: 20),
                      ),
                    ],
                  ),
                ),
              )
            ],
          );
        },
      ),
    );
  }
}
