import { format, getTime, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
// ----------------------------------------------------------------------

export function fDate(date: any, newFormat?: any) {
  const fm = newFormat || "dd MMM yyyy";

  return date ? format(new Date(date), fm) : "";
}
export function fTime(isoDate: string) {
  // Obtener la hora en formato militar (24 horas)
  const date = new Date(isoDate);
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");

  // Formato 24 horas (hora militar)
  const militaryTime = `${hours}:${minutes}:${seconds}`;
  return militaryTime;
}

export function fDateTime(date: any, newFormat?: any) {
  const fm = newFormat || "dd MMM yyyy p";

  return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date: any) {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date: any) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: es,
      })
    : "";
}
