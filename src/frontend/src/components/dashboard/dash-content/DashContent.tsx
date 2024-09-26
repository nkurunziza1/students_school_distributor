import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";



const maxAvatars = 3;

interface Student {
  id: string;
  name: string;
  score: [{
    course: string;
    marks: number;
  }];
  preference: string;
  selectedCombinations?: Array<{
    combinationName: string;
    school: string;
  }>;
  level: "O-Level" | "P-Level";
  registrationNumber: string;
}

const AllStudents = () => {
  const [search, setSearch] = useState({
    keyword: "",
    school: "",
    marks: "",
    age: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [students, setStudents] = useState<Student[]>([]);
  const surplus = students.length - maxAvatars;

  const filteredStudents = students.filter((avatar) => {
    const byKeyword =
      search.keyword === "" ||
      avatar.level.toLowerCase().includes(search.keyword.toLowerCase()) ||
      avatar.name.toLowerCase().includes(search.keyword.toLowerCase());

    // const byMarks =
    //   search.marks === "" || avatar.score.marks >= parseInt(search.marks);
    return byKeyword;
  });

  const getStudents = async () => {
    setIsLoading(true);
    const response = await axios.get(
      `${(import.meta as any).env.VITE_CANISTER_ORIGIN}/students`
    );
    const data = await response.data;
    console.log("responseJson", data);
    setIsLoading(false);
    setStudents(data);
  };
  useEffect(() => {
    getStudents();
  }, []);

  return (
    <section className="w-full h-full text-white pt-8 px-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 w-[50%]">
          <h1 className="text-lg font-bold">All Students:</h1>
          <div className="flex -space-x-3">
            {students.slice(0, maxAvatars).map((avatar, index) => (
              <p className="text-4xl">{avatar.name[0]}</p>
            ))}
            {surplus > 0 && (
              <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-white bg-gray-400 text-white text-sm font-medium">
                +{surplus}
              </div>
            )}
          </div>
        </div>

        {/* Search Filters */}
        <div className="flex items-center gap-4">
          {/* General Search */}
          <div className="relative w-64">
            <input
              type="text"
              className="w-full px-4 py-2 pl-10 bg-gray-700 text-white border border-gray-500 rounded-md text-sm"
              placeholder="Search..."
              value={search.keyword}
              onChange={(e) =>
                setSearch({ ...search, keyword: e.target.value })
              }
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          {/* Marks Filter */}
          <select
            className="px-3 py-2 bg-gray-700 text-white border border-gray-500 rounded-md text-sm w-32"
            value={search.marks}
            onChange={(e) => setSearch({ ...search, marks: e.target.value })}
          >
            <option value="">Marks {`>=`}</option>
            <option value="70">70</option>
            <option value="80">80</option>
            <option value="90">90</option>
          </select>

          {/* prefer Filter */}

        </div>
      </div>

      <div className="mt-8">
        <table className="min-w-full table-auto bg-gray-800 text-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-start">Profile</th>
              <th className="px-4 py-2 text-start">Name</th>
              <th className="px-4 py-2 text-start">Chosen combination</th>
              <th className="px-4 py-2 text-start">Marks</th>
              <th className="px-4 py-2 text-start">Student Registration No</th>
              <th className="px-4 py-2 text-start">level</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="px-4 py-2">
                  <p className="text-4xl">{student.name[0]}</p>
                </td>
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.preference.length > 0 ? student.preference : student.selectedCombinations?.map((item, index) => (
                  <div key={index}>
                    {item.combinationName} ({item.school})
                  </div>
                ))}</td>
                <td className="px-4 py-2">{student.score.map((item) => (
                  <div key={index}>
                    {item.course} ({item.marks}%)
                  </div>
                ))}</td>
                <td className="px-4 py-2">{student.registrationNumber}</td>
                <td className="px-4 py-2">{student.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllStudents;
