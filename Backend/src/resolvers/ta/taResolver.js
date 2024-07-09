import User from '../../models/ta/ta.js';
import axios from "axios";

const taResolver = {
    Query: {
        getallUsers: async () => {
            try {
                return await User.find();
            } catch (error) {
                console.error("Error fetching users:", error);
                throw new Error("Error fetching users");
            }
        },
        getUser: async (parent, { idNumber }) => {
            try {
                const users = await User.find({ idNumber });
                if (users.length === 0) {
                    throw new Error("No users found with this ID number");
                }
                return users;
            } catch (error) {
                console.error("Error fetching users by ID number:", error);
                throw new Error(error.message || "Error fetching users by ID number");
            }
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            try {
                const user = new User(args);
                console.log(user);
                return await user.save();
            } catch (error) {
                console.error("Error adding user:", error);
                throw new Error("Error adding user");
            }
        }
    }
};

export default taResolver;
