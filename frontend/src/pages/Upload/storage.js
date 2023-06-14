import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import { trackFileInfo } from "../../utils/file";

const isImage = (fileType) => fileType.indexOf("image") === 0;
const isVideo = (fileType) => fileType.indexOf("video") === 0;

const parseMetaData = (file) => {
  return new Promise((resolve) => {
    loadImage.parseMetaData(
      file,
      function (data) {
        resolve(data)
      }
    );
  });
};

const getFilePath = (fileName, fileType) => {
  const today = new Date().toISOString();
  const filePath = `${today}/${fileName}`;
  if (isImage(fileType)) {
    return `images/${filePath}`;
  }
  if (isVideo(fileType)) {
    return `video/${filePath}`;
  }
  return `others/${filePath}`;
}

const getRef = (fileName, fileType) => {
  const filePath = getFilePath(fileName, fileType);
  return ref(storage, filePath);
};

export const uploadSingleFileToStorage = (file, metaData) => {
  const storageRef = getRef(file.name, file.type);
  // TODO: get file metadata
  return new Promise((resolve, reject) => {
    uploadBytes(storageRef, file, metaData)
      .then((result) => {
        console.log("result", result);
        resolve(true);
      })
      .catch((err) => {
        console.log("err", err);
        reject(err);
      });
  });
};

export const uploadFilesToStorage = async (files) => {
  const succeed = [];
  const failed = [];
  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    try {
      const fileData = {
        name: file.name,
        type: file.type,
        size: file.size,
        path: getFilePath(file.name, file.type),
        lastModifiedDate: file.lastModifiedDate?.toISOString(),
        exif: null,
        iptc: null
      };
      const { exif, iptc } = await parseMetaData(file);
      let exifData = { type: file.type };
      if (exif) {
        fileData.exif = exif.getAll();
        exifData = { ...exifData, ...exif.getAll() };
      }
      if (iptc) {
        fileData.iptc = iptc.getAll();
        exifData = { ...exifData, ...iptc.getAll() };
      }
      await uploadSingleFileToStorage(file, exifData);
      await trackFileInfo(fileData);
      succeed.push(file);
    } catch (error) {
      console.log("error", error);
      failed.push(file);
    }
  }
  return { succeed, failed };
};
