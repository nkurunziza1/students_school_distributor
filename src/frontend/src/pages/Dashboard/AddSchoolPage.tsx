import React, { useState, FormEvent, ChangeEvent } from "react";
import { FaTrashAlt } from "react-icons/fa";

interface SchoolData {
  name: string;
  status: string;
  level: string;
  combinations: string[];
  capacity: number | "";
}

const AddSchoolPage: React.FC = () => {
  const [schoolData, setSchoolData] = useState<SchoolData>({
    name: "",
    status: "Excellent",
    level: "A-Level",
    combinations: [],
    capacity: "",
  });

  const [combinationInput, setCombinationInput] = useState<string>("");

  // Handle field changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSchoolData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCombination = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (combinationInput.trim() !== "") {
      setSchoolData((prev) => ({
        ...prev,
        combinations: [...prev.combinations, combinationInput.trim()],
      }));
      setCombinationInput("");
    }
  };

  const handleRemoveCombination = (indexToRemove: number) => {
    setSchoolData((prev) => ({
      ...prev,
      combinations: prev.combinations.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(schoolData);
  };

  return (
    <section className="w-full max-w-4xl mx-auto my-10 p-8 border border-white text-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New School</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">School Name</label>
          <input
            type="text"
            name="name"
            value={schoolData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter school name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={schoolData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="Excellent">Excellent</option>
            <option value="Very Good">Very Good</option>
            <option value="Good">Good</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Level</label>
          <select
            name="level"
            value={schoolData.level}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="A-Level">A-Level</option>
            <option value="O-Level">O-Level</option>
          </select>
        </div>

        {schoolData.level === "A-Level" && (
          <div>
            <label className="block text-sm font-medium mb-1">
              Combinations
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={combinationInput}
                onChange={(e) => setCombinationInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Add combination (e.g., MCB)"
              />
              <button
                onClick={handleAddCombination}
                className="px-4 py-2 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors"
              >
                Add
              </button>
            </div>
            <div>
              {schoolData.combinations.length > 0 && (
                <ul className="grid grid-cols-2 gap-2">
                  {schoolData.combinations.map((combination, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center p-3 border border-gray-400"
                    >
                      <span>{combination}</span>
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

        <div>
          <label className="block text-sm font-medium mb-1">Capacity</label>
          <input
            type="number"
            name="capacity"
            value={schoolData.capacity}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter capacity"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 transition-colors"
        >
          Save School
        </button>
      </form>
    </section>
  );
};

export default AddSchoolPage;
