import { v4 as uuidv4 } from "uuid";
import { Server, StableBTreeMap, ic, Principal, Result } from "azle";
import express from "express";
import cors from "cors";

enum Status {
  EXCELLENT = "excellent",
  GOOD = "good",
  NORMAL = "normal",
  DAILY = "daily",
}

type School = {
  id: string;
  name: string;
  status: Status;
  level: "O-Level" | "A-Level";
  combinations?: string[];
  owner: string;
  capacity: number;
  availableSlots:
    | number
    | Record<string, { totalSlots: number; remainingSlots: number }>;
  otherSchoolDetails: any;
};

type Student = {
  id: string;
  name: string;
  score: {
    course: string;
    marks: number;
  };
  preference: string[];
  selectedCombinations?: Array<{
    combinationName: string;
    school: string;
  }>;
  level: "O-Level" | "P-Level";
  registrationNumber: string;
};

const schoolStorage = StableBTreeMap<string, School>(0);
const studentStorage = StableBTreeMap<string, Student>(1);
const GeneratedDistributed = StableBTreeMap<string, string>(6);

export default Server(() => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  //School endpoints
  //<-- Create a new school -->

  app.post("/school", (req, res) => {
    const {
      name,
      level,
      combinations,
      capacity,
      status = Status.EXCELLENT,
    } = req.body;

    // Check if the user is logged in
    if (!ic.caller().toText()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (level === "A-Level" && !combinations) {
      return res
        .status(400)
        .json({ message: "Advanced level schools require combinations" });
    }

    try {
      let availableSlots: {
        [x: string]: {
          totalSlots: number;
          remainingSlots: number;
        };
      };

      //For A-level
      if (level === "A-Level") {
        availableSlots = {};
        combinations.forEach((combination: string) => {
          availableSlots[combination] = {
            totalSlots: Math.floor(capacity / combinations.length),
            remainingSlots: Math.floor(capacity / combinations.length),
          };
        });
      } else {
        // For O-Level, use overall capacity
        availableSlots = capacity;
      }

      const school: School = {
        id: uuidv4(),
        name,
        status,
        level,
        combinations: level === "A-Level" ? combinations : null,
        owner: ic.caller().toText(),
        capacity,
        availableSlots,
        otherSchoolDetails: [],
      };

      schoolStorage.insert(school.id, school);
      res.json(school);
    } catch (error) {
      console.error("Error creating school:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  //<-- Get registered schools -->

  app.get("/schools", (req, res) => {
    const schoolList = schoolStorage.values();
    res.json(schoolList);
  });

  // Endpoints for student
  //<-- Register a student -->

  app.post("/student", (req, res) => {
    const {
      name,
      score,
      preference,
      registrationNumber,
      selectedCombinations,
      level,
    } = req.body;

    if (level === "O-Level" && !selectedCombinations) {
      return res
        .status(400)
        .json({ message: "O-Level students must choose a combination" });
    }

    const student: Student = {
      id: uuidv4(),
      name,
      score,
      preference,
      selectedCombinations: level === "O-Level" ? selectedCombinations : null,
      level,
      registrationNumber,
    };
    studentStorage.insert(student.id, student);
    res.json(student);
  });

  // Endpoint for registered students
  app.get("/students", (req, res) => {
    const studentsList = studentStorage.values();
    res.json(studentsList);
  });

  // Endpoint for distributing students to schools
  app.post("/distribute-students", (req, res) => {
    // Placeholder for AI-based distribution logic
    // Use students, schools, and their preferences/scores to perform the distribution
    // AI logic will assign students to schools based on score, preferences, and available slots
    res.json({
      message: "AI-based distribution logic will be implemented here",
    });
  });

  app.use(express.static("/dist"));
  return app.listen();
});
