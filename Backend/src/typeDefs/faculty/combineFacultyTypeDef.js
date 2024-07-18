import { mergeTypeDefs } from "@graphql-tools/merge";

import facultyTypeDefs from "./faculty.typeDef.js";
import courseTypeDef from "./course.typeDef.js";
import csvTypeDef from "./academic.typeDef.js";
// import selectedTaTypeDef from "./selectedTa.typeDef.js";
import FacultyLeaveTypeDefs from "./leave.typeDef.js";
import Faculty from "../../models/faculty/faculty.js";
import academicsTypeDef from "./academics.typeDef.js.js";


const Faculty_TypeDefs = mergeTypeDefs([
  facultyTypeDefs,
  courseTypeDef,
  // selectedTaTypeDef
  FacultyLeaveTypeDefs,
  csvTypeDef,
    academicsTypeDef,
]);

export default Faculty_TypeDefs;
