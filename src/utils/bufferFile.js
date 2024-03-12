import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";
import os from "os";

export const bufferFile = async (image) => {
  const arrBuffer = await image.arrayBuffer();
  const buffer = await Buffer.from(arrBuffer);
  const name = uuidv4();
  const ext = image.type.split("/")[1];
  const tempdir = os.tmpdir();
  const uploadDir = path.join(tempdir, "iFound/images", `${name}.${ext}`);
  fs.writeFile(uploadDir, buffer);
  return { filepath: uploadDir, filename: image.name };
};
