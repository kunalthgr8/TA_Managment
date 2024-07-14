import { mergeTypeDefs } from "@graphql-tools/merge";

import facultyTypeDefs from "./faculty.typeDef.js";
import courseTypeDef from "./course.typeDef.js";
import selectedTaTypeDef from "./selectedTa.typeDef.js";


const Faculty_TypeDefs = mergeTypeDefs([
    facultyTypeDefs,
    courseTypeDef,
    selectedTaTypeDef
  ]);
  
  export default Faculty_TypeDefs;
  
