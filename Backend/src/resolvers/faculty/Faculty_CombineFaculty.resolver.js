import { mergeResolvers } from "@graphql-tools/merge";
import facultyResolver from "./faculty.resolver.js";
import courseResolver from "./course.resolver.js";
import selectedTaResolver from "./selectedTa.resolver.js";


const Facultyresolvers = mergeResolvers([
    facultyResolver,
    courseResolver,
    selectedTaResolver
]);

export default Facultyresolvers;
