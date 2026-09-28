import { site } from "@/lib/site";

/** RFC 5545 lines must be folded at 75 octets and end with CRLF. */
function fold(line: string) {
  const parts: string[] = [];
  for (let index = 0; index < line.length; index += 73) parts.push(line.slice(index, index + 73));
  return parts.join("\r\n ");
}

function stamp(date: Date) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

/**
 * A daily reminder as an .ics file. The start time is "floating" (no time zone),
 * so it fires at the chosen local time wherever the person is.
 */
export function GET(request: Request) {
  const time = new URL(request.url).searchParams.get("time") ?? "20:00";
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);
  if (!match) return new Response("Choose a time like 20:00", { status: 400 });
  const [, hours, minutes] = match;

  const now = new Date();
  const start = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(now.getUTCDate()).padStart(2, "0")}T${hours}${minutes}00`;
  const url = `${site.url}/check-in`;

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//WellNest//Daily check-in//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:wellnest-daily-${hours}${minutes}@${new URL(site.url).hostname}`,
    `DTSTAMP:${stamp(now)}`,
    `DTSTART:${start}`,
    "DURATION:PT5M",
    "RRULE:FREQ=DAILY",
    "SUMMARY:A quiet check-in",
    `DESCRIPTION:Four minutes to notice what you feel\\, and where. ${url}`,
    `URL:${url}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "DESCRIPTION:Time for a gentle check-in with WellNest",
    "TRIGGER:PT0M",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return new Response(lines.map(fold).join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="wellnest-daily-check-in.ics"',
      "Cache-Control": "no-store",
    },
  });
}
