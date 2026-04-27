export const runtime = "nodejs";

type RsvpPayload = {
  name?: unknown;
  attendance?: unknown;
  guests?: unknown;
  message?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function badRequest(message: string) {
  return Response.json({ ok: false, error: message }, { status: 400 });
}

function serverError(message: string) {
  return Response.json({ ok: false, error: message }, { status: 500 });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return badRequest("Invalid JSON.");
  }

  const payload: RsvpPayload = isRecord(body) ? (body as RsvpPayload) : {};

  const name = typeof payload.name === "string" ? payload.name : "";
  const attendance =
    payload.attendance === "yes" || payload.attendance === "no"
      ? payload.attendance
      : null;
  const guestsRaw = payload.guests;
  const guests =
    typeof guestsRaw === "number"
      ? guestsRaw
      : typeof guestsRaw === "string"
        ? Number.parseInt(guestsRaw, 10)
        : NaN;
  const message =
    typeof payload.message === "string" ? payload.message : undefined;

  if (!name.trim()) return badRequest("Name is required.");
  if (!attendance) return badRequest("Attendance is required.");
  if (!Number.isFinite(guests) || guests < 0 || guests > 10) {
    return badRequest("Guests must be between 0 and 10.");
  }

  const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!appsScriptUrl) {
    return serverError("Server is missing GOOGLE_APPS_SCRIPT_URL.");
  }

  const payloadOut = {
    name: name.trim(),
    attendance,
    guests,
    message: message?.trim() ? message.trim() : "",
  };

  console.log("[RSVP] Forwarding to Apps Script", payloadOut);
  try {
    const res = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payloadOut),
      cache: "no-store",
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
      console.warn("[RSVP] Apps Script error", res.status, text);
      return serverError("Failed to save RSVP.");
    }
  }
  catch (err) {
    console.warn("[RSVP] Apps Script request failed", err);
    return serverError("Failed to save RSVP.");
  }

  return Response.json({ ok: true });
}

