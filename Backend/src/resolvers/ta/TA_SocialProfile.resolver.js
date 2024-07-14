import SocialProfile from '../../models/ta/socialProfile.js';

const socialProfileResolver = {
  Query: {
    getSocialProfile: async (parent, { idNumber },context) => {
      try {
        if (!context.user) {
          throw new Error("Unauthorized");
        }
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
    createSocialProfile: async (parent, args,context) => {
      try {
        if (!context.user) {
          throw new Error("Unauthorized");
        }
        console.log(args);
        const existingSocials = await SocialProfile.findOne({ idNumber: args.idNumber });
        if(existingSocials) {
          return await socialProfileResolver.Mutation.updateSocialProfile(parent, args);
        }
        const profile = new SocialProfile(args);
        return await profile.save();
      } catch (error) {
        console.error("Error creating social profile:", error);
        throw new Error("Error creating social profile");
      }
    },
    updateSocialProfile: async (parent, { idNumber, ...update },context) => {
      try {
        // if (!context.user) {
        //   throw new Error("Unauthorized");
        // }
        console.log(idNumber);
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
    deleteSocialProfile: async (parent, { idNumber },context) => {
      try {
        // if (!context.user) {
        //   throw new Error("Unauthorized");
        // }
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
