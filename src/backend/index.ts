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
  totalMarks: number;
};

type Distribution = {
  id: string;
  level: string;
  name: string;
  registrationNumber: string;
  assignedSchool: string;
  allocatedCombination?: Array<{
    combinationName: string;
    school: string;
  }>;
  explanation: string;
  totalMarks: number;
};

const schoolStorage = StableBTreeMap<string, School>(0);
const studentStorage = StableBTreeMap<string, Student>(1);
const GeneratedDistributed = StableBTreeMap<string, Distribution>(6);

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
    const totalObtainedMarks = score.reduce(
      (total: number, item: { course: string; marks: number }) => {
        return total + item.marks;
      },
      0
    );

    const maxPossibleMarks = score.length * 100;
    const totalMarks = (totalObtainedMarks / maxPossibleMarks) * 100;

    const student: Student = {
      id: uuidv4(),
      name,
      score,
      preference,
      selectedCombinations: level === "O-Level" ? selectedCombinations : null,
      level,
      registrationNumber,
      totalMarks: parseFloat(totalMarks.toFixed(2)),
    };
    studentStorage.insert(student.id, student);
    res.json(student);
  });

  // Endpoint for registered students
  app.get("/students", (req, res) => {
    const studentsList = studentStorage.values();
    res.json(studentsList);
  });

  app.post("/distribution", (req, res) => {
    const distributions = req.body;

    if (!Array.isArray(distributions)) {
      return res
        .status(400)
        .json({ message: "Expected an array of distributions" });
    }

    const insertedDistributions = distributions.map((distribution) => {
      const {
        registrationNumber,
        assignedSchool,
        name,
        allocatedCombination,
        explanation,
        level,
        totalMarks,
      } = distribution;

      const newDistribution: Distribution = {
        id: uuidv4(),
        registrationNumber,
        assignedSchool,
        name,
        allocatedCombination,
        explanation,
        totalMarks,
        level
      };

      GeneratedDistributed.insert(newDistribution.id, newDistribution);
      return newDistribution;
    });

    res.json(insertedDistributions);
  });

  app.get("/distribution", (req, res) => {
    const distributionList = GeneratedDistributed.values();
    res.json(distributionList);
  });

  app.use(express.static("/dist"));
  return app.listen();
});
