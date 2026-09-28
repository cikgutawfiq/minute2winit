import { getActivities } from "@/lib/sheet";
import { ActivityBrowser } from "@/components/ActivityBrowser";

export default async function Home() {
  const activities = await getActivities();
  return <ActivityBrowser activities={activities} />;
}
