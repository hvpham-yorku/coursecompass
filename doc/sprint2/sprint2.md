# Sprint 2 Planning Meeting (sprint1.md)

## **Meeting Details**
- **Date:** March 21, 2025  
- **Time:** 12:00 PM  
- **Location:** Lassonde Building, after our lab  
- **Attendees:**  
  - Julia Da Silva  
  - Gurjap Hajra  
  - Rizikeshan Asohan  
  - Sam Antoun  

---

## **Sprint Goal**
The goal of **Sprint 2** is to implement the Course/Professor Rating and improve our UI:  
1. **Raitings** - Enable students to see detailed reviews on each professor teaching the selected course.  
2. **Improved UI** - Improving functionality and design.  

By the end of this sprint, students should be able to **search for any course and professor ratings** to make informed academic decisions.

---

## **User Stories for Sprint 1**
This sprint covers the following **user stories**, grouped by related functionality:

### **1. Professor and Course Rating**
- 15. *As a second-year student, I want to see a list of professors who are teaching a course so that I can make an informed decision on selecting a professor.*  
- 16. *As a third-year student, I want to sort professors by their rating so that I can find highly-rated instructors for my courses* 
 - 18. *As a student, I want to see a list of top-rated professors for my major so that I can choose courses taught by well-regarded instructors.*  

### **2. Improved UI**  
- 17. *As a TA, I want to search for professors by name so that I can quickly find what courses they teach *  
- 19. *As a student who spends long hours on my computer, I want a dark mode option so that I can reduce eye strain while browsing course information.*  
- 20. *As a new student, I want an auto-suggest feature in the search bar so that I can quickly find courses by typing partial names or codes.*  

---

## **Spikes Identified**

1. **Efficient Webscraping**  
   - How to optimize data collection to ensure its accurate.  
2. **Professor/Course rating**  
   - Best way to structure rating so they are informative and accurate.  

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
The **Sprint 2 tasks** have been divided among the team:

### **Task 1: Improve Webscraping to collect more accurate Course Data**
- **Backend:** Collect up to date course information and ratings (**Gurjap & Sam**)   

### **Task 2: Professor Rating Page**
- **Frontend:** Create page for each professor on course pages (**Julia & Rizikeshan**)  
- **Backend:** Fetch professor data and return structured results (**Gurjap**)  
- **Database:** Store and manage prerequisite/post-requisite relationships (**Sam**)  

### **Task 3: Testing, Documentation & System Design**
- **Update system design document, including:**  
  - **CRC Cards**: Define key classes and their responsibilities.  
  - **Architecture Diagram**: Show system components and relationships.  
  - **API Design**: Document endpoints for course search and prerequisites.  
  - **Database Schema**: Define course structure with prerequisite/post-requisite relationships.  

---

## **Decisions Made**
1. **We agreed to prioritize rating system**, ensuring that students can find courses before making changes to Design.  
2. **We decided to use rate my prof** to collect professor ratings
3. **We established standups every two days** to track progress and address any blockers.  

---

## **Next Steps**
1. **Start development** - Assign tasks and begin working on individual components.  