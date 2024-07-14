import SocialProfile from "../../models/ta/socialProfile.js";
import { ApiError } from "../../utils/ApiError.js";

const socialProfileResolver = {
  Query: {
    getSocialProfile: async (parent, { idNumber }, context) => {
      if (!context.user) {
        throw new ApiError(401, "Unauthorized");
      }
      try {
        const profile = await SocialProfile.findOne({ idNumber });
        if (!profile) {
          throw new ApiError(404, "Social profile not found");
        }
        return profile;
      } catch (error) {
        throw new ApiError(500, "Error fetching social profile");
      }
    },
    getAllSocialProfiles: async (_, __, context) => {
      if (!context.user) {
        throw new ApiError(401, "Unauthorized");
      }
      try {
        return await SocialProfile.find();
      } catch (error) {
        throw new ApiError(500, "Error fetching social profiles");
      }
    },
  },
  Mutation: {
    createSocialProfile: async (parent, args, context) => {
      if (!context.user) {
        throw new ApiError(401, "Unauthorized");
      }
      if (args.idNumber !== context.user.idNumber) {
        throw new ApiError(403, "Forbidden");
      }
      try {
        const existingSocials = await SocialProfile.findOne({
          idNumber: args.idNumber,
        });
        if (existingSocials) {
          return await socialProfileResolver.Mutation.updateSocialProfile(
            parent,
            args
          );
        }
        const profile = new SocialProfile(args);
        return await profile.save();
      } catch (error) {
        throw new ApiError(500, "Error creating social profile");
      }
    },
    updateSocialProfile: async (parent, { idNumber, ...update }, context) => {
      try {
        if (!context.user) {
          throw new ApiError(401, "Unauthorized");
        }
        if (idNumber !== context.user.idNumber) {
          throw new ApiError(403, "Forbidden");
        }
        const profile = await SocialProfile.findOneAndUpdate(
          { idNumber },
          { $set: update },
          { new: true }
        );
        if (!profile) {
          throw new ApiError(404, "Social profile not found");
        }
        return profile;
      } catch (error) {
        throw new ApiError(500, "Error updating social profile");
      }
    },
    deleteSocialProfile: async (parent, { idNumber }, context) => {
      try {
        if (!context.user) {
          throw new ApiError(401, "Unauthorized");
        }
        if (idNumber !== context.user.idNumber) {
          throw new ApiError(403, "Forbidden");
        }
        const profile = await SocialProfile.findOneAndDelete({ idNumber });
        if (!profile) {
          throw new ApiError(404, "Social profile not found");
        }
        return profile;
      } catch (error) {
        throw new ApiError(500, "Error deleting social profile");
      }
    },
  },
};

export default socialProfileResolver;
