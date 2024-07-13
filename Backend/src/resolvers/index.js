import {mergeResolvers} from '@graphql-tools/merge';
import TAresolvers from "./ta/TA_CombineTa.resolver.js"

const TA_Resolvers = mergeResolvers([
    TAresolvers
]);

export default TA_Resolvers;