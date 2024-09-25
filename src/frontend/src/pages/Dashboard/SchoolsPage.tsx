import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { schools } from '../../constants';

const SchoolsPage = () => {
  const [search, setSearch] = useState({ keyword: "", level: "", status: "", capacity: "" });
  const maxSchoolsToShow = 3;

  const filteredSchools = schools.filter((school) => {
    const byKeyword = search.keyword === "" || school.name.toLowerCase().includes(search.keyword.toLowerCase());
    const byLevel = search.level === "" || school.level === search.level;
    const byStatus = search.status === "" || school.status === search.status;
    const byCapacity = search.capacity === "" || school.capacity >= parseInt(search.capacity);
    return byKeyword && byLevel && byStatus && byCapacity;
  });

  return (
    <section className="w-full h-full text-gray-300 pt-8 px-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 w-[50%]">
          <h1 className="text-lg font-bold">All Schools:</h1>
        </div>

        {/* Search Filters */}
        <div className="flex items-center gap-4">
          {/* General Search */}
          <div className="relative w-64">
            <input
              type="text"
              className="w-full px-4 py-2 pl-10 bg-transparent border border-gray-400 rounded-md text-sm"
              placeholder="Search..."
              value={search.keyword}
              onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-500" />
          </div>

          {/* Level Filter */}
          <select
            className="px-3 py-2 bg-transparent border border-gray-400 rounded-md text-sm w-32"
            value={search.level}
            onChange={(e) => setSearch({ ...search, level: e.target.value })}
          >
            <option value="">Level</option>
            <option value="A-Level">A-Level</option>
            <option value="O-Level">O-Level</option>
          </select>

          {/* Status Filter */}
          <select
            className="px-3 py-2 bg-transparent border border-gray-400 rounded-md text-sm w-32"
            value={search.status}
            onChange={(e) => setSearch({ ...search, status: e.target.value })}
          >
            <option value="">Status</option>
            <option value="Excellent">Excellent</option>
            <option value="Very Good">Very Good</option>
            <option value="Good">Good</option>
          </select>

          {/* Capacity Filter */}
          <select
            className="px-3 py-2 bg-transparent border border-gray-400 rounded-md text-sm w-32"
            value={search.capacity}
            onChange={(e) => setSearch({ ...search, capacity: e.target.value })}
          >
            <option value="">Capacity {`>=`}</option>
            <option value="50">50</option>
            <option value="80">80</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>

      <div className="mt-8">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-start">Name</th>
              <th className="px-4 py-2 text-start">Status</th>
              <th className="px-4 py-2 text-start">Level</th>
              <th className="px-4 py-2 text-start">Combinations</th>
              <th className="px-4 py-2 text-start">Capacity</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchools.map((school, index) => (
              <tr key={index} className="border-t border-gray-300">
                <td className="px-4 py-2">{school.name}</td>
                <td className="px-4 py-2">{school.status}</td>
                <td className="px-4 py-2">{school.level}</td>
                <td className="px-4 py-2">{school.combinations.join(', ')}</td>
                <td className="px-4 py-2">{school.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SchoolsPage;
