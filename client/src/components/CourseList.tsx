import React from "react";
import { Course } from "./types";
import "../styles/CourseList.css";

interface Props {
  filteredCourses: Course[];
  handleCourseClick: (course: Course) => void;
}

const CourseList: React.FC<Props> = ({ filteredCourses, handleCourseClick }) => {
  return (
    <div className="course-grid">
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
  );
};

export default CourseList;
