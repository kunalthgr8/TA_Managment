import { mergeTypeDefs } from "@graphql-tools/merge";

import facultyTypeDefs from "./faculty.typeDef.js";
import courseTypeDef from "./course.typeDef.js";
// import selectedTaTypeDef from "./selectedTa.typeDef.js";
import FacultyLeaveTypeDefs from "./leave.typeDef.js";
import Faculty from "../../models/faculty/faculty.js";


const Faculty_TypeDefs = mergeTypeDefs([
    facultyTypeDefs,
    courseTypeDef,
    // selectedTaTypeDef
    FacultyLeaveTypeDefs,
  ]);
  
  export default Faculty_TypeDefs;
  
