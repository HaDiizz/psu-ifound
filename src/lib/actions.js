"use server";
import { revalidatePath } from "next/cache";
import Report from "@/models/report";
import connectDB from "./connectDB";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { uploadImageToCloudinary } from "./cloudinary";
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

export const createComment = async (formData) => {
  const { content, postId } = formData;
};
