import taResolver from './ta/ta.resolver.js';
import educationResolvers from './ta/education.resolver.js';

const resolvers = {
    Query: {
        ...taResolver.Query,
        ...educationResolvers.Query,
    },
    Mutation: {
        ...taResolver.Mutation,
        ...educationResolvers.Mutation,
    },
    // Todo: todoResolvers.Todo
};

export default resolvers;
