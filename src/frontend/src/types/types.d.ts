export type NavLinks={
    link:string;
    label:string;
}

 type Universities = {
    name?: string;
    description?: string;
    location?: string; 
    ranking?: number;
    establishedYear?: number;
    departments?: {
      name?: string;
      facultyCount?: number;
      coursesOffered?: string[];
    }[];
    studentCount?: number;
    website?: string;
  };