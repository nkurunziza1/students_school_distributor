import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { motion, AnimatePresence } from "framer-motion";

const ResultsPage = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [showResults, setShowResults] = useState(false);

  const levels = ["P-LEVEL", "O-LEVEL", "A-LEVEL"];

  // Dummy data for courses, marks, and grades
  const dummyData = [
    { course: "Mathematics", marks: 75 },
    { course: "Science", marks: 80 },
    { course: "History", marks: 70 },
    { course: "English", marks: 85 },
  ];

  const totalMarks = dummyData.reduce((acc, curr) => acc + curr.marks, 0);
  const totalAverage = (totalMarks / (dummyData.length * 100)) * 100;

  const getGrade = (marks:any) => {
    if (marks >= 80) return "A";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
    if (marks >= 40) return "D";
    return "F";
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchText && selectedLevel) {
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  return (
    <main className="bg-radial-custom min-h-screen w-full max-w-[1440px] flex flex-col items-center px-5 pt-32 pb-10">
      <div className="text-center">
        <img
          src="/icons/assistantt-icon.svg"
          alt="General Advisor"
          className="w-24 h-24 object-cover mx-auto mb-4"
        />
        <h1 className="text-4xl text-white font-bold mb-2">General Advisor</h1>
        <p className="text-gray-300 mb-6">
          Enter your registration ID and select your level to view school assignments and results.
        </p>

        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <button 
              onClick={handleSearchClick}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent text-gray-600"
            >
              <CiSearch className="w-5 h-5" />
            </button>
            <input
              type="text"
              placeholder="Search by Registration ID"
              value={searchText}
              onChange={handleSearchChange}
              className="border border-purple-400 text-gray-300 rounded-l-lg pl-10 pr-3 py-2 w-72 focus:outline-none focus:ring-0 focus:ring-transparent bg-transparent"
            />
          </div>
          <select
            id="level"
            value={selectedLevel}
            onChange={handleLevelChange}
            className="ml-0 border-[2px] border-purple-800 rounded-r-lg px-3 py-2 bg-purple-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-700 w-36"
          >
            <option value="" disabled>Select Level</option>
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-white border rounded-lg shadow-lg p-5 mt-6 w-full max-w-lg"
          >
            <h2 className="text-xl font-bold mb-4">Results</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-b-2 border-gray-300 px-4 py-2 text-start">Course Name</th>
                  <th className="border-b-2 border-gray-300 px-4 py-2 text-start">Marks</th>
                  <th className="border-b-2 border-gray-300 px-4 py-2 text-start">Total Marks</th>
                  <th className="border-b-2 border-gray-300 px-4 py-2 text-start">Grade</th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="px-4 py-2">{item.course}</td>
                    <td className="px-4 py-2">{item.marks}</td>
                    <td className="px-4 py-2">100</td> {/* Total Marks for each course */}
                    <td className="px-4 py-2">{getGrade(item.marks)}</td> {/* Get grade based on marks */}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2 flex justify-between">
              <p className="font-bold">Total Marks: {totalMarks}</p>
              <p className="font-bold">Average: {totalAverage.toFixed(2)}%</p>
            </div>

            <p className="mt-4 text-gray-300 font-bold">
              Assigned School: <span className="font-normal">Remera Rukoma High School</span>
            </p>
            <p className="text-gray-300 font-bold">
              Section: <span className="font-normal">PCB</span>
            </p>

            <div className="mt-6 flex flex-col gap-4">
              <h1 className="text-gray-300">Explanation of Assignment</h1>
              <button className="bg-green-500 text-white px-4 py-2 rounded self-start">AI Response</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ResultsPage;
