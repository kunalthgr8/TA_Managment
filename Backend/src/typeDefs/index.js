import { gql } from 'apollo-server';
import TA_TypeDefs from './ta/combineTaTypeDef.js';

const baseTypeDefs = gql`
    type Query
    type Mutation
`;

const typeDefs = [
    baseTypeDefs,
    TA_TypeDefs
];

export default typeDefs;
