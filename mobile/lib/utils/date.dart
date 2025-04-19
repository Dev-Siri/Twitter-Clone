import "package:intl/intl.dart";

String getRelativeTime(String isoDateString) {
  DateTime tweetDateTime = DateTime.parse(isoDateString);
  Duration duration = DateTime.now().difference(tweetDateTime);

  if (duration.inDays <= 7) {
    if (duration.inDays > 0) return "${duration.inDays}d";
    if (duration.inHours > 0) return "${duration.inHours}h";
    if (duration.inMinutes > 0) return "${duration.inMinutes}m";
    return "${duration.inSeconds}s";
  }

  return DateFormat("MMM ${tweetDateTime.day}").format(tweetDateTime);
}

String getTweetCreatedDate(String dateString) {
  final date = DateTime.parse(dateString);
  final monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  final month = monthAbbreviations[date.month - 1];
  final hour = date.hour.toString();
  const int twelveHourBreakpoint = 12;
  final formattedHour = (int.parse(hour) % twelveHourBreakpoint == 0)
      ? twelveHourBreakpoint.toString()
      : (int.parse(hour) % twelveHourBreakpoint).toString();
  final meridiem = (int.parse(hour) < twelveHourBreakpoint) ? "am" : "pm";
  final minutes = date.minute.toString().padLeft(2, "0");
  final day = date.day.toString().padLeft(2, "0");
  final year = date.year.toString();

  return "$formattedHour:$minutes $meridiem · $month $day, $year";
}
