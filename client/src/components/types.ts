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

interface Professor {
  "course quality": number;
  "course difficulty": number;
  quality: number;
  difficulty: number;
  "take again": number;
}