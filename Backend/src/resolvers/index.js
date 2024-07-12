import taResolver from './ta/ta.resolver.js';

const resolvers = {
    Query: {
        ...taResolver.Query,
    },
    Mutation: {
        ...taResolver.Mutation,
    },
    // Todo: todoResolvers.Todo
};

export default resolvers;
