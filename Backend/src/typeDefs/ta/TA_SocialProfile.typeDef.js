const socialProfileTypeDefs = `
  type SocialProfile {
    idNumber: ID!
    portfolio: String
    linkedin: String
    github: String
    twitter: String
    kaggle: String
  }

  extend type Query {
    getSocialProfile(idNumber: ID!): SocialProfile
    getAllSocialProfiles: [SocialProfile]
  }

  extend type Mutation {
    createSocialProfile(
      idNumber: ID!
      portfolio: String
      linkedin: String
      github: String
      twitter: String
      kaggle: String
    ): SocialProfile

    updateSocialProfile(
      idNumber: ID!
      portfolio: String
      linkedin: String
      github: String
      twitter: String
      kaggle: String
    ): SocialProfile

    deleteSocialProfile(idNumber: ID!): SocialProfile
  }
`;

export default socialProfileTypeDefs;
