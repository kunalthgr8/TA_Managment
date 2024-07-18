import { mergeResolvers } from "@graphql-tools/merge";
import facultyResolver from "./faculty.resolver.js";
import courseResolver from "./course.resolver.js";
// import selectedTaResolver from "./selectedTa.resolver.js";
import facultyleaveResolvers from "./leave.resolver.js";
import generateCsv from "./academics.resolver.js";

const Facultyresolvers = mergeResolvers([
  facultyResolver,
  courseResolver,
  // selectedTaResolver
  facultyleaveResolvers,
  generateCsv,
]);

export default Facultyresolvers;
