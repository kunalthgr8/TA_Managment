import { gql } from 'apollo-server';
import TA_TypeDefs from './ta/combineTaTypeDef.js';
import Faculty_TypeDefs from './faculty/combineFacultyTypeDef.js';
const baseTypeDefs = gql`
    type Query
    type Mutation
`;

const typeDefs = [
    baseTypeDefs,
    TA_TypeDefs,
    Faculty_TypeDefs
];

export default typeDefs;
