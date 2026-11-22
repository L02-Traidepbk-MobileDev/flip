import { getDatabasePool } from "@/lib/database";

export async function GET() {
  try {
    await getDatabasePool().query("SELECT 1");
    return Response.json({ status: "ok" });
  } catch {
    return Response.json({ status: "unavailable" }, { status: 503 });
  }
}
