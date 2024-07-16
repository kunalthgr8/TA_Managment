import { mergeResolvers } from "@graphql-tools/merge";
import facultyResolver from "./faculty.resolver.js";
import courseResolver from "./course.resolver.js";
// import selectedTaResolver from "./selectedTa.resolver.js";
import facultyleaveResolvers from "./leave.resolver.js";

const Facultyresolvers = mergeResolvers([
    facultyResolver,
    courseResolver,
    // selectedTaResolver
    facultyleaveResolvers
]);

export default Facultyresolvers;
