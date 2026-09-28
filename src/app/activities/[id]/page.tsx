import Link from "next/link";
import { notFound } from "next/navigation";
import { getActivities } from "@/lib/sheet";

export async function generateStaticParams() {
  const activities = await getActivities();
  return activities.map((a) => ({ id: a.id }));
}

export default async function ActivityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const activities = await getActivities();
  const activity = activities.find((a) => a.id === id);

  if (!activity) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/" className="text-sm font-medium text-brand hover:underline">
        ← Back to all activities
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {activity.name}
      </h1>
      <p className="mt-2 text-lg text-foreground/70">{activity.summary}</p>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Badge>{activity.category}</Badge>
        <Badge>
          👥 {activity.groupSizeMin}–{activity.groupSizeMax} people
        </Badge>
        <Badge>⏱️ {activity.durationMinutes} min</Badge>
        <Badge>⚡ {activity.energyLevel} energy</Badge>
        <Badge>🔧 {activity.prepEffort}</Badge>
      </div>

      <Section title="Objective">
        <p className="text-foreground/80">{activity.objective}</p>
      </Section>

      <Section title="Materials">
        <ul className="list-inside list-disc space-y-1 text-foreground/80">
          {activity.materials.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </Section>

      <Section title="How to Play">
        <ol className="list-inside list-decimal space-y-2 text-foreground/80">
          {activity.howToPlay.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </Section>

      <Section title="Rules">
        <ul className="list-inside list-disc space-y-1 text-foreground/80">
          {activity.rules.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </Section>

      {activity.variation && (
        <Section title="Variation">
          <p className="text-foreground/80">{activity.variation}</p>
        </Section>
      )}

      {activity.debriefQuestions && activity.debriefQuestions.length > 0 && (
        <Section title="Debrief Questions">
          <ul className="list-inside list-disc space-y-1 text-foreground/80">
            {activity.debriefQuestions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </Section>
      )}

      {activity.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {activity.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-black/5 px-3 py-1 text-xs text-foreground/60 dark:bg-white/10"
            >
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-black/10 px-3 py-1 dark:border-white/10">
      {children}
    </span>
  );
}
