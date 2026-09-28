import { SEED_ACTIVITIES } from "@/data";
import { activitiesToCsv } from "@/lib/sheet";

export const dynamic = "force-static";

export async function GET() {
  return new Response(activitiesToCsv(SEED_ACTIVITIES), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'inline; filename="minute2winit-seed.csv"',
      "Access-Control-Allow-Origin": "*",
    },
  });
}
