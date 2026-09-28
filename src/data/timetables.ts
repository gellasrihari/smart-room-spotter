// Section timetables merged from Attendly
export type Timetable = { id: string; label: string; semester: string; venue: string; times: string[]; subjects: Record<string,string>; grid: string[][] };
export const ATT_DAYS = ["Mon","Tue","Wed","Thu","Fri"];
export const TIMETABLES: Timetable[] = [
 {
  "id": "iii-ece-a",
  "label": "III ECE-A",
  "semester": "V Sem · Odd 2026-27",
  "venue": "IST 518",
  "times": [
   "9:00",
   "9:50",
   "10:50",
   "11:40",
   "12:30",
   "1:20",
   "2:10",
   "3:10",
   "4:00"
  ],
  "subjects": {
   "A": "Discrete Mathematics",
   "B": "Microprocessor, Microcontroller & Interfacing",
   "B-Proj": "Microprocessor Project",
   "C": "VLSI Design and Technology",
   "D": "System and Network on Chip",
   "E": "Machine Learning for All",
   "F": "Community Connect",
   "G": "Analytical & Logical Thinking Skills",
   "H": "Indian Art Form",
   "LAB": "VLSI Design / Microprocessor Lab"
  },
  "grid": [
   [
    "E",
    "B",
    "B",
    "A",
    "",
    "G",
    "G",
    "",
    ""
   ],
   [
    "H",
    "D",
    "B",
    "B-Proj",
    "",
    "",
    "G",
    "",
    ""
   ],
   [
    "C",
    "A",
    "D",
    "F",
    "",
    "",
    "",
    "LAB",
    "LAB"
   ],
   [
    "A",
    "E",
    "C",
    "F",
    "",
    "",
    "",
    "",
    ""
   ],
   [
    "D",
    "A",
    "E",
    "C",
    "",
    "LAB",
    "LAB",
    "",
    ""
   ]
  ]
 },
 {
  "id": "iii-ece-b",
  "label": "III ECE-B",
  "semester": "V Sem · Odd 2026-27",
  "venue": "IST 518",
  "times": [
   "9:00",
   "9:50",
   "10:50",
   "11:40",
   "12:30",
   "1:20",
   "2:10",
   "3:10",
   "4:00"
  ],
  "subjects": {
   "A": "Discrete Mathematics",
   "B": "Microprocessor, Microcontroller & Interfacing",
   "B-Proj": "Microprocessor Project",
   "C": "VLSI Design and Technology",
   "D": "System and Network on Chip",
   "E": "Machine Learning for All",
   "F": "Community Connect",
   "G": "Analytical & Logical Thinking Skills",
   "H": "Indian Art Form",
   "LAB": "VLSI Design / Microprocessor Lab"
  },
  "grid": [
   [
    "LAB",
    "LAB",
    "",
    "",
    "",
    "E",
    "B",
    "A",
    "D"
   ],
   [
    "G",
    "G",
    "",
    "",
    "",
    "F",
    "B",
    "D",
    "C"
   ],
   [
    "G",
    "",
    "",
    "",
    "",
    "B-Proj",
    "B",
    "A",
    "H"
   ],
   [
    "LAB",
    "LAB",
    "",
    "",
    "",
    "A",
    "C",
    "E",
    "F"
   ],
   [
    "",
    "",
    "",
    "",
    "",
    "C",
    "A",
    "E",
    "D"
   ]
  ]
 },
 {
  "id": "iii-ece-ds",
  "label": "III ECE-DS",
  "semester": "V Sem · Odd 2026-27",
  "venue": "IST 519",
  "times": [
   "9:00",
   "9:50",
   "10:50",
   "11:40",
   "12:30",
   "1:20",
   "2:10",
   "3:10",
   "4:00"
  ],
  "subjects": {
   "A": "Discrete Mathematics",
   "B": "Microprocessor, Microcontroller & Interfacing",
   "B-Proj": "Microprocessor Project",
   "C": "VLSI Design and Technology",
   "D": "Machine Learning for All",
   "E": "Database Design and Management",
   "F": "Community Connect",
   "G": "Analytical & Logical Thinking Skills",
   "H": "Indian Art Form",
   "LAB": "VLSI Design / Microprocessor Lab"
  },
  "grid": [
   [
    "E",
    "B",
    "C",
    "A",
    "",
    "",
    "",
    "",
    ""
   ],
   [
    "C",
    "B",
    "D",
    "F",
    "",
    "LAB",
    "LAB",
    "",
    ""
   ],
   [
    "H",
    "B",
    "A",
    "C",
    "",
    "",
    "",
    "G",
    "G"
   ],
   [
    "A",
    "D",
    "E",
    "F",
    "",
    "",
    "",
    "",
    ""
   ],
   [
    "D",
    "A",
    "E",
    "B-Proj",
    "",
    "G",
    "",
    "LAB",
    "LAB"
   ]
  ]
 },
 {
  "id": "iii-bme",
  "label": "III BME",
  "semester": "V Sem · Odd 2026-27",
  "venue": "IST 211",
  "times": [
   "9:00",
   "9:50",
   "10:50",
   "11:40",
   "12:30",
   "1:20",
   "2:10",
   "3:10",
   "4:00"
  ],
  "subjects": {
   "A": "Probability and Statistics",
   "B": "Microcontrollers in Medicine",
   "C": "Biomedical Signal Processing",
   "D": "Biometrics",
   "E": "Modern Wireless Communication",
   "F": "Principles of Medical Imaging",
   "G": "Analytical & Logical Thinking Skills",
   "H": "Indian Art Form",
   "I": "Community Connect",
   "MPMC": "MPMC Lab",
   "DSP": "Bio DSP Lab"
  },
  "grid": [
   [
    "G",
    "G",
    "MPMC",
    "MPMC",
    "",
    "E",
    "B",
    "F",
    "H"
   ],
   [
    "DSP",
    "DSP",
    "G",
    "",
    "",
    "C",
    "D",
    "A",
    "B"
   ],
   [
    "",
    "",
    "",
    "",
    "",
    "C",
    "A",
    "F",
    "D"
   ],
   [
    "",
    "",
    "",
    "I",
    "",
    "A",
    "C",
    "E",
    "B"
   ],
   [
    "I",
    "",
    "",
    "",
    "",
    "F",
    "A",
    "D",
    "E"
   ]
  ]
 },
 {
  "id": "iv-ece-a",
  "label": "IV ECE-A",
  "semester": "VII Sem · Odd 2026-27",
  "venue": "IST 225",
  "times": [
   "9:00",
   "9:50",
   "10:50",
   "11:40",
   "12:30",
   "1:20",
   "2:10",
   "3:10",
   "4:00"
  ],
  "subjects": {
   "A": "Behavioural Psychology",
   "B": "Wireless Communication & Antenna Systems",
   "C": "Computer Communication & Network Security",
   "D": "Semiconductor Memory Design",
   "E": "Scripting Language for EDA",
   "F": "Machine Learning for All",
   "LAB": "CCNS Lab"
  },
  "grid": [
   [
    "C",
    "",
    "A",
    "D",
    "",
    "",
    "",
    "",
    ""
   ],
   [
    "C",
    "D",
    "B",
    "F",
    "",
    "",
    "",
    "",
    ""
   ],
   [
    "B",
    "LAB",
    "E",
    "F",
    "",
    "",
    "",
    "",
    ""
   ],
   [
    "F",
    "A",
    "E",
    "B",
    "",
    "",
    "",
    "",
    ""
   ],
   [
    "C",
    "A",
    "D",
    "E",
    "",
    "",
    "",
    "",
    ""
   ]
  ]
 },
 {
  "id": "ii-bme",
  "label": "II BME",
  "semester": "III Sem · Odd 2026-27",
  "venue": "IST 602 · FN",
  "times": [
   "9:00",
   "9:50",
   "10:50",
   "11:40",
   "12:30",
   "1:20",
   "2:10",
   "3:10",
   "4:00"
  ],
  "subjects": {
   "A": "Transforms and Boundary Value Problems",
   "B": "Biomedical Signals and Systems",
   "C": "Electric and Electronic Circuits",
   "D": "Digital Logic for Medical Systems",
   "E": "Medical Physics",
   "F": "Professional Ethics",
   "G": "Universal Human Values-II",
   "H": "Verbal Reasoning",
   "I": "Social Engineering",
   "DLMS": "Digital Logic for Medical Systems Lab"
  },
  "grid": [
   [
    "E",
    "C",
    "I",
    "I",
    "",
    "DLMS",
    "DLMS",
    "",
    ""
   ],
   [
    "C",
    "E",
    "B",
    "A",
    "",
    "H",
    "H",
    "",
    ""
   ],
   [
    "B",
    "D",
    "A",
    "",
    "",
    "H",
    "G",
    "",
    ""
   ],
   [
    "A",
    "E",
    "B",
    "D",
    "",
    "",
    "",
    "DLMS",
    "DLMS"
   ],
   [
    "F",
    "A",
    "C",
    "D",
    "",
    "",
    "",
    "G",
    "G"
   ]
  ]
 },
 {
  "id": "ii-ece-ds-a",
  "label": "II ECE-DS A",
  "semester": "III Sem · Odd 2026-27",
  "venue": "IST 416 · FN",
  "times": [
   "9:00",
   "9:50",
   "10:50",
   "11:40",
   "12:30",
   "1:20",
   "2:10",
   "3:10",
   "4:00"
  ],
  "subjects": {
   "A": "Transforms and Boundary Value Problems",
   "B": "Solid State Devices",
   "C": "Computer Organization and Architecture",
   "D": "Digital Logic Design",
   "E": "Electromagnetic Theory and Interference",
   "F": "Professional Ethics",
   "G": "Universal Human Values-II",
   "H": "Verbal Reasoning",
   "I": "Social Engineering",
   "LAB": "Devices and Digital IC Laboratory"
  },
  "grid": [
   [
    "E",
    "A",
    "I",
    "I",
    "",
    "G",
    "G",
    "LAB",
    "LAB"
   ],
   [
    "C",
    "A",
    "E",
    "D",
    "",
    "G",
    "G",
    "H",
    "H"
   ],
   [
    "A",
    "B",
    "C",
    "D",
    "",
    "",
    "H",
    "",
    ""
   ],
   [
    "B",
    "C",
    "A",
    "F",
    "",
    "LAB",
    "LAB",
    "",
    ""
   ],
   [
    "D",
    "B",
    "E",
    "C",
    "",
    "",
    "",
    "",
    ""
   ]
  ]
 },
 {
  "id": "ii-ece-ds-b",
  "label": "II ECE-DS B",
  "semester": "III Sem · Odd 2026-27",
  "venue": "IST 411 · AN",
  "times": [
   "9:00",
   "9:50",
   "10:50",
   "11:40",
   "12:30",
   "1:20",
   "2:10",
   "3:10",
   "4:00"
  ],
  "subjects": {
   "A": "Transforms and Boundary Value Problems",
   "B": "Solid State Devices",
   "C": "Computer Organization and Architecture",
   "D": "Digital Logic Design",
   "E": "Electromagnetic Theory and Interference",
   "F": "Professional Ethics",
   "G": "Universal Human Values-II",
   "H": "Verbal Reasoning",
   "I": "Social Engineering",
   "LAB": "Devices and Digital IC Laboratory"
  },
  "grid": [
   [
    "",
    "",
    "LAB",
    "LAB",
    "",
    "D",
    "B",
    "C",
    "I"
   ],
   [
    "LAB",
    "LAB",
    "",
    "",
    "",
    "C",
    "D",
    "E",
    "A"
   ],
   [
    "G",
    "G",
    "",
    "",
    "",
    "I",
    "E",
    "A",
    "D"
   ],
   [
    "G",
    "G",
    "H",
    "H",
    "",
    "A",
    "C",
    "B",
    "E"
   ],
   [
    "H",
    "H",
    "",
    "",
    "",
    "F",
    "A",
    "B",
    "C"
   ]
  ]
 },
 {
  "id": "i-ece-a",
  "label": "I ECE-A",
  "semester": "I Sem · 2024-25",
  "venue": "IST 602",
  "times": [
   "9:00",
   "9:55",
   "10:50",
   "11:45",
   "12:35",
   "1:30",
   "2:25",
   "3:20",
   "4:15"
  ],
  "subjects": {
   "A": "Advanced Calculus & Complex Analysis",
   "B": "Chemistry",
   "D": "Programming for Problem Solving",
   "E": "Philosophy of Engineering",
   "CHE": "Chemistry Lab",
   "WS": "Civil & Mechanical Workshop",
   "PPS": "PPS Lab",
   "CDC": "General Aptitude",
   "NSS": "NSS",
   "GER": "German",
   "PCB": "PCB Lab",
   "C": "Electronic System & PCB Design",
   "F": "Biology"
  },
  "grid": [
   [
    "E",
    "E",
    "B",
    "A",
    "",
    "CHE",
    "CHE",
    "F",
    "CDC"
   ],
   [
    "C",
    "B",
    "A",
    "D",
    "",
    "WS",
    "WS",
    "WS",
    "WS"
   ],
   [
    "B",
    "E",
    "D",
    "",
    "",
    "PPS",
    "PPS",
    "PCB",
    "PCB"
   ],
   [
    "",
    "GER",
    "GER",
    "A",
    "",
    "CDC",
    "CDC",
    "NSS",
    "NSS"
   ],
   [
    "D",
    "A",
    "C",
    "B",
    "",
    "F",
    "GER",
    "GER",
    "GER"
   ]
  ]
 },
 {
  "id": "i-ece-b",
  "label": "I ECE-B & EEE",
  "semester": "I Sem · 2024-25",
  "venue": "IST 602",
  "times": [
   "9:00",
   "9:55",
   "10:50",
   "11:45",
   "12:35",
   "1:30",
   "2:25",
   "3:20",
   "4:15"
  ],
  "subjects": {
   "A": "Advanced Calculus & Complex Analysis",
   "B": "Chemistry",
   "D": "Programming for Problem Solving",
   "E": "Philosophy of Engineering",
   "CHE": "Chemistry Lab",
   "WS": "Civil & Mechanical Workshop",
   "PPS": "PPS Lab",
   "CDC": "General Aptitude",
   "NSS": "NSS",
   "GER": "German",
   "PCB": "PCB Lab",
   "C": "Biology",
   "F": "Electronic System & PCB Design",
   "G": "Electrical Circuits (EEE)"
  },
  "grid": [
   [
    "CDC",
    "F",
    "CHE",
    "CHE",
    "",
    "E",
    "E",
    "B",
    "A"
   ],
   [
    "WS",
    "WS",
    "WS",
    "WS",
    "",
    "C",
    "B",
    "A",
    "D"
   ],
   [
    "F",
    "PPS",
    "CDC",
    "CDC",
    "PPS",
    "",
    "B",
    "E",
    "D"
   ],
   [
    "NSS",
    "NSS",
    "C",
    "A",
    "",
    "D",
    "GER",
    "GER",
    "GER"
   ],
   [
    "PCB",
    "PCB",
    "",
    "GER",
    "GER",
    "",
    "",
    "B",
    "A"
   ]
  ]
 },
 {
  "id": "i-ece-ds",
  "label": "I ECE-DS",
  "semester": "I Sem · 2024-25",
  "venue": "IST 502",
  "times": [
   "9:00",
   "9:55",
   "10:50",
   "11:45",
   "12:35",
   "1:30",
   "2:25",
   "3:20",
   "4:15"
  ],
  "subjects": {
   "A": "Advanced Calculus & Complex Analysis",
   "B": "Chemistry",
   "D": "Programming for Problem Solving",
   "E": "Philosophy of Engineering",
   "CHE": "Chemistry Lab",
   "WS": "Civil & Mechanical Workshop",
   "PPS": "PPS Lab",
   "CDC": "General Aptitude",
   "NSS": "NSS",
   "GER": "German",
   "PCB": "PCB Lab",
   "C": "Electronic System & PCB Design",
   "F": "Biology"
  },
  "grid": [
   [
    "F",
    "CDC",
    "PCB",
    "PCB",
    "",
    "E",
    "E",
    "B",
    "A"
   ],
   [
    "CHE",
    "CHE",
    "NSS",
    "NSS",
    "",
    "C",
    "B",
    "A",
    "D"
   ],
   [
    "CDC",
    "CDC",
    "A",
    "PPS",
    "PPS",
    "PPS",
    "B",
    "E",
    "D"
   ],
   [
    "F",
    "A",
    "D",
    "GER",
    "GER",
    "GER",
    "",
    "C",
    "B"
   ],
   [
    "GER",
    "GER",
    "",
    "",
    "",
    "WS",
    "WS",
    "WS",
    "WS"
   ]
  ]
 },
 {
  "id": "i-biotech-b",
  "label": "I Biotech-B & BME",
  "semester": "I Sem · 2024-25",
  "venue": "IST 702",
  "times": [
   "9:00",
   "9:55",
   "10:50",
   "11:45",
   "12:35",
   "1:30",
   "2:25",
   "3:20",
   "4:15"
  ],
  "subjects": {
   "A": "Advanced Calculus & Complex Analysis",
   "B": "Chemistry",
   "D": "Programming for Problem Solving",
   "E": "Philosophy of Engineering",
   "CHE": "Chemistry Lab",
   "WS": "Civil & Mechanical Workshop",
   "PPS": "PPS Lab",
   "CDC": "General Aptitude",
   "NSS": "NSS",
   "GER": "German",
   "PCB": "PCB Lab",
   "C": "Cell Biology",
   "F": "Biochemistry",
   "YOGA": "Physical & Mental Health (Yoga)",
   "JAP": "Japanese"
  },
  "grid": [
   [
    "C",
    "YOGA",
    "YOGA",
    "F",
    "",
    "E",
    "E",
    "A",
    "B"
   ],
   [
    "CDC",
    "CDC",
    "C",
    "F",
    "",
    "",
    "B",
    "A",
    "D"
   ],
   [
    "WS",
    "WS",
    "WS",
    "WS",
    "",
    "D",
    "B",
    "E",
    "D"
   ],
   [
    "CHE",
    "CHE",
    "A",
    "C",
    "",
    "B",
    "",
    "JAP",
    "JAP"
   ],
   [
    "F",
    "CDC",
    "A",
    "JAP",
    "JAP",
    "",
    "",
    "PPS",
    "PPS"
   ]
  ]
 }
];
