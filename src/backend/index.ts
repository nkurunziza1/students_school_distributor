import { v4 as uuidv4 } from "uuid";
import { Server, StableBTreeMap, ic, Principal, Result } from "azle";
import express from "express";
import cors from "cors";

type Department = {
  id: string;
  name: string;
  universityId: string;
  hodId: string;
};

type University = {
  id: string;
  name: string;
  location: string;
  programs: string[];
  owner: string;
};

type Student = {
  id: string;
  name: string;
  universityId: string;
  programId: string;
  year: number;
};

type Teacher = {
  id: string;
  name: string;
  universityId: string;
  courses: string[];
};

type HOD = {
  id: string;
  name: string;
  universityId: string;
  departmentId: string;
};

type Program = {
  id: string;
  name: string;
  universityId: string;
  years: number;
  courses: string[];
};

const universities = StableBTreeMap<string, University>(0);
const students = StableBTreeMap<string, Student>(1);
const teachers = StableBTreeMap<string, Teacher>(2);
const hods = StableBTreeMap<string, HOD>(3);
const programs = StableBTreeMap<string, Program>(4);
const departments = StableBTreeMap<string, Department>(5);

export default Server(() => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.post("/universities", (req, res) => {
    const { name, location, programs } = req.body;
    const university: University = {
      id: uuidv4(),
      name,
      location,
      programs,
      owner: ic.caller().toText(),
    };
    universities.insert(university.id, university);
    res.json(university);
  });

  //get universities
  app.get("/universities", (req, res) => {
    try {
      const universitiesList = universities.values();
      res.json(universitiesList);
    } catch (error) {
      console.error("Error fetching universities:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Student Registration
  app.post("/students", (req, res) => {
    const { name, universityId, programId, year } = req.body;
    const student: Student = {
      id: uuidv4(),
      name,
      universityId,
      programId,
      year,
    };
    students.insert(student.id, student);
    res.json(student);
  });

  // Teacher Registration
  app.post("/teachers", (req, res) => {
    const { name, universityId, courses } = req.body;
    const teacher: Teacher = {
      id: uuidv4(),
      name,
      universityId,
      courses,
    };
    teachers.insert(teacher.id, teacher);
    res.json(teacher);
  });

  // HOD Registration
  app.post("/hods", (req, res) => {
    const { name, universityId, departmentId } = req.body;
    const hod: HOD = {
      id: uuidv4(),
      name,
      universityId,
      departmentId,
    };
    hods.insert(hod.id, hod);

    // Update department's HOD
    const departmentOpt = departments.get(departmentId);
    if ("Some" in departmentOpt) {
      const department = departmentOpt.Some;
      department.hodId = hod.id;
      departments.insert(departmentId, department);
    }

    res.json(hod);
  });

  app.get("/department-hod/:departmentId", (req, res) => {
    const departmentId = req.params.departmentId;
    const departmentOpt = departments.get(departmentId);
    if ("Some" in departmentOpt) {
      const hodId = departmentOpt.Some.hodId;
      const hodOpt = hods.get(hodId);
      if ("Some" in hodOpt) {
        res.json(hodOpt.Some);
      } else {
        res.status(404).send("HOD not found");
      }
    } else {
      res.status(404).send("Department not found");
    }
  });

  //Departments registrations
  app.post("/departments", (req, res) => {
    const { name, universityId } = req.body;
    const department: Department = {
      id: uuidv4(),
      name,
      universityId,
      hodId: "", // Will be set when HOD is assigned
    };
    departments.insert(department.id, department);

    // Update university's departments
    const universityOpt = universities.get(universityId);
    if ("Some" in universityOpt) {
      const university = universityOpt.Some;
      university.departments.push(department.id);
      universities.insert(universityId, university);
    }
    res.json(department);
  });

  // Program Creation (for universities)
  app.post("/programs", (req, res) => {
    const { name, departmentId, years, courses } = req.body;
    const program: Program = {
      id: uuidv4(),
      name,
      departmentId,
      years,
      courses,
    };
    programs.insert(program.id, program);
    res.json(program);
  });

  // Assign Course to Teacher (for HODs)
  app.post("/assign-course", (req, res) => {
    const { teacherId, courseId } = req.body;
    const teacherOpt = teachers.get(teacherId);
    if ("None" in teacherOpt) {
      res.status(404).send("Teacher not found");
    } else {
      const teacher = teacherOpt.Some;
      teacher.courses.push(courseId);
      teachers.insert(teacherId, teacher);
      res.json(teacher);
    }
  });

  // Get Students for a Course (for Teachers)
  app.get("/course-students/:courseId", (req, res) => {
    const courseId = req.params.courseId;
    const courseStudents = students.values().filter((student) => {
      const programOpt = programs.get(student.programId);
      return "Some" in programOpt && programOpt.Some.courses.includes(courseId);
    });
    res.json(courseStudents);
  });

  app.get("/university-departments/:universityId", (req, res) => {
    const universityId = req.params.universityId;
    const universityDepartments = departments
      .values()
      .filter((dept) => dept.universityId === universityId);
    res.json(universityDepartments);
  });

  app.use(express.static("/dist"));
  return app.listen();
});
