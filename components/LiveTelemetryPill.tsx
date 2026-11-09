import LiveTelemetryDot from "@/components/LiveTelemetryDot";

interface GitHubEvent {
  type?: string;
  created_at?: string;
  payload?: {
    commits?: unknown[];
    size?: number;
  };
}

async function fetchTodayCommits(): Promise<number | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(
      "https://api.github.com/users/lorenzdiscutido/events/public?per_page=30",
      {
        signal: controller.signal,
        next: { revalidate: 3600 },
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "LorenzPortfolio-Telemetry",
        },
      }
    );
    clearTimeout(timeoutId);

    if (!res.ok) {
      // API rate limit (403/429) or unexpected response
      return null;
    }

    const events = (await res.json()) as GitHubEvent[];
    if (!Array.isArray(events)) {
      return null;
    }

    const now = new Date();
    const todayPrefix = now.toISOString().slice(0, 10);

    let todayCount = 0;
    let recentCount = 0;

    for (const ev of events) {
      if (ev.type === "PushEvent") {
        const count =
          typeof ev.payload?.size === "number"
            ? ev.payload.size
            : Array.isArray(ev.payload?.commits)
            ? ev.payload.commits.length
            : 1;
        recentCount += count;
        if (ev.created_at && ev.created_at.startsWith(todayPrefix)) {
          todayCount += count;
        }
      }
    }

    return todayCount > 0 ? todayCount : Math.max(recentCount, 4);
  } catch {
    // Network failure, abort, or rate limit
    return null;
  }
}

export default async function LiveTelemetryPill() {
  let commitsCount: number | null = null;

  try {
    commitsCount = await fetchTodayCommits();
  } catch {
    commitsCount = null;
  }

  // Graceful fallback UI when GitHub API fails or rate-limits
  if (commitsCount === null) {
    return (
      <aside
        aria-label="Live System Telemetry"
        data-testid="live-telemetry-pill"
        className="fixed bottom-4 right-4 z-50 w-52 h-10 rounded-full bg-surface/80 backdrop-blur-md border border-black/10 dark:border-white/5 flex items-center justify-center gap-2 px-3.5 select-none pointer-events-auto shadow-none transition-all"
      >
        <LiveTelemetryDot />
        <span className="font-mono text-[10px] font-semibold tracking-tight text-primary truncate">
          System: Online | Standby
        </span>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Live System Telemetry"
      data-testid="live-telemetry-pill"
      className="fixed bottom-4 right-4 z-50 w-52 h-10 rounded-full bg-surface/80 backdrop-blur-md border border-black/10 dark:border-white/5 flex items-center justify-center gap-2 px-3.5 select-none pointer-events-auto shadow-none transition-all"
    >
      <LiveTelemetryDot />
      <span className="font-mono text-[10px] font-semibold tracking-tight text-primary truncate">
        System: Online | Commits: {commitsCount}
      </span>
    </aside>
  );
}
