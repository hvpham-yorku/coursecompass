import React from "react";
import "../styles/CourseSearch.css";

interface Props {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  department: string;
  setDepartment: (value: string) => void;
  level: string;
  setLevel: (value: string) => void;
  credit: string;
  setCredit: (value: string) => void;
  uniqueDepartments: string[];
  uniqueLevels: string[];
  uniqueCredits: string[]; 
  handleSearchClick: () => void;
}

const SearchFilters: React.FC<Props> = ({
  searchTerm, setSearchTerm,
  department, setDepartment,
  level, setLevel,
  credit, setCredit,
  uniqueDepartments, uniqueLevels, uniqueCredits,
  handleSearchClick
}) => {
  return (
    <div className="search-container">
      <h1>Course Compass</h1>
      <div className="filters">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Enter course name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Department Filter */}
        <select className="dropdown" value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">All Departments</option>
          {uniqueDepartments.map(dept => dept && (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        {/* Level Filter */}
        <select className="dropdown" value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="">All Levels</option>
          {uniqueLevels.map(level => level && (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>

        {/* Credit Filter */}
        <select className="dropdown" value={credit} onChange={(e) => setCredit(e.target.value)}>
          <option value="">All Credits</option>
          {uniqueCredits.map(creditValue => creditValue && (
            <option key={creditValue} value={creditValue}>{creditValue}</option>
          ))}
        </select>

        {/* Search Button */}
        <button onClick={handleSearchClick} className="search-button">Search</button>
      </div>
    </div>
  );
};

export default SearchFilters;
