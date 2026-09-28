import { getActivities } from "@/lib/sheet";
import { SurpriseMe } from "@/components/SurpriseMe";

export const metadata = {
  title: "Surprise Me — Minute2WinIt",
};

export default async function SurprisePage() {
  const activities = await getActivities();
  return <SurpriseMe activities={activities} />;
}
