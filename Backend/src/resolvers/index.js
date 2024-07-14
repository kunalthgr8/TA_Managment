import {mergeResolvers} from '@graphql-tools/merge';
import TAresolvers from "./ta/TA_CombineTa.resolver.js"
import Facultyresolvers from "./faculty/Faculty_CombineFaculty.resolver.js"

const TA_Resolvers = mergeResolvers([
    TAresolvers,
    Facultyresolvers
]);

export default TA_Resolvers;