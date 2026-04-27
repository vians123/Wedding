export const runtime = "nodejs";

type RsvpPayload = {
  name?: unknown;
  email?: unknown;
  attendance?: unknown;
  guestName?: unknown;
  guestContact?: unknown;
  guestRole?: unknown;
  excitement?: unknown;
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

function invalidFieldIdsError() {
  return Response.json(
    { ok: false, error: "Invalid Google Form field IDs" },
    { status: 500 },
  );
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
  const email = typeof payload.email === "string" ? payload.email : "";
  const attendance =
    payload.attendance === "yes" ||
    payload.attendance === "no" ||
    payload.attendance === "maybe"
      ? payload.attendance
      : null;
  const guestName =
    typeof payload.guestName === "string" ? payload.guestName : "";
  const guestContact =
    typeof payload.guestContact === "string" ? payload.guestContact : "";
  const guestRole = typeof payload.guestRole === "string" ? payload.guestRole : "";
  const excitement =
    payload.excitement === "1" ||
    payload.excitement === "2" ||
    payload.excitement === "3" ||
    payload.excitement === "4" ||
    payload.excitement === "5"
      ? payload.excitement
      : null;
  const message = typeof payload.message === "string" ? payload.message : "";

  if (!name.trim()) return badRequest("Name is required.");
  if (!email.trim()) return badRequest("Email is required.");
  if (!attendance) return badRequest("Attendance is required.");
  if (!guestName.trim()) return badRequest("Guest name is required.");
  if (!guestContact.trim()) return badRequest("Guest contact is required.");
  if (!guestRole.trim()) return badRequest("Guest role is required.");
  if (!excitement) return badRequest("Excitement level is required.");

  const formAction =
    process.env.GOOGLE_FORM_ACTION_URL ??
    process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION_URL;

  const fieldName =
    process.env.GOOGLE_FORM_FIELD_NAME ??
    process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_NAME;
  const fieldEmail =
    process.env.GOOGLE_FORM_FIELD_EMAIL ??
    process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_EMAIL;
  const fieldAttendance =
    process.env.GOOGLE_FORM_FIELD_ATTENDANCE ??
    process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_ATTENDANCE;
  const fieldGuestName =
    process.env.GOOGLE_FORM_FIELD_GUEST_NAME ??
    process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_GUEST_NAME;
  const fieldGuestContact =
    process.env.GOOGLE_FORM_FIELD_GUEST_CONTACT ??
    process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_GUEST_CONTACT;
  const fieldGuestRole =
    process.env.GOOGLE_FORM_FIELD_GUEST_ROLE ??
    process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_GUEST_ROLE;
  const fieldExcitement =
    process.env.GOOGLE_FORM_FIELD_EXCITEMENT ??
    process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_EXCITEMENT;
  const fieldMessage =
    process.env.GOOGLE_FORM_FIELD_MESSAGE ??
    process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_MESSAGE;

  if (
    !formAction ||
    !fieldName ||
    !fieldEmail ||
    !fieldAttendance ||
    !fieldGuestName ||
    !fieldGuestContact ||
    !fieldGuestRole ||
    !fieldExcitement
  ) {
    return serverError("Server is missing Google Form configuration.");
  }

  if (!formAction.includes("/formResponse")) {
    return serverError("Invalid Google Form action URL. Use /formResponse, not /viewform.");
  }

  const fieldIds = [
    fieldName,
    fieldEmail,
    fieldAttendance,
    fieldGuestName,
    fieldGuestContact,
    fieldGuestRole,
    fieldExcitement,
    fieldMessage,
  ].filter((id): id is string => typeof id === "string" && id.length > 0);

  if (fieldIds.some((id) => !id.startsWith("entry."))) {
    return invalidFieldIdsError();
  }

  const attendanceLabel =
    attendance === "yes"
      ? "Yes, I/We will be delighted to attend."
      : attendance === "no"
        ? "No, I/We will unfortunately be unable to attend."
        : "Maybe, I still need to fix my schedule. I will let you know soon";

  const formBody = new URLSearchParams({
    [fieldName]: name.trim(),
    [fieldEmail]: email.trim(),
    [fieldAttendance]: attendanceLabel,
    [fieldGuestName]: guestName.trim(),
    [fieldGuestContact]: guestContact.trim(),
    [fieldGuestRole]: guestRole.trim(),
    [fieldExcitement]: excitement,
  });
  if (fieldMessage) {
    formBody.set(fieldMessage, message.trim());
  }

  const payloadOut = {
    name: name.trim(),
    email: email.trim(),
    attendance: attendanceLabel,
    guestName: guestName.trim(),
    guestContact: guestContact.trim(),
    guestRole: guestRole.trim(),
    excitement,
    message: message.trim(),
  };

  console.log("[RSVP FIELD MAP]", {
    formAction,
    fieldName,
    fieldEmail,
    fieldAttendance,
    fieldGuestName,
    fieldGuestContact,
    fieldGuestRole,
    fieldExcitement,
    fieldMessage,
  });
  console.log("[RSVP PAYLOAD]", payloadOut);
  console.log("[RSVP FORM BODY]", formBody.toString());
  try {
    const res = await fetch(formAction, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: formBody,
      cache: "no-store",
      redirect: "manual",
    });

    const text = await res.text().catch(() => "");
    console.log("[GOOGLE RESPONSE STATUS]", res.status);
    console.log("[GOOGLE RESPONSE BODY]", text);
    if (res.status === 400) {
      return Response.json(
        {
          ok: false,
          error: "Google Form rejected submission",
          status: res.status,
          response: text,
        },
        { status: 500 },
      );
    }
    if (!res.ok && res.status !== 302) {
      console.warn("[RSVP] Google Form error", res.status, text);
      return serverError(
        `Google Form rejected the submission (status ${res.status}). Body: ${text || "<empty>"}`,
      );
    }
  } catch (err) {
    console.warn("[RSVP] Google Form request failed", err);
    return serverError(
      "Failed to contact Google Form. Please check Google Form URL and field IDs in Vercel env vars.",
    );
  }

  return Response.json({ ok: true });
}

