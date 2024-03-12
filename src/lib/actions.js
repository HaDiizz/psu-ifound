"use server";
import { revalidatePath } from "next/cache";
import Post from "@/models/post";
import connectDB from "./connectDB";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { uploadImageToCloudinary } from "./cloudinary";
import { bufferFile } from "@/utils/bufferFile";
import fs from "fs/promises";

export const addPost = async (formData) => {
  const session = await getServerSession(authOptions);
  const { title, detail, location, subLocation, contact, lat, lng, image } =
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
      lat,
      lng,
      contact,
      user: session.user?.id,
      image: {
        public_id: res.public_id,
        url: res.url,
      },
    });

    await newPost.save();
    revalidatePath("/01/explore");
    revalidatePath("/02/explore");
    revalidatePath("/03/explore");
    revalidatePath("/04/explore");
    revalidatePath("/05/explore");
    return { success: true, message: "Created successful" };
  } catch (err) {
    console.log(err);
    return { error: true, message: "Something went wrong, try again later." };
  }
};
