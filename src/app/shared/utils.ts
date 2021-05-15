export default class Utils {
  static enumEntriesToSelect(_enum: any) {
    const entries = [];

    for (const entry of Object.entries(_enum)) {
      if (_enum.hasOwnProperty(entry[0]) && /^\d+$/.test(String(entry[1]))) {
        entries.push(entry);
      }
    }

    return entries;
  }
}
