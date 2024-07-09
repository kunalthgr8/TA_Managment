import taResolver from './ta/taResolver.js';

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
