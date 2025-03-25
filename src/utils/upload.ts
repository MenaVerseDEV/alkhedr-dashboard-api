import axios from "axios";
import { createReadStream } from "fs";
import { v4 } from "uuid";

export async function handleFileUpload(files:any) {  
  const fileArray = Object.values(files).map((fileArr:any) => fileArr[0]);  
  const uploadPromises = fileArray.map(async (file) => {    
    if (!file || !file.path ) {
      console.error("File path is undefined for the uploaded file.");
      return false;
    }   
    const fileStream = createReadStream(file.path);
    const fileName = `${v4()}-${file.originalname}`;
    try {
      const response = await axios.put(
        `https://storage.bunnycdn.com/${process.env.STORAGE_NAME}/${fileName}`,
        fileStream,
        {
          headers: {
            AccessKey: process.env.STORAGE_KEY,
          },
        }
      );
      if (response.data) {
        return {
          file,
          value: `https://alkhedr.b-cdn.net/${fileName}`,
        };
      } else {
        return false;
      }
    } catch (error) {      
      console.error(
        `Failed to upload file ${files[file][0].originalname}:`,
        error
      );
      return false;
    }
  });
  return Promise.all(uploadPromises);
}
