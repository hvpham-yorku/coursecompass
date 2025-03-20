# Sprint 1 Planning Meeting (sprint1.md)

## **Meeting Details**
- **Date:** March 7, 2025  
- **Time:** 12:00 PM  
- **Location:** Lassonde Building, after our lab  
- **Attendees:**  
  - Julia Da Silva  
  - Gurjap Hajra  
  - Rizikeshan Asohan  
  - Sam Antoun  

---

## **Sprint Goal**
The goal of **Sprint 1** is to implement two foundational features of CourseCompass:  
1. **Course Search** - Enable students to search for courses by subject, course code, or keywords.  
2. **Prerequisite & Post-requisite Course Links** - Allow students to see prerequisite and post-requisite courses for academic planning.  

By the end of this sprint, students should be able to **search for any course and view prerequisite/post-requisite relationships** to make informed academic decisions.

---

## **User Stories for Sprint 1**
This sprint covers the following **user stories**, grouped by related functionality:

### **1. Course Search & Filtering**
- **Search for Courses by Code, Name, or Department**  
  - *As a third-year student, I want to search for courses by their course code so that I can quickly find specific courses without browsing through a list.*  
  - *As a first-year student, I want to search for courses by their name so that I can find courses even if I don’t remember their exact code.*  
  - *As a new student, I want to filter courses by their department so that I can easily see all the courses offered in a specific academic field.*  

- **Filter Courses by Major, Level, or Credit Hours**  
  - *As a second-year student, I want to filter courses by major so that I can view courses that are commonly required for my program.*  
  - *As a third-year student, I want to filter courses by level (1000, 2000, 3000, or 4000) so that I can find courses appropriate for my year of study.*  
  - *As a student with a busy schedule, I want to filter courses by credit hours so that I can choose between 3-credit and 6-credit courses based on my availability.*  

- **View Course Availability by Semester**  
  - *As a student planning for next semester, I want to see whether a course is offered in Fall, Winter, or Summer so that I can plan my course selection accordingly.*  

---

### **2. Prerequisite & Post-requisite Course Links**
- **View Course Prerequisites & Post-requisites**  
  - *As a second-year student, I want to see a clear list of prerequisites for a course so that I know what courses I need to complete before enrolling.*  
  - *As a first-year student, I want to see what courses require this course as a prerequisite so that I can plan my future course selections more effectively.*  
  - *As a new student, I want courses to display a simple "Has Prerequisites" label so that I am aware if I need to check prerequisites before enrolling.*  

- **Navigate Between Related Courses**  
  - *As a student, I want to click on a prerequisite or post-requisite course and be taken to its course page, so I can explore related courses.*  

---

## **Spikes Identified**
These are **technical uncertainties** that need further research before implementation:

1. **Efficient Course Search Indexing**  
   - How to optimize search functionality for fast response times with a large dataset.  
2. **Database Schema for Prerequisite/Post-requisite Links**  
   - Best way to structure course relationships to allow efficient lookups.  
3. **Handling Large Course Data Sets**  
   - Strategies for data retrieval to avoid performance bottlenecks.  

---

## **Team Capacity & Work Allocation**
Each team member has committed to working on Sprint 1 tasks based on expertise:

| Team Member       | Role                 | Responsibilities |
|-------------------|----------------------|-----------------|
| Julia Da Silva   | Frontend Developer    | UI/UX design, implementing search and prerequisite/post-requisite links |
| Gurjap Hajra     | Backend Developer     | API integration for course search, database setup |
| Rizikeshan Asohan | Full Stack Developer | Connecting frontend and backend for search & prerequisite features |
| Sam Antoun       | QA & Documentation    | Testing, writing documentation, reviewing pull requests |

---

## **Task Breakdown**
The **Sprint 1 tasks** have been divided among the team:

### **Task 1: Implement Course Search & Filtering**
- **Frontend:** Design and implement the search UI (**Julia**)  
- **Backend:** Develop API for course search (**Gurjap**)  
- **Database:** Optimize search queries for fast results (**Rizikeshan**)  

### **Task 2: Implement Prerequisite/Post-requisite Course Links**
- **Frontend:** Display prerequisite and post-requisite course links on course pages (**Julia**)  
- **Backend:** Fetch prerequisite/post-requisite data and return structured results (**Gurjap**)  
- **Database:** Store and manage prerequisite/post-requisite relationships (**Rizikeshan**)  

### **Task 3: Optimize Performance**
- **Optimize search indexing for speed and accuracy** (**Gurjap & Rizikeshan**)  

### **Task 4: Testing, Documentation & System Design**
- **Test search feature & prerequisite/post-requisite links** (**Sam**)  
- **Write system design document, including:**  
  - **CRC Cards**: Define key classes and their responsibilities.  
  - **Architecture Diagram**: Show system components and relationships.  
  - **API Design**: Document endpoints for course search and prerequisites.  
  - **Database Schema**: Define course structure with prerequisite/post-requisite relationships.  
- **Review pull requests & verify implementation consistency** (**Sam**)  

---

## **Decisions Made**
1. **We agreed to prioritize course search first**, ensuring that students can find courses before adding prerequisite/post-requisite links.  
2. **We decided to use MongoDB** for storing course data, allowing for flexible relationships between courses.  
3. **We established standups every two days** to track progress and address any blockers.  

---

## **Next Steps**
1. **Start development** - Assign tasks and begin working on individual components.  
