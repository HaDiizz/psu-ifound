import User from "@/models/user";
import connectDB from "@/lib/connectDB";

connectDB();

export const findOneUserByEmail = async ({ email }) => {
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return {};
    }
    user = await user.toObject();
    user._id = user._id.toString();
    user.claimedList = user.claimedList.map((item) => item.toString());
    return { user };
  } catch (error) {
    return { error: "Failed to find the user service. " + error };
  }
};
