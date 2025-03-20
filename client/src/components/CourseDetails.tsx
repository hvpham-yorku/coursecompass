import React from "react";
import { Course } from "./types";
import "../styles/CoursePage.css";

interface Props {
  selectedCourse: Course | null;
  handlePrerequisiteClick: (courseCode: string) => void;
  setSelectedCourse: (course: Course | null) => void;
}

const CourseDetails: React.FC<Props> = ({ selectedCourse, handlePrerequisiteClick, setSelectedCourse }) => {
  if (!selectedCourse) return null;

  return (
    <div className="selected-course">
      <h2>{selectedCourse.course_Code}: {selectedCourse.course_Name} ({selectedCourse.credits}.0)</h2>
      <p>{selectedCourse.description || "No description available."}</p>
      <hr />

      <div className="requisites-container">
        <div className="requisite">
          <p><strong>Prerequisites:</strong></p>
          <div className="course-box-container">
            {selectedCourse.preRequisite && selectedCourse.preRequisite.length > 0 ? (
              selectedCourse.preRequisite.map((courseCode, index) => (
                <div 
                  key={index} 
                  className="course-box" 
                  onClick={() => handlePrerequisiteClick(courseCode)}
                >
                  {courseCode}
                </div>
              ))
            ) : <div className="course-box">None</div>}
          </div>
        </div>

        <div className="requisite">
          <p><strong>Postrequisites:</strong></p>
          <div className="course-box-container">
            {selectedCourse.postRequisite && selectedCourse.postRequisite.length > 0 ? (
              selectedCourse.postRequisite.map((courseCode, index) => (
                <div 
                  key={index} 
                  className="course-box" 
                  onClick={() => handlePrerequisiteClick(courseCode)}
                >
                  {courseCode}
                </div>
              ))
            ) : <div className="course-box">None</div>}
          </div>
        </div>
      </div>

      <hr />
      <button onClick={() => setSelectedCourse(null)} className="close-button">✖ Return To Search</button>
    </div>
  );
};

export default CourseDetails;
