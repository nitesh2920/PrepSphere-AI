import {createContext} from "react"

interface CourseCountContextType {
  totalCourse: number;
  setTotalCourse: (count: number) => void;
}

export const CourseCountContext = createContext<CourseCountContextType | undefined>(undefined);
