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

    const post = await Post.findOne({ _id: postId, user: session.user.id });

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

    const post = await Post.findOneAndDelete({
      _id: postId,
      user: session.user.id,
    });
    // await Comments.deleteMany({ _id: { $in: post.comments } });
    if (!post) {
      throw new Error("Post not found.");
    }
    await deleteImage(post.image.public_id);
    revalidatePath(`/${post.campId}/explore/lost`);
    return { success: true, message: "Deleted successful" };
  } catch (err) {
    console.log(err);
    return { error: true, message: "Something went wrong, try again later." };
  }
};

export const createComment = async (formData) => {
  const { content, postId } = formData;
};
