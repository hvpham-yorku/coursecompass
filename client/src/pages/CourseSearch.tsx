import { useEffect, useState } from "react";
import "./CourseSearch.css";
import "./CoursePage.css";

/* 
  Defines the structure for a professor object, 
  where each key represents a professor's name with a string value.
*/
interface Professor {
  [key: string]: string;
}

/* 
  Defines the structure for a Course object, ensuring type safety.
*/
interface Course {
  _id: string;
  course_Code: string;
  course_Name: string;
  description?: string;
  credits?: string;
  preRequisite?: string;
  postRequisite?: string;
  professors?: Professor;
}

const CourseSearch: React.FC = () => {
  /* State variables for course data and search functionality */
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);

  /* Fetches courses from the backend on component mount */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/courses");
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data: Course[] = await response.json();

        if (data.length === 0) {
          setError("No courses available.");
          setLoading(false);
          return;
        }

        setCourses(data);
        setFilteredCourses(data);
        setLoading(false);
      } catch (err) {
        setError(`Error fetching courses: ${(err as Error).message}`);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  /* Extracts department from course name (first word) */
  const getDepartment = (courseName: string): string => {
    return courseName.split(" ")[0];
  };

  /* Extracts level from course name (e.g., EECS 3311 -> 3000) */
  const getLevel = (courseName: string): string => {
    const match = courseName.match(/\d{4}/);
    return match ? match[0][0] + "000" : "";
  };

  /* Filters courses based on search term, department, and level */
  const handleSearchClick = () => {
    let results = courses;

    if (searchTerm.trim()) {
      const searchNormalized = searchTerm.toLowerCase().trim();
      results = results.filter(course =>
        course.course_Name.toLowerCase().includes(searchNormalized)
      );
    }

    if (department) {
      results = results.filter(course => getDepartment(course.course_Name) === department);
    }

    if (level) {
      results = results.filter(course => getLevel(course.course_Name) === level);
    }

    setFilteredCourses(results);
    setSelectedCourse(null); // Reset selected course
  };

  /* Toggles selection of a course */
  const handleCourseClick = (course: Course) => {
    setSelectedCourse(prev => (prev?._id === course._id ? null : course));
  };

  /* Extracts unique departments and levels from available courses */
  const uniqueDepartments = Array.from(new Set(courses.map(course => getDepartment(course.course_Name))));
  const uniqueLevels = Array.from(new Set(courses.map(course => getLevel(course.course_Name))));

  return (
    <div className="course-container">
      {/* Left Panel: Search & Filters */}
      <div className="search-container">
        <h1>Course Compass</h1>
        <div className="filters">
          {/* Search Input Field */}
          <input
            type="text"
            placeholder="Enter course name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Department Dropdown */}
          <select
            className="dropdown"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="">All Departments</option>
            {uniqueDepartments.map(dept => dept && (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          {/* Search Button */}
          <button onClick={handleSearchClick} className="search-button">
            Search
          </button>
        </div>
      </div>

      {/* Right Panel: Course List & Details */}
      <div className="course-details">
        {/* Display loading state, error, or courses */}
        {loading ? (
          <p>Loading courses...</p>
        ) : error ? (
          <p>{error}</p>
        ) : !selectedCourse && filteredCourses.length > 0 ? (
          <div className="course-grid">
            {filteredCourses.map((course) => (
              <div key={course._id} className="course-card" onClick={() => handleCourseClick(course)}>
                <div className="course-header">
                  <span className="course-title">
                    {course.course_Code}: {course.course_Name} ({course.credits})
                  </span>
                </div>
                <p className="course-description">Course Description goes here</p>
              </div>
            ))}
          </div>

        ) : !selectedCourse && filteredCourses.length === 0 ? (
          /* Show message when no courses match the filters */
          <p>No courses found.</p>
        ) : null}

        {/* Display selected course details */}
        {selectedCourse && (
          <div className="selected-course">
            <h2>{selectedCourse.course_Code}: {selectedCourse.course_Name} ({selectedCourse.credits}) </h2>
            <p>{selectedCourse.description || "No description available."}</p>
            <p><hr /></p>
            
            {/* Prerequisites & Post-requisites */}
            <div className="requisites-container">
              <div className="requisite">
                <strong>Prerequisites:</strong>
                <div className="requisite-box">
                  <p>{selectedCourse.preRequisite || "None"}</p>
                </div>
              </div>

              <div className="requisite">
                <strong>Post-requisites:</strong>
                <div className="requisite-box">
                  <p>{selectedCourse.postRequisite || "None"}</p>
                </div>
              </div>
            </div>

            <hr />
            {/* Button to return to search */}
            <button onClick={() => setSelectedCourse(null)} className="close-button">
              ✖  Return To Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSearch;
