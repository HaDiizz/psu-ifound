import User from "@/models/user";
import connectDB from "@/lib/connectDB";

connectDB();

export const findOneUserByEmail = async ({ email }) => {
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return {};
    }
    user = user._doc;
    return { user: { ...user, _id: user._id.toString() } };
  } catch (error) {
    return { error: "Failed to find the user service." };
  }
};
