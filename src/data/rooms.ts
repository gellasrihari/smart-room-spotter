// Room schedules transcribed from the 10 SEEE timetables (Odd Semester 2026-27;
// the I-year sheet is the 2024-25 edition as uploaded).
// NOTE: AC / capacity / projector are NOT in the timetables — they are estimates
// (labs assumed AC, 30 seats; classrooms non-AC, 60 seats, projector).

export type DayKey = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";

export const DAY_KEYS: DayKey[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type Slot = {
  day: DayKey;
  start: string;
  end: string;
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
  4: "Fourth Floor",
  5: "Fifth Floor",
  6: "Sixth Floor",
  7: "Seventh Floor",
};

// Period timings
const UPPER: [string, string][] = [
  ["09:00", "09:50"], ["09:50", "10:40"], ["10:50", "11:40"], ["11:40", "12:30"],
  ["12:30", "13:20"], ["13:20", "14:10"], ["14:10", "15:00"], ["15:10", "16:00"], ["16:00", "16:50"],
];
const FIRST: [string, string][] = [
  ["09:00", "09:50"], ["09:55", "10:45"], ["10:50", "11:40"], ["11:45", "12:35"],
  ["12:35", "13:30"], ["13:30", "14:20"], ["14:25", "15:15"], ["15:20", "16:10"], ["16:15", "17:05"],
];

type Sheet = {
  section: string;
  venue: string | null; // home room number used by lettered slots
  periods: [string, string][];
  // Mon..Fri, 9 cells "|" separated. "" = free, "A" = slot in home venue,
  // "@108,309" = session held in those rooms ("TB106" = TB block).
  grid: string[];
};

const SHEETS: Sheet[] = [
  { section: "III BME", venue: "211", periods: UPPER, grid: [
    "@625|@625|@107|@107||E|B|F|H", "@108|@108|@625|||C|D|A|B", "|||||C|A|F|D", "|||@108||A|C|E|B", "@108|||||F|A|D|E"] },
  { section: "III ECE-A", venue: "518", periods: UPPER, grid: [
    "E|B|B|A||@625|@625||", "H|D|B|B-Proj|||@625||", "C|A|D|F||||@108,309|@108,309", "A|E|C|F|||||", "D|A|E|C||@108,309|@108,309||"] },
  { section: "III ECE-B", venue: "518", periods: UPPER, grid: [
    "@108,309|@108,309||||E|B|A|D", "@625|@625||||F|B|D|C", "@625|||||B-Proj|B|A|H", "@108,309|@108,309||||A|C|E|F", "|||||C|A|E|D"] },
  { section: "III ECE-DS", venue: "519", periods: UPPER, grid: [
    "E|B|C|A|||||", "C|B|D|F||@108,107|@108,107||", "H|B|A|C||||@625|@625", "A|D|E|F|||||", "D|A|E|B-Proj||@625||@108,107|@108,107"] },
  { section: "II BME", venue: "602", periods: UPPER, grid: [
    "E|C|I|I||@107,309|@107,309||", "C|E|B|A||@TB106|@TB106||", "B|D|A|||@TB106|@602||", "A|E|B|D||||@107,309|@107,309", "F|A|C|D||||@602|@602"] },
  { section: "II ECE-DS A", venue: "416", periods: UPPER, grid: [
    "E|A|I|I||@602|@602|@309,107|@309,107", "C|A|E|D||@602||@TB106|@TB106", "A|B|C|D|||@TB106||", "B|C|A|F||@309,107|@309,107||", "D|B|E|C|||||"] },
  { section: "II ECE-DS B", venue: "411", periods: UPPER, grid: [
    "||@309,107|@309,107||D|B|C|I", "@309,107|@309,107||||C|D|E|A", "@401|||||I|E|A|D", "@401|@401|@TB106|@TB106||A|C|B|E", "@TB106|||||F|A|B|C"] },
  { section: "IV ECE-A", venue: "225", periods: UPPER, grid: [
    "C||A|D|||||", "C|D|B|F|||||", "B|@108|E|F|||||", "F|A|E|B|||||", "C|A|D|E|||||"] },
  { section: "IV ECE-B", venue: "227", periods: UPPER, grid: [
    "C|A|E|F|||||", "C|E|F|B|||||", "C|D|A|B|||||", "D|B|@108|A|||||", "E|D|F||||||"] },
  { section: "I ECE-A", venue: null, periods: FIRST, grid: [
    "@602|@602|@602|@602||||@710|@710", "@602|@602|@602|@602||@20,21|@20,21|@20,21|@20,21",
    "@602|@602|@602|||@618|@618|@108|@108", "@602|@602|@602|@602||@510|@510|@201|@201", "@602|@602|@602|@602||@602|@626|@626|@626"] },
  { section: "I ECE-B / EEE", venue: null, periods: FIRST, grid: [
    "@609|@710,520||||@602|@602|@602|@602", "@20,21|@20,21|@20,21|@20,21||@602|@602|@602|@602",
    "@710,520|@617|@510|@510|@618||@602|@602|@602", "@201|@201|@626|@710||@602|@602|@602|@602", "@617|@617||@626|@626|@626||@602|@602"] },
  { section: "I ECE-DS", venue: null, periods: FIRST, grid: [
    "@710||@617|@617||@502|@502|@502|@502", "||@201|@201||@502|@502|@502|@502",
    "@510|@510|@710||@617|@617|@502|@502|@502", "@710|@510|@710|@502|@502|@502||@502|@502", "@626|@626||||@20,21|@20,21|@20,21|@20,21"] },
  { section: "I Biotech-B / BME", venue: null, periods: FIRST, grid: [
    "@520|||@710,520||@702|@702|@702|@702", "@710|@710|@520|@710|||@702|@702|@702",
    "@20,21|@20,21|@20,21|@20,21||@702|@702|@702|@702", "||@710|@510,520||@702|@702|@702|@702", "@702|@702|@702|@702|@702|@702|||"] },
];

const LAB_ROOMS = new Set(["107", "108", "309", "617", "618", "20", "21"]);
const WEEK: DayKey[] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function roomId(code: string) {
  return code.startsWith("TB") ? `TB ${code.slice(2)}` : `IST ${code}`;
}
function floorOf(code: string) {
  const n = code.replace(/\D/g, "");
  return n.length >= 3 ? Number(n[0]) : 0;
}

function build(): Room[] {
  const map = new Map<string, Room>();
  const get = (code: string) => {
    const id = roomId(code);
    let r = map.get(id);
    if (!r) {
      const lab = LAB_ROOMS.has(code);
      r = { id, floor: floorOf(code), ac: lab, capacity: lab ? 30 : 60, projector: !lab, schedule: [] };
      map.set(id, r);
    }
    return r;
  };
  // Make sure every home venue appears even when free all day
  SHEETS.forEach((s) => s.venue && get(s.venue));

  for (const sheet of SHEETS) {
    sheet.grid.forEach((row, di) => {
      const day = WEEK[di]!;
      row.split("|").forEach((raw, pi) => {
        const cell = raw.trim();
        if (!cell) return;
        const [start, end] = sheet.periods[pi]!;
        let codes: string[];
        let label: string;
        if (cell.startsWith("@")) {
          codes = cell.slice(1).split(",");
          label = `${sheet.section} · class`;
        } else {
          if (!sheet.venue) return;
          codes = [sheet.venue];
          label = `${sheet.section} · Slot ${cell}`;
        }
        for (const c of codes) {
          const room = get(c);
          const last = room.schedule[room.schedule.length - 1];
          if (last && last.day === day && last.label === label && last.end >= start && pi > 0 && sheet.periods[pi - 1]![1] === last.end) {
            last.end = end;
          } else {
            room.schedule.push({ day, start, end, label });
          }
        }
      });
    });
  }
  return [...map.values()];
}

export const ROOMS: Room[] = build();
