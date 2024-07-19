import { mergeResolvers } from "@graphql-tools/merge";
import facultyResolver from "./faculty.resolver.js";
import courseResolver from "./course.resolver.js";
import facultyleaveResolvers from "./leave.resolver.js";
import academicsResolvers from "./academics.resolver.js";

const Facultyresolvers = mergeResolvers([
    facultyResolver,
    courseResolver,
    facultyleaveResolvers,
    academicsResolvers,
]);

export default Facultyresolvers;
