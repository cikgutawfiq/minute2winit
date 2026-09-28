import { Activity, Category } from "./types";

// One reflective takeaway per category, used whenever an activity doesn't
// carry its own debrief question to lean on. Written as a generic prompt
// referencing the activity's stated objective so it stays specific enough
// to be useful without hand-authoring one for every row.
const CATEGORY_LENS: Record<Category, string> = {
  "Minute to Win It": "Under a ticking clock, did the team stay calm or rush and make more mistakes?",
  Icebreaker: "What did this reveal about someone you hadn't noticed before?",
  Energiser: "How did the room's energy actually change once everyone joined in?",
  "Team Skills": "Who stepped up to lead, and did the team let them?",
  "Trust & Communication": "Where did communication break down, and what fixed it?",
  "Active & Physical": "Did competitiveness help the team or start to work against it?",
  "Creative & Craft": "What did people create differently once nobody was rushing them?",
  "Virtual Friendly": "Did this activity make the remote team feel more present, even briefly?",
};

export function getPointToPonder(activity: Pick<Activity, "category" | "objective" | "debriefQuestions" | "pointToPonder">): string {
  if (activity.pointToPonder) return activity.pointToPonder;
  if (activity.debriefQuestions && activity.debriefQuestions.length > 0) {
    return activity.debriefQuestions[0];
  }
  const lens = CATEGORY_LENS[activity.category];
  return `${activity.objective} ${lens}`;
}
