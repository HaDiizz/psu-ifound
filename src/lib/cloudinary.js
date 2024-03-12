import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET_KEY,
});

export const uploadImageToCloudinary = async (file) => {
  try {
    const result = await cloudinary.v2.uploader.upload(file.filepath, {
      folder: "PSU_iFound",
    });
    return result;
  } catch (err) {
    console.log("uploadImageToCloudinary error", err);
  }
};

export const deleteImage = async (public_id) => {
  try {
    await cloudinary.v2.uploader.destroy(public_id);
    return { message: "Deleted successful.", success: true };
  } catch (err) {
    console.log("deleteImage error", err);
    return { message: "Delete image failed.", error: true };
  }
};
