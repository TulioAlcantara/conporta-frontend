export default class Utils {
  static enumEntriesToSelect(_enum: any) {
    return Object.entries(_enum).filter(
      (entry) =>
        _enum.hasOwnProperty(entry[0]) && /^\d+$/.test(String(entry[1]))
    );
  }
}
