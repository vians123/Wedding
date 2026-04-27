"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  attendance: "yes" | "no" | "maybe";
  guestName: string;
  guestContact: string;
  guestRole: string;
  excitement: "1" | "2" | "3" | "4" | "5";
  message: string;
};

const ATTENDANCE_LABELS = {
  yes: "Yes, I/We will be delighted to attend.",
  no: "No, I/We will unfortunately be unable to attend.",
  maybe: "Maybe, I still need to fix my schedule. I will let you know soon",
} as const;

export function RsvpForm() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [state, setState] = useState<FormState>({
    name: "",
    email: "",
    attendance: "yes",
    guestName: "",
    guestContact: "",
    guestRole: "Guest",
    excitement: "5",
    message: "",
  });
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "submitting" }
    | { type: "success" }
    | { type: "error"; message: string }
  >({ type: "idle" });

  const googleFormAction = process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION_URL ?? "";
  const fieldName = process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_NAME ?? "";
  const fieldEmail = process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_EMAIL ?? "";
  const fieldAttendance =
    process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_ATTENDANCE ?? "";
  const fieldGuestName = process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_GUEST_NAME ?? "";
  const fieldGuestContact =
    process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_GUEST_CONTACT ?? "";
  const fieldGuestRole = process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_GUEST_ROLE ?? "";
  const fieldExcitement =
    process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_EXCITEMENT ?? "";
  const fieldMessage = process.env.NEXT_PUBLIC_GOOGLE_FORM_FIELD_MESSAGE ?? "";

  const canGoNext = useMemo(() => {
    if (step === 1) return state.name.trim().length > 0;
    if (step === 2) {
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email.trim());
      return emailOk && state.attendance in ATTENDANCE_LABELS;
    }
    if (step === 3) {
      return (
        state.guestName.trim().length > 0 &&
        state.guestContact.trim().length > 0 &&
        state.guestRole.trim().length > 0
      );
    }
    if (step === 4) return state.excitement.length > 0;
    return true;
  }, [
    state.attendance,
    state.email,
    state.excitement,
    state.guestContact,
    state.guestName,
    state.guestRole,
    state.name,
    step,
  ]);

  const progress = useMemo(() => (step / 4) * 100, [step]);
  const isSubmitting = status.type === "submitting";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step !== 4) return;
    if (state.name.trim().length === 0) return;

    setStatus({ type: "submitting" });
    try {
      if (
        !googleFormAction ||
        !fieldName ||
        !fieldEmail ||
        !fieldAttendance ||
        !fieldGuestName ||
        !fieldGuestContact ||
        !fieldGuestRole ||
        !fieldExcitement
      ) {
        throw new Error(
          "Missing Google Form configuration. Set NEXT_PUBLIC_GOOGLE_FORM_ACTION_URL and the field entry IDs.",
        );
      }

      const attendanceLabel = ATTENDANCE_LABELS[state.attendance];

      const body = new URLSearchParams({
        [fieldName]: state.name.trim(),
        [fieldEmail]: state.email.trim(),
        [fieldAttendance]: attendanceLabel,
        [fieldGuestName]: state.guestName.trim(),
        [fieldGuestContact]: state.guestContact.trim(),
        [fieldGuestRole]: state.guestRole,
        [fieldExcitement]: state.excitement,
      });

      if (fieldMessage) body.set(fieldMessage, state.message.trim());

      // Google Forms requires `no-cors` from the browser; you won't receive a readable response.
      await fetch(googleFormAction, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      });

      setStatus({ type: "success" });
      setState({
        name: "",
        email: "",
        attendance: "yes",
        guestName: "",
        guestContact: "",
        guestRole: "Guest",
        excitement: "5",
        message: "",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Something went wrong.",
      });
    }
  }

  if (status.type === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mt-8 grid gap-5 rounded-2xl border border-black/10 bg-white/70 p-6 text-center shadow-soft backdrop-blur"
      >
        <p className="text-[11px] tracking-[0.24em] uppercase text-ink-50">
          RSVP received
        </p>
        <p className="font-display text-3xl tracking-tight text-ink-300">
          Thank you for your RSVP <span aria-hidden>💖</span>
        </p>
        <p className="text-sm leading-7 text-ink-50">
          If you don’t see an email confirmation, it’s because Google Forms only
          sends receipts when it’s enabled in the Form settings.
        </p>
        <div className="mt-1 flex justify-center">
          <button
            type="button"
            onClick={() => {
              setStatus({ type: "idle" });
              setStep(1);
            }}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-ink-300 px-7 font-medium text-ivory-50 shadow-soft transition hover:bg-ink-200"
          >
            Send another response
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-5">
      <div className="grid gap-3">
        <div className="flex items-center justify-between text-xs text-ink-50">
          <p className="tracking-[0.22em] uppercase">Step {step} of 4</p>
          <p className="tracking-[0.22em] uppercase">{Math.round(progress)}%</p>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-black/5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-gold-200 via-gold-300 to-blush-200"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid gap-2"
          >
            <label className="text-sm text-ink-100">Your name</label>
            <input
              value={state.name}
              onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
              placeholder="e.g., Taylor Morgan"
              className="min-h-[48px] rounded-xl border border-black/10 bg-white/80 px-4 text-ink-300 shadow-ring outline-none transition focus:border-gold-300 focus:ring-2 focus:ring-gold-100"
              required
              autoComplete="name"
            />
          </motion.div>
        ) : null}

        {step === 2 ? (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <label className="text-sm text-ink-100">Email</label>
              <input
                value={state.email}
                onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
                placeholder="e.g., test@email.com"
                className="min-h-[48px] rounded-xl border border-black/10 bg-white/80 px-4 text-ink-300 shadow-ring outline-none transition focus:border-gold-300 focus:ring-2 focus:ring-gold-100"
                required
                autoComplete="email"
                inputMode="email"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-ink-100">Attendance</label>
              <select
                value={state.attendance}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    attendance:
                      e.target.value === "no"
                        ? "no"
                        : e.target.value === "maybe"
                          ? "maybe"
                          : "yes",
                  }))
                }
                className="min-h-[48px] rounded-xl border border-black/10 bg-white/80 px-4 text-ink-300 shadow-ring outline-none transition focus:border-gold-300 focus:ring-2 focus:ring-gold-100"
              >
                <option value="yes">Yes, I/We will be delighted to attend.</option>
                <option value="no">
                  No, I/We will unfortunately be unable to attend.
                </option>
                <option value="maybe">
                  Maybe, I still need to fix my schedule. I will let you know soon
                </option>
              </select>
            </div>
          </motion.div>
        ) : null}

        {step === 3 ? (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <label className="text-sm text-ink-100">Name of Guest</label>
              <input
                value={state.guestName}
                onChange={(e) =>
                  setState((s) => ({ ...s, guestName: e.target.value }))
                }
                placeholder="e.g., Alex Morgan"
                className="min-h-[48px] rounded-xl border border-black/10 bg-white/80 px-4 text-ink-300 shadow-ring outline-none transition focus:border-gold-300 focus:ring-2 focus:ring-gold-100"
                required
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-ink-100">Contact Number of Guest</label>
              <input
                value={state.guestContact}
                onChange={(e) =>
                  setState((s) => ({ ...s, guestContact: e.target.value }))
                }
                placeholder="e.g., +1 555 123 4567"
                className="min-h-[48px] rounded-xl border border-black/10 bg-white/80 px-4 text-ink-300 shadow-ring outline-none transition focus:border-gold-300 focus:ring-2 focus:ring-gold-100"
                required
                inputMode="tel"
                autoComplete="tel"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-ink-100">Role of Guest</label>
              <select
                value={state.guestRole}
                onChange={(e) =>
                  setState((s) => ({ ...s, guestRole: e.target.value }))
                }
                className="min-h-[48px] rounded-xl border border-black/10 bg-white/80 px-4 text-ink-300 shadow-ring outline-none transition focus:border-gold-300 focus:ring-2 focus:ring-gold-100"
              >
                {[
                  "Parents",
                  "Maid of Honor",
                  "Bestman",
                  "Bridesmaid",
                  "Groomsman",
                  "Principal Sponsor",
                  "Peer Sponsor",
                  "Offerer",
                  "Bearer",
                  "Flower Girls",
                  "Guest",
                ].map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        ) : null}

        {step === 4 ? (
          <motion.div
            key="step-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid gap-2"
          >
            <div className="grid gap-2">
              <label className="text-sm text-ink-100">
                How excited are you to celebrate with us?
              </label>
              <div className="grid grid-cols-5 gap-2">
                {(["1", "2", "3", "4", "5"] as const).map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setState((s) => ({ ...s, excitement: val }))}
                    className={[
                      "min-h-[48px] rounded-xl border shadow-ring transition",
                      val === state.excitement
                        ? "border-gold-300 bg-gold-50 text-ink-300"
                        : "border-black/10 bg-white/70 text-ink-200 hover:bg-white/85",
                    ].join(" ")}
                    aria-pressed={val === state.excitement}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm text-ink-100">
                Message (optional)
              </label>
              <textarea
                value={state.message}
                onChange={(e) =>
                  setState((s) => ({ ...s, message: e.target.value }))
                }
                rows={4}
                placeholder="Leave a note for the couple…"
                className="resize-none rounded-xl border border-black/10 bg-white/80 p-4 text-ink-300 shadow-ring outline-none transition focus:border-gold-300 focus:ring-2 focus:ring-gold-100"
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3 | 4) : s))}
            disabled={step === 1 || isSubmitting}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-black/10 bg-white/70 px-6 font-medium text-ink-200 shadow-ring backdrop-blur transition hover:bg-white/85 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Back
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((s) => ((s + 1) as 1 | 2 | 3 | 4))}
              disabled={!canGoNext || isSubmitting}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-ink-300 px-6 font-medium text-ivory-50 shadow-soft transition hover:bg-ink-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={state.name.trim().length === 0 || isSubmitting}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-ink-300 px-6 font-medium text-ivory-50 shadow-soft transition hover:bg-ink-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Sending…" : "Send RSVP"}
            </button>
          )}
        </div>

        <div className="min-h-[24px]">
          <AnimatePresence mode="wait">
            {status.type === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-sm text-ink-50"
              >
                <span className="font-medium">Thank you for your RSVP</span>{" "}
                <span aria-hidden>💖</span>
              </motion.div>
            ) : status.type === "error" ? (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-sm text-blush-300"
              >
                {status.message}
              </motion.p>
            ) : (
              <motion.p
                key="idle"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="text-sm text-ink-50"
              >
                We can’t wait to celebrate with you.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}

