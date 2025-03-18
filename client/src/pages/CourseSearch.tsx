import { useEffect, useState } from "react";
import "./CourseSearch.css";

// Define types for the course data
// Professor interface defines a professor's details where the key is the professor's name and value could be other details (like contact info).
interface Professor {
  [key: string]: string; 
}

// Course interface describes the structure of a course object, which includes properties like course name, description, prerequisites, etc.
interface Course {
  _id: string; // Unique identifier for the course
  course_Name: string; // Name of the course
  description?: string; // Optional field: Description of the course
  prerequisites?: string; // Optional field: Prerequisites for the course
  postrequisites?: string; // Optional field: Postrequisites for the course
  professors?: Professor; // Optional field: List of professors teaching the course
}

const CourseSearch: React.FC = () => {
  // State hooks for managing component state
  const [courses, setCourses] = useState<Course[]>([]); // Stores all fetched courses
  const [searchTerm, setSearchTerm] = useState<string>(""); // Stores the current search input from the user
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null); // Stores the selected course after search
  const [loading, setLoading] = useState<boolean>(true); // Tracks the loading state while fetching data
  const [error, setError] = useState<string>(""); // Stores error messages if the fetch operation fails

  // useEffect hook runs the fetchCourses function when the component mounts to fetch courses from the server
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch courses data from the server
        const response = await fetch("http://localhost:3000/courses");
        const data: Course[] = await response.json(); // Parse the response into an array of Course objects
        setCourses(data); // Update the courses state with fetched data
        setLoading(false); // Update loading state to false after data is loaded
      } catch {
        setError("Error fetching courses."); // Update error state if fetching fails
        setLoading(false); // Update loading state to false even if an error occurs
      }
    };

    fetchCourses(); // Invoke the fetch function
  }, []); // Empty dependency array means this effect runs only once after the component mounts

  // Handle search button click
  const handleSearchClick = () => {
    if (searchTerm.trim() === "") {
      setSelectedCourse(null); // If the search input is empty, reset the selected course
      return;
    }

    // Normalize the search input by converting it to lowercase and trimming any extra spaces
    const searchNormalized = searchTerm.toLowerCase().trim();
    
    // Search for the first course that matches the search term (case-insensitive)
    const foundCourse = courses.find((course) =>
      course.course_Name.toLowerCase().includes(searchNormalized)
    );

    // Set the selected course based on the search result or null if no course is found
    setSelectedCourse(foundCourse || null);
  };

  return (
    <div className="course-container">
      {/* Left Panel: Search Section */}
      <div className="search-container">
        <h1>Course Compass</h1>
        <div className="filters">
          <div className="filter-item">
            {/* Search input field where the user can enter the course name */}
            <input
              type="text"
              id="search-input"
              placeholder="Enter course name..."
              value={searchTerm} // Bind the input value to the state
              onChange={(e) => setSearchTerm(e.target.value)} // Update the searchTerm state when the user types
            />
          </div>
          {/* Search button triggers the handleSearchClick function */}
          <button onClick={handleSearchClick} className="search-button">
            Search
          </button>
        </div>
      </div>

      {/* Right Panel: Course Details Section */}
      <div className="course-details">
        {loading ? (
          <p>Loading courses...</p> // Display loading message while fetching data
        ) : error ? (
          <p>{error}</p> // Display error message if there's an error
        ) : selectedCourse ? (
          <>
            {/* Display selected course details */}
            <h2>{selectedCourse.course_Name}</h2>
            <p><strong>Course ID:</strong> {selectedCourse._id}</p>
            <p><strong>Description:</strong> {selectedCourse.description || "No description available."}</p>
            <p><strong>Prerequisites:</strong> {selectedCourse.prerequisites || "None"}</p>
            <p><strong>Postrequisites:</strong> {selectedCourse.postrequisites || "None"}</p>

            {/* Display list of professors teaching the selected course */}
            <h3>Professors</h3>
            {selectedCourse.professors ? (
              // Loop through the professors and display their names
              Object.entries(selectedCourse.professors).map(([professorName]: [string, string]) => (
                <div key={professorName} className="professor-card">
                  <h4>{professorName}</h4>
                </div>
              ))
            ) : (
              <p>No professor data available.</p> // Display if no professor data is available
            )}
          </>
        ) : (
          // Message if no course is selected
          <p>Search for a course to see details.</p>
        )}
      </div>
    </div>
  );
};

export default CourseSearch;
