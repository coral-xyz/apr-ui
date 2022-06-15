// Format date to show plain english time elapsed
export default function FormatDate(date: string): string {
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const diff = (now - time) / 1000;
  const day = Math.floor(diff / 86400);
  const hour = Math.floor(diff / 3600);
  const minute = Math.floor(diff / 60);
  const second = Math.floor(diff);
  if (day > 0) {
    return `${day} day${day > 1 ? "s" : ""} ago`;
  } else if (hour > 0) {
    return `${hour} hour${hour > 1 ? "s" : ""} ago`;
  } else if (minute > 0) {
    return `${minute} minute${minute > 1 ? "s" : ""} ago`;
  } else if (second > 0) {
    return `${second} second${second > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}
