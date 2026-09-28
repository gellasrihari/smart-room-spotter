import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";

import { FLOOR_NAMES, ROOMS, type DayKey, type Room } from "@/data/rooms";
import {
  allStatuses,
  dayKeyOf,
  fromMinutes,
  groupByFloor,
  statusAt,
  toMinutes,
  type RoomStatus,
} from "@/lib/availability";
import { parseRoomRequest, type ParsedNeed } from "@/lib/roomSearch.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Roomly — Find an empty campus room right now" },
      {
        name: "description",
        content:
          "See which campus rooms are free floor by floor, or just type what you need — AC, projector, seats, how long — and get matching rooms instantly.",
      },
      { property: "og:title", content: "Roomly — Find an empty campus room right now" },
      {
        property: "og:description",
        content:
          "Live floor-by-floor room availability plus a smart search bar that understands plain sentences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const EXAMPLES = [
  "AC room on the ground floor for 2 hours",
  "Projector room for 20 people",
  "Quiet AC room for me and my team",
];

function freeForDuration(room: Room, day: DayKey, start: number, duration: number) {
  const s = statusAt(room, day, start);
  if (!s.free) return false;
  return (s.freeUntil ?? 0) >= start + duration;
}

function matchRooms(need: ParsedNeed, day: DayKey, nowMinutes: number) {
  const start = need.startTime ? toMinutes(need.startTime) : nowMinutes;
  const duration = need.durationMinutes ?? 60;
  return ROOMS.filter((r) => {
    if (need.floor !== null && r.floor !== need.floor) return false;
    if (need.ac !== null && r.ac !== need.ac) return false;
    if (need.projector === true && !r.projector) return false;
    if (need.minCapacity !== null && r.capacity < need.minCapacity) return false;
    return freeForDuration(r, day, start, duration);
  }).map((r) => statusAt(r, day, start));
}

function Dot({ tone }: { tone: "free" | "soon" | "busy" }) {
  const cls =
    tone === "free" ? "bg-free" : tone === "soon" ? "bg-soon" : "bg-busy";
  return <span className={`size-2.5 rounded-full ${cls}`} />;
}

function toneOf(s: RoomStatus, minutes: number): "free" | "soon" | "busy" {
  if (!s.free) return "busy";
  if ((s.freeUntil ?? 0) - minutes <= 30) return "soon";
  return "free";
}

function RoomCard({ status, minutes }: { status: RoomStatus; minutes: number }) {
  const tone = toneOf(status, minutes);
  const { room } = status;
  return (
    <div className="rounded-2xl bg-white/70 p-4 ring-1 ring-white/70">
      <div className="flex items-center justify-between">
        <p className="font-display font-semibold">{room.id}</p>
        <Dot tone={tone} />
      </div>
      <p className="mt-1 text-xs text-slate-500">
        {room.ac ? "AC" : "Non-AC"} · {room.capacity} seats{room.projector ? " · Projector" : ""}
      </p>
      {status.free ? (
        <p
          className={`mt-3 text-xs font-semibold ${tone === "soon" ? "text-soon" : "text-free"}`}
        >
          Free until {fromMinutes(status.freeUntil ?? 0)}
        </p>
      ) : (
        <p className="mt-3 text-xs font-semibold text-slate-400">
          {status.current?.label} · till {fromMinutes(status.busyUntil ?? 0)}
        </p>
      )}
    </div>
  );
}

function Index() {
  const [now, setNow] = useState<Date | null>(null);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [need, setNeed] = useState<ParsedNeed | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ask = useServerFn(parseRoomRequest);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  const day: DayKey = now ? dayKeyOf(now) : "Mon";
  const minutes = now ? now.getHours() * 60 + now.getMinutes() : 9 * 60;

  const floors = useMemo(() => groupByFloor(allStatuses(day, minutes)), [day, minutes]);
  const freeCount = useMemo(
    () => allStatuses(day, minutes).filter((s) => s.free).length,
    [day, minutes],
  );
  const matches = useMemo(
    () => (need ? matchRooms(need, day, minutes) : null),
    [need, day, minutes],
  );

  async function runSearch(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    setBusy(true);
    setError(null);
    const res = await ask({
      data: { query: q, day, time: fromMinutes(minutes) },
    });
    setBusy(false);
    if (res.error || !res.need) {
      setNeed(null);
      setError(res.error ?? "Something went wrong.");
      return;
    }
    setNeed(res.need);
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-100 via-sky-50 to-cyan-100 font-sans text-ink">
      <div className="blob-a pointer-events-none absolute -top-24 -left-24 size-[420px] rounded-full bg-brand/30 blur-3xl" />
      <div className="blob-b pointer-events-none absolute top-40 right-0 size-[380px] rounded-full bg-accent2/30 blur-3xl" />
      <div className="blob-c pointer-events-none absolute bottom-0 left-1/3 size-[360px] rounded-full bg-fuchsia-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl bg-white/60 shadow-lg shadow-brand/10 ring-1 ring-white/60 backdrop-blur-xl">
              <span className="font-display text-lg font-bold text-brand">R</span>
            </div>
            <div>
              <p className="font-display text-lg font-bold leading-none">Roomly</p>
              <p className="text-xs text-slate-500">Campus space finder</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/50 px-4 py-2 shadow-sm ring-1 ring-white/60 backdrop-blur-xl">
            <span className="size-2 rounded-full bg-free" />
            <span className="text-sm font-medium text-slate-600">
              {now ? `${freeCount} rooms free · ${day} ${fromMinutes(minutes)}` : "Checking…"}
            </span>
          </div>
        </header>

        <section className="mt-12 rounded-[2rem] bg-white/40 p-8 shadow-2xl shadow-brand/10 ring-1 ring-white/60 backdrop-blur-2xl">
          <p className="font-display text-3xl font-bold tracking-tight">Find a room in seconds</p>
          <p className="mt-1 text-slate-500">
            Describe what you need — we match it to what's open right now.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void runSearch(query);
            }}
            className="mt-6 flex items-center gap-3 rounded-2xl bg-white/70 px-5 py-4 shadow-inner ring-1 ring-white/70"
          >
            <span className="text-xl text-brand">⌕</span>
            <input
              className="min-w-0 flex-1 bg-transparent text-base text-slate-700 placeholder-slate-400 outline-none"
              placeholder="e.g. AC room on the ground floor for 2 hours"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              disabled={busy}
              className="shrink-0 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand/30 disabled:opacity-60"
            >
              {busy ? "Thinking…" : "Search"}
            </button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => {
                  setQuery(ex);
                  void runSearch(ex);
                }}
                className="rounded-full bg-white/60 px-3 py-1.5 text-xs font-medium text-slate-600 ring-1 ring-white/60"
              >
                {ex}
              </button>
            ))}
          </div>

          {error && <p className="mt-4 text-sm font-medium text-rose-600">{error}</p>}

          {need && matches && (
            <div className="mt-6 border-t border-white/60 pt-6">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="font-display font-semibold">
                  {matches.length > 0
                    ? `${matches.length} room${matches.length > 1 ? "s" : ""} match your request`
                    : "No rooms match right now"}
                </p>
                <p className="text-xs text-slate-500">
                  {need.summary || "Your request"}
                  {need.durationMinutes ? ` · ${need.durationMinutes} min` : ""}
                </p>
              </div>
              {matches.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {matches.map((s) => (
                    <div key={s.room.id} className="rounded-2xl bg-white/70 p-4 ring-1 ring-white/70">
                      <div className="flex items-center justify-between">
                        <p className="font-display font-semibold">{s.room.id}</p>
                        <span className="size-2.5 rounded-full bg-free" />
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        {FLOOR_NAMES[s.room.floor] ?? `Floor ${s.room.floor}`}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {s.room.ac ? "AC" : "Non-AC"} · {s.room.capacity} seats
                        {s.room.projector ? " · Projector" : ""}
                      </p>
                      <p className="mt-3 text-xs font-semibold text-free">
                        Free until {fromMinutes(s.freeUntil ?? 0)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">
                  Try a shorter duration, a different floor, or drop one requirement.
                </p>
              )}
            </div>
          )}
        </section>

        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold">Live availability</h2>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Dot tone="free" />
                Free
              </span>
              <span className="flex items-center gap-1.5">
                <Dot tone="soon" />
                Free briefly
              </span>
              <span className="flex items-center gap-1.5">
                <Dot tone="busy" />
                Occupied
              </span>
            </div>
          </div>

          <div className="space-y-5">
            {floors.map(({ floor, rooms }) => {
              const free = rooms.filter((r) => r.free).length;
              return (
                <div
                  key={floor}
                  className="rounded-3xl bg-white/40 p-5 shadow-lg shadow-brand/5 ring-1 ring-white/60 backdrop-blur-xl"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-xl bg-brand/10 font-display text-sm font-bold text-brand">
                      {floor === 0 ? "G" : floor}
                    </span>
                    <div>
                      <p className="font-display font-semibold">
                        {FLOOR_NAMES[floor] ?? `Floor ${floor}`}
                      </p>
                      <p className="text-xs text-slate-500">
                        {rooms.length} rooms · {free} free
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {rooms.map((s) => (
                      <RoomCard key={s.room.id} status={s} minutes={minutes} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
