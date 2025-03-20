import { useEffect, useState } from "react";
import "./CourseSearch.css";
import "./CoursePage.css";

/* Defines the structure for a professor object */
interface Professor {
  [key: string]: string; 
}

/* Defines the structure for a Course object */
interface Course {
  _id: string; 
  course_Code: string; 
  course_Name: string; 
  description?: string; 
  credits?: string; 
  preRequisite?: string[]; 
  postRequisite?: string[]; 
  professors?: Professor; 
}

const CourseSearch: React.FC = () => {
  // State for storing fetched courses
  const [courses, setCourses] = useState<Course[]>([]);
  // State for storing the user's search input
  const [searchTerm, setSearchTerm] = useState<string>("");
  // State for storing the selected course details
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  // State for tracking the loading state
  const [loading, setLoading] = useState<boolean>(true);
  // State for storing error messages
  const [error, setError] = useState<string>("");
  // State for storing the selected department filter
  const [department, setDepartment] = useState<string>("");
  // State for storing the selected course level filter
  const [level, setLevel] = useState<string>("");
  // State for storing the filtered course list
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  // Fetches courses from the backend when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/courses");
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data: Course[] = await response.json();

        // Handle the case when no courses are available
        if (data.length === 0) {
          setError("No courses available.");
          setLoading(false);
          return;
        }

        setCourses(data); // Save fetched courses
        setFilteredCourses(data); // Initialize filtered courses
        setLoading(false); // Set loading to false after fetching
      } catch (err) {
        setError(`Error fetching courses: ${(err as Error).message}`);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Extracts department code from the course code
  const getDepartment = (courseCode: string): string => {
    return courseCode.split(" ")[0]; // Splits the code and returns the department part
  };

  // Extracts course level from the course code
  const getLevel = (courseCode: string): string => {
    const match = courseCode.match(/\d{4}/); // Extracts four-digit course level
    return match ? match[0][0] + "000" : ""; // Returns the first digit followed by "000" (e.g., "1000")
  };

  // Handles the search and filtering logic when the search button is clicked
  const handleSearchClick = () => {
    let results = courses;

    // Filters courses based on search term
    if (searchTerm.trim()) {
      const searchNormalized = searchTerm.toLowerCase().trim();
      results = results.filter(course =>
        course.course_Code.toLowerCase().includes(searchNormalized) ||
        (course.course_Name && course.course_Name.toLowerCase().includes(searchNormalized))
      );
    }

    // Filters courses based on selected department
    if (department) {
      results = results.filter(course => getDepartment(course.course_Code) === department);
    }

    // Filters courses based on selected level
    if (level) {
      results = results.filter(course => getLevel(course.course_Code) === level);
    }

    setFilteredCourses(results); // Updates the filtered courses state
    setSelectedCourse(null); // Resets the selected course
  };

  // Handles selecting or deselecting a course
  const handleCourseClick = (course: Course) => {
    setSelectedCourse(prev => (prev?._id === course._id ? null : course)); // Toggles selection
  };

  // Handles clicking on prerequisite courses to show their details
  const handlePrerequisiteClick = (courseCode: string) => {
    const foundCourse = courses.find(course => course.course_Code === courseCode);
    if (foundCourse) {
      setSelectedCourse(foundCourse); // Updates selected course
    }
  };

  // Gets unique department values from courses
  const uniqueDepartments = Array.from(new Set(courses.map(course => getDepartment(course.course_Code))));
  // Gets unique course levels from courses
  const uniqueLevels = Array.from(new Set(courses.map(course => getLevel(course.course_Code))));

  return (
    <div className="course-container">
      {/* Left Panel: Search & Filters */}
      <div className="search-container">
        <h1>Course Compass</h1>
        <div className="filters">
          {/* Search input */}
          <input
            type="text"
            placeholder="Enter course name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Dropdown for department selection */}
          <select className="dropdown" value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option value="">All Departments</option>
            {uniqueDepartments.map(dept => dept && (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          {/* Dropdown for course level selection */}
          <select className="dropdown" value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="">All Levels</option>
            {uniqueLevels.map(level => level && (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>

          {/* Search button */}
          <button onClick={handleSearchClick} className="search-button">Search</button>
        </div>
      </div>

      {/* Right Panel: Course List & Details */}
      <div className="course-details">
        {loading ? (
          <p>Loading courses...</p> // Displays loading message while fetching
        ) : error ? (
          <p>{error}</p> // Displays error message if fetching fails
        ) : !selectedCourse && filteredCourses.length > 0 ? (
          <div className="course-grid">
            {/* Displays list of filtered courses */}
            {filteredCourses.map((course) => (
              <div key={course._id} className="course-card" onClick={() => handleCourseClick(course)}>
                <div className="course-header">
                  <span className="course-title">
                    {course.course_Code}: {course.course_Name} ({course.credits}.0)
                  </span>
                </div>
                <p className="course-description">
                  {course.description ? `${course.description.substring(0, 80)}...` : "No description available."}
                </p>
              </div>
            ))}
          </div>
        ) : !selectedCourse && filteredCourses.length === 0 ? (
          <p>No courses found.</p> // Message when no matching courses are found
        ) : null}

        {/* Displays selected course details */}
        {selectedCourse && (
          <div className="selected-course">
            <h2>{selectedCourse.course_Code}: {selectedCourse.course_Name} ({selectedCourse.credits}.0)</h2>
            <p>{selectedCourse.description || "No description available."}</p>
            <hr />

            {/* Displays Prerequisites */}
            <div className="requisites-container">
              <div className="requisite">
                <p><strong>Prerequisites:</strong></p>
                <div className="course-box-container">
                  {selectedCourse.preRequisite && selectedCourse.preRequisite.length > 0 ? (
                    selectedCourse.preRequisite.map((item, index) => (
                      <div 
                        key={index} 
                        className="course-box"
                        onClick={() => handlePrerequisiteClick(item)}
                      >
                        {item}
                      </div>
                    ))
                  ) : <div className="course-box">None</div>}
                </div>
              </div>
              {/* Displays Postrequisites */}
              <div className="requisite">
                <p><strong>Postrequisites:</strong></p>
                <div className="course-box-container">
                  {selectedCourse.postRequisite && selectedCourse.postRequisite.length > 0 ? (
                    selectedCourse.postRequisite.map((item, index) => (
                      <div 
                        key={index} 
                        className="course-box"
                        onClick={() => handlePrerequisiteClick(item)}
                      >
                        {item}
                      </div>
                    ))
                  ) : <div className="course-box">None</div>}
                </div>
              </div>
            </div>
            <hr />
            {/* Button to return to search */}
            <button onClick={() => setSelectedCourse(null)} className="close-button">✖ Return To Search</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSearch;
