import { Timestamp } from "firebase/firestore";

export function formatDate(timestamp: Timestamp): string {
  const date = timestamp.toDate();
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}
