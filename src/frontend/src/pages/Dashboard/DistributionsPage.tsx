import axios from "axios";
import React, { useState, useEffect, FormEvent } from "react";
import toast from "react-hot-toast";


interface Student {
  id: number;
  name: string;
  registrationNumber: string;
  score: number;
  selectedCombinations: { combinationName: string; school: string }[];
  level: string;
  assignedSchool?: string;
  allocatedCombination?: string;
  explanation?: string;
  totalMarks: number
}

interface School {
  name: string;
  level: string;
  status: string;
  capacity: number;
  combinations: string[];
}

const DistributionPage: React.FC = () => {
  const [distributedStudents, setDistributedStudents] = useState<Student[]>([]);
  const [isDistributing, setIsDistributing] = useState<boolean>(false);
  const [schools, setSchools] = useState<School[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getSchools = async () => {
    const response = await axios.get(
      `${(import.meta as any).env.VITE_CANISTER_ORIGIN}/schools`
    );
    const data = await response.data;
    console.log("responseJson", data);
    setSchools(data);
  };

  useEffect(() => {
    getSchools();
  }, []);

  const getStudents = async () => {
    const response = await axios.get(
      `${(import.meta as any).env.VITE_CANISTER_ORIGIN}/students`
    );
    const data = await response.data;
    console.log("responseJson", data);
    setStudents(data);
  };
  useEffect(() => {
    getStudents();
  }, []);

  const rankStudentPreferences = async (
    student: Student,
    schools: School[]
  ) => {
    const prompt = `
Distribute the student to the appropriate school based on the following details:

- Name: ${student.name}
- Registration: ${student.registrationNumber}
- Marks: ${JSON.stringify(student.score)}
- Preferred Combinations: ${JSON.stringify(student.selectedCombinations)}
- Level: ${student.level}
-Total mars: ${student.totalMarks}
-level: ${student.level}

School Info: ${JSON.stringify(schools)}

Instructions:
- if ${student.level == "P-Level"
      } distribute students to O-Level without combination just according to the high marks and excellent school. do not consider more on course while distributing
  high total marks do not provide to him combination. only O-Level students are allowed to have combination
- If the student is at the P-Level, assign them to an O-Level school based on their total marks.
- If the student has marks less than 50, assign them to a Daily school.
- O-Level students should be assigned to schools based on their selected combinations and total marks.
- Prioritize assignment to Excellent schools when possible.
- If an O-Level student's preferred combination is not available, assign them to a school with a matching subject or the best available option.
- O-Level students should sent to A'Level school if the total marks is less than 30 assigned school should be to stay
- Reason should clear explain pointer as talking to the student

Return JSON:
{
  "studentName": "${student.name}",
  "registration": "${student.registrationNumber}",
  "totalMarks: "${student.totalMarks}",
  "allocatedSchool": "School A",
  "level: "${student.level}
  "allocatedCombination": "Physics, Chemistry, Mathematics (PCM)",
  "reason": "Assigned to Excellent school based on high total marks; preferred combination available."
}
`;

    try {
      const response = await axios.post(
        "https://api.cohere.ai/generate",
        {
          model: "command-r-plus-04-2024",
          prompt: prompt,
          max_tokens: 300,
          temperature: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${(import.meta as any).env.VITE_OPENAI_API_KEY
              }`,
          },
        }
      );

      console.log("API Response:", response.data.text);

      const jsonMatch = response.data.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const allocation = JSON.parse(jsonMatch[0]);
        console.log("Parsed allocation:", allocation);
        return allocation;
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error distributing student:", error);
      return {
        studentName: student.name,
        registration: student.registrationNumber,
        allocatedSchool: "Error in distribution",
        allocatedCombination: "N/A",
        reason: "An error occurred during distribution",
      };
    }
  };

  useEffect(() => {
    if (isDistributing) {
      const distributeStudents = async () => {
        try {
          const distributionPromises = students.map((student) =>
            //@ts-ignore
            rankStudentPreferences(student, schools)
          );
          const distributed = await Promise.all(distributionPromises);

          const updatedStudents = students.map((student, index) => ({
            ...student,
            assignedSchool: distributed[index].allocatedSchool,
            allocatedCombination: distributed[index].allocatedCombination,
            explanation: distributed[index].reason,
          }));
          //@ts-ignore
          setDistributedStudents(updatedStudents);
        } catch (error) {
          console.error("Error distributing students:", error);
        } finally {
          setIsDistributing(false);
        }
      };
      distributeStudents();
    }
  }, [isDistributing]);

  const handleDistributeClick = () => {
    setIsDistributing(true);
  };


  const handleSubmitDistribution = async () => {
    setIsLoading(true);
    try {

      const response = await axios.post(
        `${(import.meta as any).env.VITE_CANISTER_ORIGIN}/distribution`,
        distributedStudents
      );

      const data = await response.data;
      toast.success("Distribution Generated successfully");
      console.log("data", data);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error While Generating distribution");
      console.log(error);
      setIsLoading(false);
    }
  };


  console.log("distributed school", distributedStudents);

  return (
    <section className="w-full h-full text-gray-300 pt-8 px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">Student Distribution</h1>
        <div className="flex gap-4">
          <button
            onClick={handleDistributeClick}
            className="px-4 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors"
            disabled={isDistributing}
          >
            {isDistributing ? "Distributing..." : "Distribute Students"}
          </button>
          <button
            onClick={handleSubmitDistribution}
            className="px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition-colors"
          >
            {isLoading ? "save..." : "Save Distribution"}
          </button>
        </div>
      </div>

      <div className="mt-8">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-start">Student Name</th>
              <th className="px-4 py-2 text-start">Registration</th>
              <th className="px-4 py-2 text-start">Total Marks</th>
              <th className="px-4 py-2 text-start">Assigned School</th>
              <th className="px-4 py-2 text-start">Allocated Combination</th>
              <th className="px-4 py-2 text-start">Reason</th>
            </tr>
          </thead>
          <tbody>
            {distributedStudents.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center">
                  No students distributed yet.
                </td>
              </tr>
            ) : (
              distributedStudents.map((student, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.registrationNumber}</td>
                  <td className="px-4 py-2">
                    {student.totalMarks || "No match"}
                  </td>
                  <td className="px-4 py-2">
                    {student.assignedSchool || "No match"}
                  </td>
                  <td className="px-4 py-2">
                    {student.allocatedCombination || "N/A"}
                  </td>
                  <td className="px-4 py-2">{student.explanation || "N/A"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DistributionPage;
