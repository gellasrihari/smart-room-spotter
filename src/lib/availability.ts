import { DAY_KEYS, ROOMS, type DayKey, type Room, type Slot } from "@/data/rooms";

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function fromMinutes(mins: number): string {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function dayKeyOf(date: Date): DayKey {
  return DAY_KEYS[date.getDay()];
}

export type RoomStatus = {
  room: Room;
  free: boolean;
  /** Class currently running, when occupied. */
  current?: Slot;
  /** Minute-of-day the room stays free until (next class start, or end of day). */
  freeUntil?: number;
  /** Minute-of-day the current class ends. */
  busyUntil?: number;
};

const DAY_END = 21 * 60;

export function statusAt(room: Room, day: DayKey, minutes: number): RoomStatus {
  const todays = room.schedule
    .filter((s) => s.day === day)
    .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));

  const current = todays.find((s) => minutes >= toMinutes(s.start) && minutes < toMinutes(s.end));
  if (current) {
    return { room, free: false, current, busyUntil: toMinutes(current.end) };
  }
  const next = todays.find((s) => toMinutes(s.start) > minutes);
  return { room, free: true, freeUntil: next ? toMinutes(next.start) : DAY_END };
}

export function allStatuses(day: DayKey, minutes: number): RoomStatus[] {
  return ROOMS.map((r) => statusAt(r, day, minutes));
}

export function groupByFloor(statuses: RoomStatus[]): { floor: number; rooms: RoomStatus[] }[] {
  const map = new Map<number, RoomStatus[]>();
  for (const s of statuses) {
    const list = map.get(s.room.floor) ?? [];
    list.push(s);
    map.set(s.room.floor, list);
  }
  return [...map.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([floor, rooms]) => ({
      floor,
      rooms: rooms.sort((a, b) => a.room.id.localeCompare(b.room.id)),
    }));
}
