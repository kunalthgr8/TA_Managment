import { gql } from 'apollo-server';
import userTypeDefs from './ta/ta.js';
import educationTypeDefs from './ta/education.typeDef.js';
// import todoTypeDefs from './todo.js';


const baseTypeDefs = gql`
    type Query
    type Mutation
`;

const typeDefs = [
    baseTypeDefs,
    userTypeDefs,
    educationTypeDefs,
    // todoTypeDefs
];

export default typeDefs;
