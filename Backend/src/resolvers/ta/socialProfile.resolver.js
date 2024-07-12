import SocialProfile from '../../models/socialProfile.js';

const socialProfileResolver = {
  Query: {
    getSocialProfile: async (parent, { idNumber }) => {
      try {
        const profile = await SocialProfile.findOne({ idNumber });
        if (!profile) {
          throw new Error("Social profile not found");
        }
        return profile;
      } catch (error) {
        console.error("Error fetching social profile:", error);
        throw new Error("Error fetching social profile");
      }
    },
    getAllSocialProfiles: async () => {
      try {
        return await SocialProfile.find();
      } catch (error) {
        console.error("Error fetching all social profiles:", error);
        throw new Error("Error fetching all social profiles");
      }
    }
  },
  Mutation: {
    createSocialProfile: async (parent, args) => {
      try {
        const profile = new SocialProfile(args);
        return await profile.save();
      } catch (error) {
        console.error("Error creating social profile:", error);
        throw new Error("Error creating social profile");
      }
    },
    updateSocialProfile: async (parent, { idNumber, ...update }) => {
      try {
        const profile = await SocialProfile.findOneAndUpdate(
          { idNumber },
          { $set: update },
          { new: true }
        );
        if (!profile) {
          throw new Error("Social profile not found");
        }
        return profile;
      } catch (error) {
        console.error("Error updating social profile:", error);
        throw new Error("Error updating social profile");
      }
    },
    deleteSocialProfile: async (parent, { idNumber }) => {
      try {
        const profile = await SocialProfile.findOneAndDelete({ idNumber });
        if (!profile) {
          throw new Error("Social profile not found");
        }
        return profile;
      } catch (error) {
        console.error("Error deleting social profile:", error);
        throw new Error("Error deleting social profile");
      }
    }
  }
};

export default socialProfileResolver;
