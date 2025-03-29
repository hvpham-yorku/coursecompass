import { useEffect, useState } from "react";
import { Course } from "./types";
import "../styles/CourseSearch.css";
import "../styles/CoursePage.css";
import SearchFilters from "./SearchFilters";
import CourseList from "./CourseList";
import CourseDetails from "./CourseDetails";

const CourseSearch: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [credit, setCredit] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:3000/courses");
        if (!response.ok) throw new Error("Failed to fetch courses");
        const data: Course[] = await response.json();

        console.log("Fetched courses:", data); // Debugging log
        setCourses(data);
        setFilteredCourses(data);
      } catch (err) {
        setError(`Error fetching courses: ${(err as Error).message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Function to fetch course by code
  const getCourseByCode = (courseCode: string): Course | null => {
    const foundCourse = courses.find(course => course.course_Code === courseCode);
    console.log("Fetching course:", courseCode, foundCourse); // Debugging log
    return foundCourse || null;
  };

  // Function to handle clicking prerequisites or postrequisites
  const handlePrerequisiteClick = (courseCode: string) => {
    console.log("Clicked prerequisite:", courseCode);
    const newCourse = getCourseByCode(courseCode);
    if (newCourse) {
      setSelectedCourse(newCourse);
    } else {
      console.warn("Course not found:", courseCode);
    }
  };

  const handleSearchClick = () => {
    console.log("Filters applied:", { searchTerm, department, level, credit });

    let results = courses;

    if (searchTerm.trim()) {
      const searchNormalized = searchTerm.toLowerCase().trim();
      results = results.filter(course =>
        course.course_Code.toLowerCase().includes(searchNormalized) ||
        (course.course_Name && course.course_Name.toLowerCase().includes(searchNormalized))
      );
    }

    if (department) {
      results = results.filter(course => course.course_Code.startsWith(department));
    }

    if (level) {
      results = results.filter(course => course.course_Code.includes(level));
    }

    if (credit) {
      results = results.filter(course => Number(course.credits) === Number(credit));
    }

    setFilteredCourses(results);
    setSelectedCourse(null);
  };

  return (
    <div className="course-container">
      {/* Search Panel */}
      <div className="search-panel">
        <SearchFilters 
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          department={department} setDepartment={setDepartment}
          level={level} setLevel={setLevel}
          credit={credit} setCredit={setCredit}
          uniqueDepartments={[...new Set(courses.map(course => course.course_Code.split(" ")[0]))]}
          uniqueLevels={[...new Set(courses.map(course => course.course_Code.match(/\d{4}/)?.[0]?.[0] + "000"))]}
          uniqueCredits={[...new Set(courses.map(course => String(course.credits)))]}
          handleSearchClick={handleSearchClick}
        />
      </div>

      {/* Content Panel */}
      <div className="content-panel">
        {selectedCourse ? (
          <CourseDetails 
            selectedCourse={selectedCourse} 
            setSelectedCourse={setSelectedCourse} 
            handlePrerequisiteClick={handlePrerequisiteClick} 
          />
        ) : (
          <>
            {loading ? <p>Loading...</p> : error ? <p>{error}</p> : <CourseList filteredCourses={filteredCourses} handleCourseClick={setSelectedCourse} />}
          </>
        )}
      </div>
    </div>
  );
};

export default CourseSearch;
