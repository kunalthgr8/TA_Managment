import { mergeResolvers } from '@graphql-tools/merge';
import socialProfileResolvers from './socialProfileResolvers';
import skillsResolvers from './skillsResolvers';
import projectsResolvers from './projectsResolvers';
import experienceResolvers from './experienceResolvers';
import educationResolvers from './educationResolvers';

const resolvers = mergeResolvers([
  socialProfileResolvers,
  skillsResolvers,
  projectsResolvers,
  experienceResolvers,
  educationResolvers
]);

export default resolvers;
