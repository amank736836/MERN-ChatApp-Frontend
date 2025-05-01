import moment from "moment";

const fileFormat = (url = "") => {
  const fileExtension = url.split(".").pop().toLowerCase();

  if (
    fileExtension === "mp4" ||
    fileExtension === "webm" ||
    fileExtension === "mkv" ||
    fileExtension === "avi" ||
    fileExtension === "mov" ||
    fileExtension === "flv" ||
    fileExtension === "wmv"
  ) {
    return "video";
  }
  if (
    fileExtension === "mp3" ||
    fileExtension === "wav" ||
    fileExtension === "aac" ||
    fileExtension === "m4a" ||
    fileExtension === "flac" ||
    fileExtension === "mpeg"
  ) {
    return "audio";
  }
  if (
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "png" ||
    fileExtension === "gif" ||
    fileExtension === "webp"
  ) {
    return "image";
  }

  return "file";
};

const transformImageUrl = (url = "", width = 100) => {
  const newUrl = url.replace("upload", `upload/dpr_auto/w_${width}`);

  return newUrl;
};

const getLast7Days = () => {
  const currentDate = moment();
  const last7Days = [];

  for (let i = 0; i < 7; i++) {
    last7Days.unshift(currentDate.subtract(1, "days").format("dddd"));
  }
  return last7Days;
};

const getOrSaveFromStorage = ({ key, value, get }) => {
  if (get) {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  } else if (value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export { fileFormat, getLast7Days, getOrSaveFromStorage, transformImageUrl };
