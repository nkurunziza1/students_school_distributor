import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const avatars = [
  { alt: 'User 1', src: 'https://randomuser.me/api/portraits/men/1.jpg', school: 'Harvard', marks: 85, age: 20 },
  { alt: 'User 2', src: 'https://randomuser.me/api/portraits/women/2.jpg', school: 'MIT', marks: 90, age: 22 },
  { alt: 'User 3', src: 'https://randomuser.me/api/portraits/men/3.jpg', school: 'Stanford', marks: 75, age: 23 },
  { alt: 'User 4', src: 'https://randomuser.me/api/portraits/women/4.jpg', school: 'Harvard', marks: 88, age: 21 },
  { alt: 'User 5', src: 'https://randomuser.me/api/portraits/men/5.jpg', school: 'MIT', marks: 95, age: 19 },
];

const maxAvatars = 3;

const AllStudents = () => {
  const [search, setSearch] = useState({ keyword: "", school: "", marks: "", age: "" });
  const surplus = avatars.length - maxAvatars;

  const filteredStudents = avatars.filter((avatar) => {
    const byKeyword =
      search.keyword === "" ||
      avatar.alt.toLowerCase().includes(search.keyword.toLowerCase()) ||
      avatar.school.toLowerCase().includes(search.keyword.toLowerCase());
    const bySchool = search.school === "" || avatar.school === search.school;
    const byMarks = search.marks === "" || avatar.marks >= parseInt(search.marks);
    const byAge = search.age === "" || avatar.age >= parseInt(search.age);
    return byKeyword && bySchool && byMarks && byAge;
  });

  return (
    <section className="w-full h-full text-white pt-8 px-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 w-[50%]">
          <h1 className="text-lg font-bold">All Students:</h1>
          <div className="flex -space-x-3">
            {avatars.slice(0, maxAvatars).map((avatar, index) => (
              <img
                key={index}
                src={avatar.src}
                alt={avatar.alt}
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
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
              onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          {/* School Filter */}
          <select
            className="px-3 py-2 bg-gray-700 text-white border border-gray-500 rounded-md text-sm w-32"
            value={search.school}
            onChange={(e) => setSearch({ ...search, school: e.target.value })}
          >
            <option value="">School</option>
            <option value="Harvard">Harvard</option>
            <option value="MIT">MIT</option>
            <option value="Stanford">Stanford</option>
          </select>

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

          {/* Age Filter */}
          <select
            className="px-3 py-2 bg-gray-700 text-white border border-gray-500 rounded-md text-sm w-32"
            value={search.age}
            onChange={(e) => setSearch({ ...search, age: e.target.value })}
          >
            <option value="">Age {`>=`}</option>
            <option value="20">20</option>
            <option value="22">22</option>
            <option value="24">24</option>
          </select>
        </div>
      </div>

      <div className="mt-8">
        <table className="min-w-full table-auto bg-gray-800 text-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-start">Avatar</th>
              <th className="px-4 py-2 text-start">Name</th>
              <th className="px-4 py-2 text-start">School</th>
              <th className="px-4 py-2 text-start">Marks</th>
              <th className="px-4 py-2 text-start">Age</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="px-4 py-2">
                  <img src={student.src} alt={student.alt} className="w-10 h-10 rounded-full object-cover" />
                </td>
                <td className="px-4 py-2">{student.alt}</td>
                <td className="px-4 py-2">{student.school}</td>
                <td className="px-4 py-2">{student.marks}</td>
                <td className="px-4 py-2">{student.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllStudents;
