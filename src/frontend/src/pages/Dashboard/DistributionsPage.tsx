import React, { useState } from 'react';

interface Student {
  id: number;
  name: string;
  marks: number;
  preferences: [string, string];
  assignedSchool?: string; 
}

interface School {
  name: string;
  level: string;
  status: string;
  capacity: number;
  combinations: string[];
}

const students: Student[] = [
  { id: 1, name: "John Doe", marks: 85, preferences: ["A-Level", "Science"] },
  { id: 2, name: "Jane Smith", marks: 75, preferences: ["O-Level", "Arts"] },
  { id: 3, name: "Alice Brown", marks: 65, preferences: ["A-Level", "Maths"] },
];

const schools: School[] = [
  { name: "School A", level: "A-Level", status: "Excellent", capacity: 100, combinations: ["Science", "Maths"] },
  { name: "School B", level: "O-Level", status: "Good", capacity: 80, combinations: ["Arts"] },
];

const DistributionPage: React.FC = () => {
  const [distributedStudents, setDistributedStudents] = useState<Student[]>([]);
  
  const distributeStudentsToSchools = () => {
    const distribution = students.map((student) => {
      const preferredSchools = schools.filter(school => 
        school.level === student.preferences[0] &&
        school.combinations.includes(student.preferences[1])
      );
      
      const assignedSchool = preferredSchools.length > 0 ? preferredSchools[0] : null;
      return {
        ...student,
        assignedSchool: assignedSchool ? assignedSchool.name : "No match",
      };
    });

    setDistributedStudents(distribution);
  };

  const finalizeDistribution = () => {
    console.log("Finalized distribution:", distributedStudents);
  };

  return (
    <section className="w-full h-full text-gray-300 pt-8 px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">Student Distribution</h1>
        
        <div className="flex gap-4">
          <button
            onClick={distributeStudentsToSchools}
            className="px-4 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors"
          >
            Distribute Students
          </button>
          
          <button
            onClick={finalizeDistribution}
            className="px-4 py-2 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition-colors"
          >
            Finalize Distribution
          </button>
        </div>
      </div>

      <div className="mt-8">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-start">Student Name</th>
              <th className="px-4 py-2 text-start">Marks</th>
              <th className="px-4 py-2 text-start">Preferences</th>
              <th className="px-4 py-2 text-start">Assigned School</th>
            </tr>
          </thead>
          <tbody>
            {distributedStudents.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center">No students distributed yet.</td>
              </tr>
            ) : (
              distributedStudents.map((student, index) => (
                <tr key={index} className="border-t border-gray-300">
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.marks}</td>
                  <td className="px-4 py-2">{student.preferences.join(", ")}</td>
                  <td className="px-4 py-2">{student.assignedSchool || "No match"}</td>
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
