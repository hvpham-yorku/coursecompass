export interface Professor {
    [key: string]: string;
  }
  
  export interface Course {
    _id: string;
    course_Code: string;
    course_Name: string;
    description?: string;
    credits?: string;
    preRequisite?: string[];
    postRequisite?: string[];
    professors?: Professor;
  }
  