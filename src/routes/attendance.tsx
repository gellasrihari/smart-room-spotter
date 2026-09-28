import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ATT_DAYS, TIMETABLES, type Timetable } from "@/data/timetables";

export const Route = createFileRoute("/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance calculator — Roomly" },
      { name: "description", content: "Pick your SRM Trichy section, mark classes present or absent, and see attendance and bunk math per subject." },
      { property: "og:title", content: "Attendance calculator — Roomly" },
      { property: "og:description", content: "Section timetables with live attendance percentages and bunk math." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Attendance,
});

type Rec = { held: number; attended: number; od: number };
type Data = Record<string, Record<string, Rec>>;
const EMPTY: Rec = { held: 0, attended: 0, od: 0 };

function subjectsOf(t: Timetable) {
  const c: Record<string, number> = {};
  t.grid.flat().forEach((x) => x && (c[x] = (c[x] ?? 0) + 1));
  return Object.entries(c).map(([code, perWeek]) => ({ code, name: t.subjects[code] ?? code, perWeek }));
}
const pct = (a: number, h: number) => (h <= 0 ? 0 : (a / h) * 100);
function status(p: number, target: number, held: number) {
  if (held === 0 || p >= target) return "safe";
  return p >= target - 10 ? "warn" : "danger";
}
const TONE: Record<string, string> = {
  safe: "text-free bg-free/10 ring-free/40",
  warn: "text-soon bg-soon/10 ring-soon/40",
  danger: "text-destructive bg-destructive/10 ring-destructive/40",
};
const LABEL: Record<string, string> = { safe: "Safe", warn: "At risk", danger: "Short" };

function Attendance() {
  const [ttId, setTtId] = useState(TIMETABLES[0]!.id);
  const [target, setTarget] = useState(75);
  const [data, setData] = useState<Data>({});
  const [ready, setReady] = useState(false);
  const [day, setDay] = useState(0);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("attendly") ?? "{}");
      if (s.data) setData(s.data);
      if (s.ttId) setTtId(s.ttId);
      if (s.target) setTarget(s.target);
    } catch {}
    const theme = localStorage.getItem("roomly-theme");
    document.documentElement.classList.toggle("dark", theme ? theme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches);
    const d = new Date().getDay();
    setDay(d >= 1 && d <= 5 ? d - 1 : 0);
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem("attendly", JSON.stringify({ data, ttId, target }));
  }, [data, ttId, target, ready]);

  const tt = (TIMETABLES.find((t) => t.id === ttId) ?? TIMETABLES[0])!;
  const subjects = useMemo(() => subjectsOf(tt), [tt]);
  const rec = (c: string) => data[tt.id]?.[c] ?? EMPTY;
  const setRec = (c: string, r: Rec) =>
    setData((d) => ({ ...d, [tt.id]: { ...(d[tt.id] ?? {}), [c]: { ...r, attended: Math.min(r.attended, r.held) } } }));

  const markDay = (present: boolean, od = false) => {
    const c: Record<string, number> = {};
    (tt.grid[day] ?? []).forEach((x) => x && (c[x] = (c[x] ?? 0) + 1));
    setData((d) => {
      const cur = { ...(d[tt.id] ?? {}) };
      for (const [code, n] of Object.entries(c)) {
        const r = cur[code] ?? EMPTY;
        cur[code] = { held: r.held + n, attended: r.attended + (present || od ? n : 0), od: r.od + (od ? n : 0) };
      }
      return { ...d, [tt.id]: cur };
    });
  };

  const total = subjects.reduce((a, s) => ({ held: a.held + rec(s.code).held, attended: a.attended + rec(s.code).attended }), { held: 0, attended: 0 });
  const overall = pct(total.attended, total.held);
  const overallSt = status(overall, target, total.held);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-6 py-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-2xl bg-card/70 shadow-lg ring-1 ring-border backdrop-blur-xl">
              <span className="font-display text-lg font-bold text-brand">R</span>
            </div>
            <div>
              <p className="font-display text-lg font-bold leading-none">Roomly</p>
              <p className="text-xs text-muted-foreground">Attendance calculator</p>
            </div>
          </Link>
          <nav className="flex gap-2 text-sm">
            <Link to="/" className="rounded-full bg-card/60 px-4 py-2 ring-1 ring-border">Rooms</Link>
            <span className="rounded-full bg-brand px-4 py-2 text-primary-foreground">Attendance</span>
          </nav>
        </header>

        <section className="mt-8 flex flex-wrap items-end gap-4 rounded-3xl bg-card/60 p-6 ring-1 ring-border backdrop-blur-2xl">
          <label className="text-sm text-muted-foreground">
            Section
            <select value={ttId} onChange={(e) => setTtId(e.target.value)} className="mt-1 block rounded-lg border border-input bg-background px-3 py-2 text-foreground">
              {TIMETABLES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </label>
          <label className="text-sm text-muted-foreground">
            Target %
            <input type="number" min={1} max={99} value={target} onChange={(e) => setTarget(Math.max(1, Math.min(99, Number(e.target.value) || 75)))} className="mt-1 block w-24 rounded-lg border border-input bg-background px-3 py-2 text-foreground" />
          </label>
          <div className="ml-auto text-right">
            <p className="text-xs text-muted-foreground">{tt.semester} · {tt.venue}</p>
            <p className={`mt-1 inline-block rounded-full px-4 py-1 font-display text-2xl font-bold ring-1 ${TONE[overallSt]}`}>
              {overall.toFixed(1)}% <span className="text-sm font-medium">{LABEL[overallSt]}</span>
            </p>
            <p className="text-xs text-muted-foreground">{total.attended}/{total.held} classes</p>
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-card/60 p-6 ring-1 ring-border backdrop-blur-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <p className="mr-2 font-display font-semibold">Quick mark a day</p>
            {ATT_DAYS.map((d, i) => (
              <button key={d} onClick={() => setDay(i)} className={`rounded-full px-3 py-1 text-sm ring-1 ring-border ${i === day ? "bg-brand text-primary-foreground" : "bg-background"}`}>{d}</button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {(tt.grid[day] ?? []).map((c, i) => c ? (
              <span key={i} className="rounded-lg bg-background px-3 py-1 text-xs ring-1 ring-border">{tt.times[i]} · {tt.subjects[c] ?? c}</span>
            ) : null)}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => markDay(true)} className="rounded-lg bg-free px-4 py-2 text-sm font-medium text-primary-foreground">Present all</button>
            <button onClick={() => markDay(false)} className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-primary-foreground">Absent all</button>
            <button onClick={() => markDay(false, true)} className="rounded-lg bg-accent2 px-4 py-2 text-sm font-medium text-primary-foreground">On duty</button>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s) => {
            const r = rec(s.code);
            const p = pct(r.attended, r.held);
            const st = status(p, target, r.held);
            const need = p >= target || r.held === 0 ? 0 : Math.ceil((target * r.held - 100 * r.attended) / (100 - target));
            const bunk = r.held === 0 ? 0 : Math.max(0, Math.floor((100 * r.attended - target * r.held) / target));
            return (
              <article key={s.code} className="rounded-3xl bg-card/60 p-5 ring-1 ring-border backdrop-blur-2xl">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-display font-semibold leading-tight">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.code} · {s.perWeek}/week</p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs ring-1 ${TONE[st]}`}>{p.toFixed(0)}%</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {r.held === 0 ? "No classes marked yet" : need > 0 ? `Attend next ${need} to reach ${target}%` : `You can skip ${bunk} class${bunk === 1 ? "" : "es"}`}
                </p>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{r.attended}/{r.held}{r.od ? ` (${r.od} OD)` : ""}</span>
                  <div className="ml-auto flex gap-1">
                    <button onClick={() => setRec(s.code, { ...r, held: r.held + 1, attended: r.attended + 1 })} className="rounded-md bg-free/15 px-2 py-1 text-free">+P</button>
                    <button onClick={() => setRec(s.code, { ...r, held: r.held + 1 })} className="rounded-md bg-destructive/15 px-2 py-1 text-destructive">+A</button>
                    <button onClick={() => setRec(s.code, EMPTY)} className="rounded-md bg-muted px-2 py-1 text-muted-foreground">Reset</button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </main>
  );
}
