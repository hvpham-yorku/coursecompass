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

        console.log("Fetched courses:", data);
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

  const applyFilters = () => {
    let results = courses;
    const search = searchTerm.toLowerCase().trim();

    if (search) {
      results = results.filter(course => {
        const nameMatch = course.course_Name?.toLowerCase().includes(search);
        const codeMatch = course.course_Code.toLowerCase().includes(search);
        const profMatch = course.professors && Object.keys(course.professors).some(p =>
          p.toLowerCase().includes(search)
        );
        return nameMatch || codeMatch || profMatch;
      });
    }

    if (department) {
      results = results.filter(course => course.course_Code.startsWith(department));
    }

    if (level) {
      results = results.filter(course => {
        const match = course.course_Code.match(/\d{4}/)?.[0];
        const courseLevel = match ? match[0] + "000" : null;
        return courseLevel === level;
      });
    }
    
    if (credit) {
      results = results.filter(course => Number(course.credits) === Number(credit));
    }

    setFilteredCourses(results);
    setSelectedCourse(null);
  };

  useEffect(() => {
    applyFilters();
  }, [searchTerm, department, level, credit, courses]);

  // Get course by code
  const getCourseByCode = (courseCode: string): Course | null => {
    const foundCourse = courses.find(course => course.course_Code === courseCode);
    console.log("Fetching course:", courseCode, foundCourse);
    return foundCourse || null;
  };

  // Click on prerequisites
  const handlePrerequisiteClick = (courseCode: string) => {
    console.log("Clicked prerequisite:", courseCode);
    const newCourse = getCourseByCode(courseCode);
    if (newCourse) {
      setSelectedCourse(newCourse);
    } else {
      console.warn("Course not found:", courseCode);
    }
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
            {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
              <CourseList filteredCourses={filteredCourses} handleCourseClick={setSelectedCourse} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CourseSearch;
