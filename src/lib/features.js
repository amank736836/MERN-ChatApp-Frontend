import moment from "moment";

const fileFormat = (url = "") => {
  const fileExtension = url.split(".").pop().toLowerCase();

  if (
    fileExtension === "mp4" ||
    fileExtension === "webm" ||
    fileExtension === "ogg"
  ) {
    return "video";
  }
  if (
    fileExtension === "mp3" ||
    fileExtension === "wav" ||
    fileExtension === "aac"
  ) {
    return "audio";
  }
  if (
    fileExtension === "jpg" ||
    fileExtension === "jpeg" ||
    fileExtension === "png" ||
    fileExtension === "gif"
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

export { fileFormat, transformImageUrl, getLast7Days };
