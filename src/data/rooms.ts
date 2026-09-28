// SAMPLE DATA — replace with the real timetables once uploaded.
// Each room keeps its facilities plus a weekly class schedule.

export type DayKey = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export const DAY_KEYS: DayKey[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type Slot = {
  day: DayKey;
  start: string; // "09:00"
  end: string; // "10:30"
  label: string;
};

export type Room = {
  id: string;
  floor: number; // 0 = ground
  ac: boolean;
  capacity: number;
  projector: boolean;
  schedule: Slot[];
};

export const FLOOR_NAMES: Record<number, string> = {
  0: "Ground Floor",
  1: "First Floor",
  2: "Second Floor",
  3: "Third Floor",
};

const weekdays: DayKey[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function repeat(times: { start: string; end: string; label: string }[], days: DayKey[] = weekdays): Slot[] {
  return days.flatMap((day) => times.map((t) => ({ day, ...t })));
}

export const ROOMS: Room[] = [
  {
    id: "G-01",
    floor: 0,
    ac: true,
    capacity: 12,
    projector: true,
    schedule: repeat([
      { start: "09:00", end: "10:30", label: "CS101 Programming" },
      { start: "13:00", end: "14:00", label: "MATH204 Tutorial" },
    ]),
  },
  {
    id: "G-02",
    floor: 0,
    ac: false,
    capacity: 8,
    projector: false,
    schedule: repeat([{ start: "11:00", end: "12:30", label: "Design Studio" }], ["Mon", "Wed", "Fri"]),
  },
  {
    id: "G-03",
    floor: 0,
    ac: true,
    capacity: 6,
    projector: false,
    schedule: repeat([{ start: "15:00", end: "16:00", label: "Seminar" }], ["Tue", "Thu"]),
  },
  {
    id: "G-04",
    floor: 0,
    ac: true,
    capacity: 20,
    projector: true,
    schedule: repeat([
      { start: "09:00", end: "11:00", label: "PHYS110 Lecture" },
      { start: "14:00", end: "16:00", label: "PHYS110 Lab" },
    ]),
  },
  {
    id: "1-01",
    floor: 1,
    ac: true,
    capacity: 4,
    projector: false,
    schedule: repeat([{ start: "10:00", end: "11:00", label: "Group Mentoring" }], ["Mon", "Thu"]),
  },
  {
    id: "1-02",
    floor: 1,
    ac: false,
    capacity: 10,
    projector: false,
    schedule: repeat([
      { start: "09:00", end: "12:00", label: "BIO210 Practical" },
      { start: "13:30", end: "15:00", label: "BIO210 Theory" },
    ]),
  },
  {
    id: "1-03",
    floor: 1,
    ac: true,
    capacity: 6,
    projector: false,
    schedule: repeat([{ start: "16:00", end: "17:00", label: "Club Meeting" }], ["Wed"]),
  },
  {
    id: "1-04",
    floor: 1,
    ac: true,
    capacity: 16,
    projector: true,
    schedule: repeat([{ start: "11:00", end: "13:00", label: "CHEM150 Lecture" }]),
  },
  {
    id: "1-05",
    floor: 1,
    ac: false,
    capacity: 24,
    projector: true,
    schedule: repeat([{ start: "09:00", end: "10:00", label: "ENG105" }], ["Tue", "Thu", "Sat"]),
  },
  {
    id: "2-01",
    floor: 2,
    ac: true,
    capacity: 2,
    projector: false,
    schedule: repeat([{ start: "08:00", end: "18:00", label: "Reserved — Research" }], ["Mon", "Tue", "Wed"]),
  },
  {
    id: "2-02",
    floor: 2,
    ac: true,
    capacity: 4,
    projector: false,
    schedule: [],
  },
  {
    id: "2-03",
    floor: 2,
    ac: false,
    capacity: 6,
    projector: false,
    schedule: repeat([{ start: "12:00", end: "14:00", label: "Study Circle" }], ["Mon", "Wed", "Fri"]),
  },
];
