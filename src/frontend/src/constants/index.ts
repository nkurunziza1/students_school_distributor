enum Status {
  EXCELLENT = "excellent",
  GOOD = "good",
  NORMAL = "normal",
  DAILY = "daily",
}

interface Student {
  id: string;
  name: string;
  score: [
    {
      course: string;
      marks: number;
    }
  ];
  preference: string;
  selectedCombinations?: Array<{
    combinationName: string;
    school: string;
  }>;
  level: "O-Level" | "P-Level";
  registrationNumber: string;
}

interface School {
  id: string;
  name: string;
  status: Status;
  level: "O-Level" | "A-Level";
  combinations?: string[];
  owner: string;
  capacity: number;
  availableSlots: number | { totalSlots: number; remainingSlots: number };
  otherSchoolDetails: any;
}

export const NavLinks = [
  {
    link: "/",
    label: "Home",
  },
  {
    link: "/results",
    label: "View Results",
  },
  {
    link: "/events",
    label: "Events",
  },
  {
    link: "/about",
    label: "About Us",
  },
  {
    link: "/dashboard",
    label: "dashboard",
  },
];

export const students = [
  {
    id: "1",
    name: "Alice Johnson",
    score: [
      { course: "Mathematics", marks: 85 },
      { course: "English", marks: 78 },
      { course: "Science", marks: 92 },
    ],
    level: "P-Level",
    registrationNumber: "P2023001",
    selectedCombinations: null
  },
  {
    id: "2",
    name: "Bob Smith",
    score: [
      { course: "Mathematics", marks: 92 },
      { course: "English", marks: 88 },
      { course: "Physics", marks: 95 },
      { course: "Chemistry", marks: 90 },
    ],
    level: "O-Level",
    registrationNumber: "O2023002",
    selectedCombinations: [
      { combinationName: "PCM", school: "Excellent High" },
      { combinationName: "PCB", school: "Good Sciences Academy" },
    ],
  },
  {
    id: "3",
    name: "Carol Davis",
    score: [
      { course: "Mathematics", marks: 78 },
      { course: "English", marks: 95 },
      { course: "Biology", marks: 88 },
      { course: "Chemistry", marks: 82 },
    ],
    level: "O-Level",
    registrationNumber: "O2023003",
    selectedCombinations: [
      { combinationName: "BCM", school: "Excellent High" },
      { combinationName: "MEG", school: "Normal College" },
    ],
    
  },
  {
    id: "4",
    name: "David Wilson",
    score: [
      { course: "Mathematics", marks: 98 },
      { course: "Physics", marks: 96 },
      { course: "Chemistry", marks: 94 },
    ],
    level: "P-Level",
    registrationNumber: "P2023004",
    selectedCombinations: null
  },
  {
    id: "5",
    name: "Eva Brown",
    score: [
      { course: "Biology", marks: 92 },
      { course: "Chemistry", marks: 88 },
      { course: "Mathematics", marks: 85 },
    ],
    level: "P-Level",
    registrationNumber: "P2023005",
    selectedCombinations: null
  },
];

export const schools = [
  {
    id: "S1",
    name: "Excellent High",
    status: Status.EXCELLENT,
    level: "A-Level",
    combinations: ["PCM", "BCM", "MEG"],
    owner: "2vxsx-fae",
    capacity: 1000,
    availableSlots: {
      PCM: { totalSlots: 300, remainingSlots: 150 },
      BCM: { totalSlots: 300, remainingSlots: 200 },
      MEG: { totalSlots: 400, remainingSlots: 300 },
    },
    otherSchoolDetails: [],
  },
  {
    id: "S2",
    name: "Good Sciences Academy",
    status: Status.GOOD,
    level: "O-Level",
    owner: "2vxsx-fae",
    capacity: 800,
    availableSlots: 500,
    otherSchoolDetails: [],
  },
  {
    id: "S3",
    name: "Normal College",
    status: Status.NORMAL,
    level: "A-Level",
    combinations: ["PCB", "MCB"],
    owner: "2vxsx-fae",
    capacity: 600,
    availableSlots: {
      PCB: { totalSlots: 300, remainingSlots: 250 },
      MCB: { totalSlots: 300, remainingSlots: 280 },
    },
    otherSchoolDetails: [],
  },
];


export const distributedStudents = [
  {
    id: "6b3c38a4-c684-41b4-937c-d3cf8c236832",
    name: "Shema Herve",
    score: [
      { course: "Chemistry", marks: 80 },
      { course: "Mathematics", marks: 90 },
      { course: "Physics", marks: 80 },
      { course: "Geography", marks: 60 },
      { course: "Kinyarwanda", marks: 70 },
      { course: "English", marks: 40 },
      { course: "Kiswahili", marks: 50 },
    ],
    preference: "",
    selectedCombinations: [
      { combinationName: "MCB", school: "GS Remera Rukoma" },
      { combinationName: "Culinary Arts", school: "Aparpe" },
      { combinationName: "TTC", school: "Kabwayi High School" },
    ],
    level: "O-Level",
    registrationNumber: "3000",
    totalMarks: 67.14,
    assignedSchool: "GS Remera Rukoma",
    allocatedCombination: "Mathematics, Chemistry, and Biology (MCB)",
    explanation:
      "You have been assigned to GS Remera Rukoma as it is an excellent school offering the MCB combination that you prefer. The school matches your O-Level status and accommodates your high total marks.",
  },
  {
    id: "5f4a7b29-2d4c-456a-9b5d-9ef8c2b8c5a7",
    name: "Irakoze Aime",
    score: [
      { course: "Biology", marks: 85 },
      { course: "Mathematics", marks: 95 },
      { course: "Physics", marks: 88 },
      { course: "Geography", marks: 75 },
      { course: "Kinyarwanda", marks: 65 },
      { course: "English", marks: 55 },
      { course: "Kiswahili", marks: 45 },
    ],
    preference: "",
    selectedCombinations: [
      { combinationName: "PCM", school: "GS Nyamirambo" },
      { combinationName: "Computer Science", school: "Saint Joseph" },
      { combinationName: "TTC", school: "Ecole des Sciences Kabgayi" },
    ],
    level: "O-Level",
    registrationNumber: "3100",
    totalMarks: 72.85,
    assignedSchool: "GS Nyamirambo",
    allocatedCombination: "Physics, Chemistry, and Mathematics (PCM)",
    explanation:
      "You have been assigned to GS Nyamirambo due to your excellent performance in sciences, aligning with your preference for the PCM combination.",
  },
  {
    id: "af3d8f4c-e5b9-4f44-b4d7-1cbe47b4a8bb",
    name: "Uwase Sandrine",
    score: [
      { course: "History", marks: 78 },
      { course: "Mathematics", marks: 82 },
      { course: "Chemistry", marks: 65 },
      { course: "English", marks: 88 },
      { course: "Kiswahili", marks: 54 },
      { course: "Kinyarwanda", marks: 70 },
    ],
    preference: "",
    selectedCombinations: [
      { combinationName: "MCB", school: "GS Kagugu" },
      { combinationName: "History and Geography", school: "GS Kabuga" },
      { combinationName: "Computer Science", school: "Saint Patrick School" },
    ],
    level: "O-Level",
    registrationNumber: "3200",
    totalMarks: 71.17,
    assignedSchool: "GS Kagugu",
    allocatedCombination: "Mathematics, Chemistry, and Biology (MCB)",
    explanation:
      "Based on your total marks and preference, you have been assigned to GS Kagugu, which is recognized for offering the MCB combination.",
  },
  {
    id: "7cb3e6d9-bb1f-4c8f-a571-cb5b6f9e5b3f",
    name: "Ndayisaba Eric",
    score: [
      { course: "Chemistry", marks: 70 },
      { course: "Mathematics", marks: 85 },
      { course: "Physics", marks: 65 },
      { course: "English", marks: 78 },
      { course: "Kinyarwanda", marks: 55 },
    ],
    preference: "",
    selectedCombinations: [
      { combinationName: "PCM", school: "GS Saint Ignace" },
      { combinationName: "TTC", school: "Kigali Technical School" },
      { combinationName: "MCE", school: "GS Saint Marie Reine" },
    ],
    level: "O-Level",
    registrationNumber: "3300",
    totalMarks: 70.6,
    assignedSchool: "GS Saint Ignace",
    allocatedCombination: "Physics, Chemistry, and Mathematics (PCM)",
    explanation:
      "You have been assigned to GS Saint Ignace, a school known for strong PCM programs, aligning with your marks and combination preferences.",
  },
  {
    id: "9bdf29d5-29d9-4bcd-96a7-9f2fcb9b72cd",
    name: "Mukamana Jeannette",
    score: [
      { course: "English", marks: 90 },
      { course: "Mathematics", marks: 85 },
      { course: "Geography", marks: 78 },
      { course: "History", marks: 88 },
      { course: "Kiswahili", marks: 68 },
    ],
    preference: "",
    selectedCombinations: [
      { combinationName: "HEG", school: "GS Gashora" },
      { combinationName: "Literature", school: "GS Kigali" },
      { combinationName: "TTC", school: "GS Nyundo" },
    ],
    level: "O-Level",
    registrationNumber: "3400",
    totalMarks: 80.2,
    assignedSchool: "GS Gashora",
    allocatedCombination: "History, Economics, and Geography (HEG)",
    explanation:
      "Your assignment to GS Gashora reflects your strong performance in social sciences, aligning with your preference for the HEG combination.",
  },
];
