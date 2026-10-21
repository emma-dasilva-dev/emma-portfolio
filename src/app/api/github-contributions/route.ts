import { NextResponse } from "next/server";

type Day = { date: string; count: number };
const USERNAME = "emma-dasilva-dev";
export const revalidate = 3600;

export async function GET() {
  try {
    const upstream = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(12000) },
    );
    if (!upstream.ok) throw new Error(`Contribution provider returned ${upstream.status}`);
    const payload: unknown = await upstream.json();
    if (!payload || typeof payload !== "object" || !("contributions" in payload) ||
        !Array.isArray(payload.contributions)) throw new Error("Invalid contribution response");
    const contributions = payload.contributions as unknown[];
    const days: Day[] = contributions.flatMap((item) => {
      if (!item || typeof item !== "object" || !("date" in item) || !("count" in item)) return [];
      const { date, count } = item as { date: unknown; count: unknown };
      if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
          typeof count !== "number" || !Number.isFinite(count) || count < 0) return [];
      return [{ date, count: Math.floor(count) }];
    });
    if (days.length < 300) throw new Error("Incomplete contribution calendar");
    return NextResponse.json({ days, source: "GitHub public contribution calendar" });
  } catch (error) {
    console.error("GitHub contributions unavailable", error);
    return NextResponse.json({ error: "GitHub contribution activity is temporarily unavailable." }, { status: 503 });
  }
}
