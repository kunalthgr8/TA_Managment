import { mergeTypeDefs } from "@graphql-tools/merge";
import educationTypeDefs from "./TA_Education.typeDef.js";
import experienceTypeDefs from "./TA_Experience.typeDef.js";
import projectsTypeDefs from "./TA_Project.typeDef.js";
import skillsTypeDefs from "./TA_Skills.typeDef.js";
import socialProfileTypeDefs from "./TA_SocialProfile.typeDef.js";
import userTypeDefs from "./ta.js";

const TA_TypeDefs = mergeTypeDefs([
  educationTypeDefs,
  experienceTypeDefs,
  projectsTypeDefs,
  skillsTypeDefs,
  socialProfileTypeDefs,
  userTypeDefs
]);

export default TA_TypeDefs;
