import "package:cached_network_image/cached_network_image.dart";
import "package:flutter/material.dart";
import "package:provider/provider.dart";
import "package:twitter/models/user/individual_user.dart";
import "package:twitter/screens/(main)/(profile)/route_data.dart";
import "package:twitter/screens/(main)/(profile)/transparent_back_button.dart";
import "package:twitter/services/user_service.dart";
import "package:twitter/utils/encoding.dart";

class Profile extends StatefulWidget {
  final ProfileRouteData routeUserData;

  const Profile({
    super.key,
    required this.routeUserData,
  });

  @override
  State<Profile> createState() => _ProfileState();
}

const double appBarHeight = 150;

class _ProfileState extends State<Profile> {
  final _tweetCount = 0;

  IndividualUser? _user = null;
  bool _errorOccured = false;
  bool _overScrolled = false;

  @override
  void initState() {
    _fetchUserDetails();
    super.initState();
  }

  Future<void> _fetchUserDetails() async {
    final user = await context
        .read<UserService>()
        .fetchUserWithTag(tag: widget.routeUserData.tag);

    if (user is ApiResponseError) {
      setState(() => _errorOccured = true);
    }

    if (user is ApiResponseSuccess) {
      final typedData = user.data as IndividualUser;
      setState(() => _user = typedData);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        physics: const BouncingScrollPhysics(),
        slivers: <Widget>[
          SliverAppBar(
            pinned: true,
            automaticallyImplyLeading: false,
            expandedHeight: appBarHeight,
            leading: _overScrolled
                ? const SizedBox(height: 0, width: 0)
                : const TransparentBackButton(),
            flexibleSpace: LayoutBuilder(builder: (context, constraints) {
              _overScrolled = constraints.biggest.height ==
                  MediaQuery.of(context).padding.top + kToolbarHeight;

              return FlexibleSpaceBar(
                titlePadding: const EdgeInsets.only(top: 30),
                background: _user?.banner != null
                    ? CachedNetworkImage(
                        imageUrl: _user!.banner!,
                        height: 200,
                        width: double.infinity,
                      )
                    : Container(
                        color: Theme.of(context).primaryColor,
                        height: 200,
                        width: double.infinity,
                      ),
                title: _overScrolled
                    ? Container(
                        width: double.infinity,
                        decoration: BoxDecoration(
                          color: Theme.of(context).primaryColor,
                          image: _user?.banner != null
                              ? DecorationImage(
                                  image: CachedNetworkImageProvider(
                                    _user!.banner!,
                                  ),
                                  fit: BoxFit.cover,
                                  opacity: 0.8,
                                )
                              : null,
                        ),
                        child: Padding(
                          padding: const EdgeInsets.only(left: 10),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Text(
                                widget.routeUserData.name,
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontSize: 18,
                                ),
                              ),
                              Text(
                                "$_tweetCount Tweets",
                                style: const TextStyle(
                                    color: Colors.grey, fontSize: 14),
                              ),
                            ],
                          ),
                        ),
                      )
                    : null,
              );
            }),
          ),
          if (_errorOccured)
            SliverList.list(
              children: const <Widget>[
                Padding(
                  padding: EdgeInsets.only(top: 50),
                  child: Center(
                    child: Icon(
                      Icons.error,
                      color: Colors.red,
                    ),
                  ),
                ),
                Center(
                  child: Text(
                    "Failed to get user info",
                    style: TextStyle(color: Colors.red),
                  ),
                ),
              ],
            )
          else
            SliverList.builder(
              itemBuilder: (context, index) {
                return Text("$index");
              },
            )
        ],
      ),
    );
  }
}
