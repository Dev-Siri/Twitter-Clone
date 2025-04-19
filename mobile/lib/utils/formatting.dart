import "package:intl/intl.dart";

String compactify(int metric) {
  final formatter = NumberFormat.compact(locale: "en");
  return formatter.format(metric);
}
