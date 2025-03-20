import React, { useState } from "react";
import { Course } from "./types";
import "../styles/CoursePage.css";
import "../styles/CourseProfessor.css";

interface Props {
  selectedCourse: Course | null;
  handlePrerequisiteClick: (courseCode: string) => void;
  setSelectedCourse: (course: Course | null) => void;
}

const CourseDetails: React.FC<Props> = ({ selectedCourse, handlePrerequisiteClick, setSelectedCourse }) => {
  const [selectedTab, setSelectedTab] = useState<"details" | "professors">("details");

  if (!selectedCourse) return null;

  return (
    <div className="selected-course">
      <h2>{selectedCourse.course_Code}: {selectedCourse.course_Name} ({selectedCourse.credits}.0)</h2>

      {/* Toggle Buttons */}
      <div className="tab-buttons">
        <button
          className={`tab-button ${selectedTab === "details" ? "active" : ""}`}
          onClick={() => setSelectedTab("details")}
        >
          Course Details
        </button>
        <button
          className={`tab-button ${selectedTab === "professors" ? "active" : ""}`}
          onClick={() => setSelectedTab("professors")}
        >
          Professors
        </button>
      </div>

      <hr />

      {/* Conditionally Render Section Based on Selected Tab */}
      {selectedTab === "details" ? (
        <div>
          <p>{selectedCourse.description || "No description available."}</p>

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
        </div>
      ) : (
        <div className="professors-container">
          <h4>Professors</h4>
          {selectedCourse.professors && Object.keys(selectedCourse.professors).length > 0 ? (
            <ul className="professor-list">
              {Object.keys(selectedCourse.professors).map((professor, index) => (
                <li key={index} className="professor-item">
                  {professor}
                </li>
              ))}
            </ul>
          ) : (
            <p>No professors listed for this course.</p>
          )}
        </div>
      )}

      <hr />

      <button onClick={() => setSelectedCourse(null)} className="close-button">✖ Return To Search</button>
    </div>
  );
};

export default CourseDetails;
