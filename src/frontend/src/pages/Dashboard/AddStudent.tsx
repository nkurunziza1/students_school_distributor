import React, { useState, FormEvent, ChangeEvent } from "react";
import { FaTrashAlt } from "react-icons/fa";

interface Score {
  course: string;
  marks: number;
}

interface Combination {
  combinationName: string;
  school: string;
}

interface AddStudentData {
  name: string;
  score: Score[];
  preference: string;
  level: string;
  registrationNumber: string;
  selectedCombinations: Combination[]; // Updated to an array of objects
}

const AddStudentPage: React.FC = () => {
  const [studentData, setStudentData] = useState<AddStudentData>({
    name: "",
    score: [],
    preference: "",
    level: "O-Level", // default is O-Level
    registrationNumber: "",
    selectedCombinations: [], // Now an array of Combination objects
  });

  const [scoreInput, setScoreInput] = useState<{
    course: string;
    marks: number;
  }>({
    course: "",
    marks: 0,
  });

  const [combinationNameInput, setCombinationNameInput] = useState<string>("");
  const [schoolInput, setSchoolInput] = useState<string>("");

  // Handle field changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    // Clear combinations if switching from A-Level to O-Level
    if (name === "level" && value === "O-Level") {
      setStudentData((prev) => ({
        ...prev,
        [name]: value,
        selectedCombinations: [], // clear combinations for O-Level
      }));
    } else {
      setStudentData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle adding score input
  const handleAddScore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (scoreInput.course.trim() !== "" && scoreInput.marks > 0) {
      setStudentData((prev) => ({
        ...prev,
        score: [...prev.score, { ...scoreInput }],
      }));
      setScoreInput({ course: "", marks: 0 }); // Clear input after adding
    }
  };

  // Handle removing score
  const handleRemoveScore = (indexToRemove: number) => {
    setStudentData((prev) => ({
      ...prev,
      score: prev.score.filter((_, index) => index !== indexToRemove),
    }));
  };

  // Handle adding combination inputs
  const handleAddCombination = () => {
    if (combinationNameInput.trim() !== "" && schoolInput.trim() !== "") {
      const newCombination = {
        combinationName: combinationNameInput.trim(),
        school: schoolInput.trim(),
      };
      setStudentData((prev) => ({
        ...prev,
        selectedCombinations: [...prev.selectedCombinations, newCombination],
      }));
      setCombinationNameInput(""); // Clear input after adding
      setSchoolInput(""); // Clear school input after adding
    }
  };

  // Handle removing combination
  const handleRemoveCombination = (indexToRemove: number) => {
    setStudentData((prev) => ({
      ...prev,
      selectedCombinations: prev.selectedCombinations.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(studentData);
  };

  return (
    <section className="w-full max-w-4xl mx-auto my-10 p-8 border border-white text-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Student</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Student Name</label>
          <input
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter student name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Level</label>
          <select
            name="level"
            value={studentData.level}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="O-Level">O-Level</option>
            <option value="A-Level">A-Level</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Registration Number
          </label>
          <input
            type="text"
            name="registrationNumber"
            value={studentData.registrationNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter registration number"
          />
        </div>

        {/* Dynamic Score Inputs */}
        <div>
          <label className="block text-sm font-medium mb-1">Scores</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={scoreInput.course}
              onChange={(e) =>
                setScoreInput({ ...scoreInput, course: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Course (e.g., Mathematics)"
            />
            <input
              type="number"
              value={scoreInput.marks}
              onChange={(e) =>
                setScoreInput({ ...scoreInput, marks: Number(e.target.value) })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Marks"
            />
            <button
              onClick={handleAddScore}
              className="px-4 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div>
            {studentData.score.length > 0 && (
              <ul className="grid grid-cols-1 gap-2">
                {studentData.score.map((score, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-3 border border-gray-400"
                  >
                    <span>
                      {score.course}: {score.marks}
                    </span>
                    <button
                      onClick={() => handleRemoveScore(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrashAlt />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Dynamic Combinations Inputs */}
        {studentData.level === "O-Level" && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Combinations
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={combinationNameInput}
                onChange={(e) => setCombinationNameInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Combination Name (e.g., MCB)"
              />
              <input
                type="text"
                value={schoolInput}
                onChange={(e) => setSchoolInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="School (e.g., High School)"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddCombination();
                }}
                className="px-4 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div>
              {studentData.selectedCombinations.length > 0 && (
                <ul className="grid grid-cols-1 gap-2">
                  {studentData.selectedCombinations.map((combination, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center p-3 border border-gray-400"
                    >
                      <span>
                        {combination.combinationName} ({combination.school})
                      </span>
                      <button
                        onClick={() => handleRemoveCombination(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrashAlt />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default AddStudentPage;
