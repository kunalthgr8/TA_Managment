import { mergeResolvers } from "@graphql-tools/merge";
import taResolver from "./ta.resolver.js";
import educationResolvers from "./TA_Education.resolver.js";
import experienceResolver from "./TA_Experience.resolver.js";
import projectsResolver from "./TA_Project.resolver.js";
import skillsResolver from "./TA_Skill.resolver.js";
import socialProfileResolver from "./TA_SocialProfile.resolver.js";
import leaveResolver from "./TA_Leave.resolver.js";

const TAresolvers = mergeResolvers([
  educationResolvers,
  experienceResolver,
  projectsResolver,
  skillsResolver,
  socialProfileResolver,
  taResolver,
  leaveResolver,
]);

export default TAresolvers;
