import "package:twitter/screens/(main)/explore/screen.dart";
import "package:twitter/screens/(main)/home/screen.dart";
import "package:twitter/widgets/user_icon.dart";
import "package:twitter/widgets/profile_drawer.dart";
import "package:twitter/widgets/top_bar.dart";
import "package:flutter/material.dart";
import "package:flutter_svg/flutter_svg.dart";
import "package:twitter/icons.dart";

class MainLayout extends StatefulWidget {
  const MainLayout({super.key});

  @override
  State<MainLayout> createState() => _MainLayoutState();
}

class _MainLayoutState extends State<MainLayout> {
  int _index = 0;

  final _screens = [const Home(), const Explore()];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const ProfileDrawer(),
      appBar: const TopBar(
        leading: UserIcon(),
      ),
      body: _screens[_index],
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          border: Border(
            top: BorderSide(
              width: 1,
              color: Colors.grey.shade200,
            ),
          ),
        ),
        child: BottomNavigationBar(
          currentIndex: _index,
          backgroundColor: Colors.white,
          onTap: (index) => setState(() => _index = index),
          showSelectedLabels: false,
          showUnselectedLabels: false,
          items: const <BottomNavigationBarItem>[
            BottomNavigationBarItem(
              icon: SvgPicture(homeOutlined),
              activeIcon: SvgPicture(homeFilled),
              label: "Home",
            ),
            BottomNavigationBarItem(
              icon: SvgPicture(exploreOutlined),
              activeIcon: SvgPicture(exploreFilled),
              label: "Explore",
            ),
          ],
        ),
      ),
    );
  }
}
