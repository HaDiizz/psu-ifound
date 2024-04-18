"use server";
import { revalidatePath } from "next/cache";
import Report from "@/models/report";
import connectDB from "./connectDB";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { deleteImage, uploadImageToCloudinary } from "./cloudinary";
import { bufferFile } from "@/utils/bufferFile";
import fs from "fs/promises";
import Post from "@/models/post";
import Comment from "@/models/comment";
import User from "@/models/user";
import Location from "@/models/location";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const addReport = async (formData) => {
  const session = await getServerSession(authOptions);
  const {
    title,
    detail,
    location,
    subLocation,
    contact,
    lat,
    lng,
    image,
    campusId,
  } = Object.fromEntries(formData);

  try {
    await connectDB();
    const fileData = await bufferFile(image);
    const res = await uploadImageToCloudinary(fileData);
    await fs.unlink(fileData.filepath);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const newReport = await new Report({
      title,
      detail,
      location,
      subLocation,
      lat,
      lng,
      contact,
      campId: campusId,
      user: session.user?.id,
      image: {
        public_id: res.public_id,
        url: res.url,
      },
    });

    await newReport.save();
    revalidatePath(`/${campusId}/explore`);
    return { success: true, message: "Created successful" };
  } catch (err) {
    console.log(err);
    return { error: true, message: "Something went wrong, try again later." };
  }
};

export const addPost = async (formData) => {
  const session = await getServerSession(authOptions);
  const { title, detail, location, subLocation, contact, image, campusId } =
    Object.fromEntries(formData);

  try {
    await connectDB();
    const fileData = await bufferFile(image);
    const res = await uploadImageToCloudinary(fileData);
    await fs.unlink(fileData.filepath);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const newPost = await new Post({
      title,
      detail,
      location,
      subLocation,
      contact,
      campId: campusId,
      user: session.user?.id,
      image: {
        public_id: res.public_id,
        url: res.url,
      },
    });

    await newPost.save();
    revalidatePath(`/${campusId}/explore/lost`);
    return { success: true, message: "Created successful" };
  } catch (err) {
    console.log(err);
    return { error: true, message: "Something went wrong, try again later." };
  }
};

export const editPost = async (formData) => {
  const session = await getServerSession(authOptions);
  const {
    title,
    detail,
    location,
    subLocation,
    contact,
    image,
    campusId,
    postId,
    oldImage,
    status,
  } = Object.fromEntries(formData);

  try {
    await connectDB();
    let res;
    if (image && image !== "undefined") {
      const fileData = await bufferFile(image);
      res = await uploadImageToCloudinary(fileData);
      await fs.unlink(fileData.filepath);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (res) {
        await deleteImage(oldImage);
      }
    }
    let post;
    if (session && session?.user?.role === "admin") {
      post = await Post.findOne({ _id: postId });
    } else {
      post = await Post.findOne({ _id: postId, user: session.user.id });
    }
    if (!post) {
      throw new Error("Post not found.");
    }
    if (post.campId !== campusId) throw new Error("Campus ID does not match.");
    post.status = status;
    post.title = title;
    post.detail = detail;
    post.location = location;
    post.subLocation = subLocation;
    post.contact = contact;
    post.campId = campusId;
    post.image = {
      public_id: image ? res.public_id : post.image.public_id,
      url: image ? res.url : post.image.url,
    };
    await post.save();
    revalidatePath(`/${post.campId}/explore/lost`);
    revalidatePath(`/${post.campId}/explore/lost/edit/${postId}`);
    return { success: true, message: "Edited successful" };
  } catch (err) {
    console.log(err);
    return { error: true, message: "Something went wrong, try again later." };
  }
};

export const deletePost = async (postId) => {
  const session = await getServerSession(authOptions);
  try {
    await connectDB();

    let post;
    if (session && session?.user?.role === "admin") {
      post = await Post.findOneAndDelete({
        _id: postId,
      });
    } else {
      post = await Post.findOneAndDelete({
        _id: postId,
        user: session.user.id,
      });
    }
    await Comment.deleteMany({ _id: { $in: post.comments } });
    if (!post) {
      throw new Error("Post not found.");
    }
    await deleteImage(post.image.public_id);
    revalidatePath(`/${post.campId}/explore/lost`);
    revalidatePath(`/history`);
    return { success: true, message: "Deleted successful" };
  } catch (err) {
    console.log(err);
    return { error: true, message: "Something went wrong, try again later." };
  }
};

export const createComment = async (formData) => {
  const session = await getServerSession(authOptions);
  const { content, postId, reply, tag, campusId } = formData;
  try {
    if (!session) {
      return { error: true, message: "Unauthorized." };
    }
    await connectDB();
    if (!content || !postId)
      return { error: true, message: "Content is required." };

    const findPost = await Post.findById(postId);
    if (!findPost) return { error: true, message: "The post does not exits." };

    if (reply) {
      const comment = await Comment.findOne({ postId: postId });
      if (!comment)
        return { error: true, message: "The comment does not exits." };
    }
    const newComment = new Comment({
      user: session.user.id,
      content,
      tag,
      reply,
      postId,
    });

    await Post.findOneAndUpdate(
      { _id: postId },
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    );

    await newComment.save();
    revalidatePath(`/${campusId}/explore/lost/detail/${postId}`);
    return { success: true, message: "Comment successful" };
  } catch (err) {
    console.log(err);
    return { error: true, message: "Something went wrong, try again later." };
  }
};

export const deleteComment = async (formData) => {
  const session = await getServerSession(authOptions);
  const { commentId, campusId, postId } = formData;
  try {
    if (!session) {
      return { error: true, message: "Unauthorized." };
    }
    const comment = await Comment.findOneAndDelete({
      _id: commentId,
      user: session.user.id,
    });

    await Post.findOneAndUpdate(
      { _id: comment.postId },
      {
        $pull: { comments: commentId },
      }
    );
    revalidatePath(`/${campusId}/explore/lost/detail/${postId}`);
    return { success: true, message: "Deleted comment successful" };
  } catch (err) {
    console.log(err);
    return { error: true, message: "Something went wrong, try again later." };
  }
};

export const editReport = async (formData) => {
  const session = await getServerSession(authOptions);
  const {
    title,
    detail,
    location,
    subLocation,
    contact,
    image,
    campusId,
    reportId,
    oldImage,
    status,
    owner,
  } = Object.fromEntries(formData);

  try {
    await connectDB();
    if (status === "claimed" && !owner) {
      throw new Error("Owner is required.");
    }
    let res;
    if (image && image !== "undefined") {
      const fileData = await bufferFile(image);
      res = await uploadImageToCloudinary(fileData);
      await fs.unlink(fileData.filepath);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (res) {
        await deleteImage(oldImage);
      }
    }

    let report;
    if (session && session.user.role === "admin") {
      report = await Report.findOne({
        _id: reportId,
      });
    } else {
      report = await Report.findOne({
        _id: reportId,
        user: session.user.id,
      });
    }

    if (!report) {
      throw new Error("Report not found.");
    }
    if (report.campId !== campusId)
      throw new Error("Campus ID does not match.");
    if (owner && status === "claimed") {
      report.owner = owner;
    }
    if (status === "unclaimed") {
      report.owner = null;
    }
    report.status = status;
    report.title = title;
    report.detail = detail;
    report.location = location;
    report.subLocation = subLocation;
    report.contact = contact;
    report.campId = campusId;
    report.image = {
      public_id: image ? res.public_id : report.image.public_id,
      url: image ? res.url : report.image.url,
    };
    await report.save();
    revalidatePath(`/${report.campId}/explore/found`);
    revalidatePath(`/${report.campId}/explore/found/edit/${reportId}`);
    return { success: true, message: "Edited successful" };
  } catch (err) {
    console.log(err);
    return { error: true, message: "Something went wrong, try again later." };
  }
};

export const deleteReport = async (reportId) => {
  const session = await getServerSession(authOptions);
  try {
    await connectDB();

    let report;
    if (session && session?.user?.role === "admin") {
      report = await Report.findOneAndDelete({
        _id: reportId,
      });
    } else {
      report = await Report.findOneAndDelete({
        _id: reportId,
        user: session.user.id,
      });
    }
    if (!report) {
      throw new Error("Report not found.");
    }
    await deleteImage(report.image.public_id);
    revalidatePath(`/${report.campId}/explore/found`);
    revalidatePath(`/history`);
    return { success: true, message: "Deleted successful" };
  } catch (err) {
    console.log(err);
    return { error: true, message: "Something went wrong, try again later." };
  }
};

export const updateUserRole = async ({ userId, role }) => {
  const session = await getServerSession(authOptions);
  try {
    await connectDB();
    if (!session) throw new Error("Unauthorized.");
    if (!["admin", "user"].includes(role)) {
      throw new Error("Invalid role.");
    }
    if (session && session.user.role !== "admin")
      throw new Error("Permission denied.");
    const user = await User.findById(userId);
    const checkUser = await user._doc;
    if (!checkUser) throw new Error("User not found.");
    if (String(checkUser._id) === session.user.id)
      throw new Error("Access denied");

    user.role = role;
    await user.save();
    return { success: true, message: "Updated role successful" };
  } catch (err) {
    console.log(err);
    return { error: true, message: "Something went wrong, try again later." };
  }
};

export const updateUserStatus = async ({ userId, status, remark }) => {
  const session = await getServerSession(authOptions);
  try {
    await connectDB();
    if (!session) throw new Error("Unauthorized.");
    if (!["ACTIVE", "INACTIVE"].includes(status)) {
      throw new Error("Invalid status.");
    }
    if (session && session.user.role !== "admin")
      throw new Error("Permission denied.");
    if (status === "INACTIVE" && (!remark || remark === "")) {
      return { error: true, message: "Remark is required." };
    }
    const user = await User.findById(userId);
    const checkUser = await user._doc;
    if (!checkUser) throw new Error("User not found.");
    if (String(checkUser._id) === session.user.id)
      throw new Error("Access denied");

    user.status = status;
    user.remark = remark;
    await user.save();
    return { success: true, message: "Updated user status successful" };
  } catch (err) {
    console.log(err);
    return { error: true, message: "Something went wrong, try again later." };
  }
};

export const addLocation = async (formData) => {
  const session = await getServerSession(authOptions);
  const { locationName, lat, lng, campId } = formData;
  try {
    if (!session) {
      return { error: true, message: "Unauthorized." };
    }
    if (session && session.user.role !== "admin") {
      return { error: true, message: "Permission denied." };
    }
    await connectDB();
    if (!locationName || !lat || !lng || !campId) {
      return { error: true, message: "Fields are required." };
    }
    const isDuplicateName = await Location.findOne({ name: locationName });
    if (isDuplicateName) {
      return { error: true, message: "Location name is duplicated." };
    }
    const location = await new Location({
      name: locationName,
      campId,
      lat: lat.toFixed(6),
      lng: lng.toFixed(6),
    });
    await location.save();
    revalidatePath(`/admin/location/${location.campId}`);
    return { success: true, message: "Added successful" };
  } catch (err) {
    console.log(err);
    return { error: true, message: "Something went wrong, try again later." };
  }
};

export const deleteLocation = async (locationId) => {
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      return { error: true, message: "Unauthorized." };
    }
    if (session && session.user.role !== "admin") {
      return { error: true, message: "Permission denied." };
    }
    await connectDB();
    const location = await Location.findOneAndDelete({
      _id: locationId,
    });
    if (!location) {
      throw new Error("Location not found.");
    }
    revalidatePath(`/admin/location/${location.campId}`);
    return { success: true, message: "Deleted successful" };
  } catch (err) {
    console.log(err);
    return { error: true, message: "Something went wrong, try again later." };
  }
};

export const updateLocation = async ({ locationId, name, lat, lng }) => {
  const session = await getServerSession(authOptions);
  try {
    await connectDB();
    if (!session) return { error: true, message: "Unauthorized." };
    if (session && session.user.role !== "admin")
      return { error: true, message: "Permission denied." };
    if (!name || !lat || !lng) {
      return { error: true, message: "Fields are required." };
    }
    const isDuplicateName = await Location.findOne({ name: name });
    if (isDuplicateName && String(isDuplicateName._id) !== locationId) {
      return { error: true, message: "Location name is duplicated." };
    }
    const location = await Location.findOneAndUpdate(
      { _id: locationId },
      {
        name,
        lat: lat.toFixed(6),
        lng: lng.toFixed(6),
      },
      { new: true }
    );
    if (!location) return { error: true, message: "Location not found." };
    return { success: true, message: "Updated location successful" };
  } catch (err) {
    console.log(err);
    return { error: true, message: "Something went wrong, try again later." };
  }
};

export const addLocationByAPI = async (locationNameList, campId) => {
  const session = await getServerSession(authOptions);
  try {
    if (!session) {
      return { error: true, message: "Unauthorized." };
    }
    if (session && session.user.role !== "admin") {
      return { error: true, message: "Permission denied." };
    }
    await connectDB();
    if (locationNameList.length === 0 || !campId) {
      return { error: true, message: "Data not found." };
    }
    locationNameList.forEach(async (facNameThai) => {
      const filter = { name: facNameThai };
      const update = {
        name: facNameThai,
        campId: campId,
        $setOnInsert: {
          lat: 0,
          lng: 0,
        },
      };
      const options = { upsert: true, new: true };
      await Location.findOneAndUpdate(filter, update, options);
    });
    revalidatePath(`/admin/location/${campId}`);
    return { success: true, message: "Added successful" };
  } catch (err) {
    console.log(err);
    return { error: true, message: "Something went wrong, try again later." };
  }
};

export const backToHome = () => {
  cookies().delete("next-auth.callback-url");
  cookies().delete("next-auth.csrf-token");
  cookies().delete("next-auth.session-token");
  cookies().delete("__Secure-next-auth.callback-url");
  cookies().delete("__Host-next-auth.csrf-token");
  cookies().delete("__Secure-next-auth.session-token");
  redirect("/");
};
