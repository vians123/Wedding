import { promises as fs } from "node:fs";
import path from "node:path";

export type RsvpRecord = {
  id: string;
  createdAt: string;
  name: string;
  attendance: "yes" | "no";
  guests: number;
  message?: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "rsvps.json");

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]\n", "utf8");
  }
}

export async function appendRsvp(record: RsvpRecord) {
  // Vercel serverless/edge environments have an ephemeral filesystem.
  // For production persistence, use a real datastore (Supabase/Firebase/etc).
  if (process.env.VERCEL === "1" || process.env.NODE_ENV === "production") {
    void record;
    return;
  }

  await ensureDataFile();

  const raw = await fs.readFile(DATA_FILE, "utf8");
  const list = (JSON.parse(raw) as unknown[]).filter(Boolean) as RsvpRecord[];
  list.push(record);
  await fs.writeFile(DATA_FILE, JSON.stringify(list, null, 2) + "\n", "utf8");
}

