import { gql } from 'apollo-server';
import userTypeDefs from './ta/ta.js';
// import todoTypeDefs from './todo.js';

const baseTypeDefs = gql`
    type Query
    type Mutation
`;

const typeDefs = [
    baseTypeDefs,
    userTypeDefs,
    // todoTypeDefs
];

export default typeDefs;
