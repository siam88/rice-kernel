export function isMacintosh() {
  return navigator.userAgentData.platform.indexOf("Mac") > -1;
}

export function isWindows() {
  //   return navigator.userAgentData.platform.indexOf("Win") > -1;
  return true;
}

export const safeParseJSON = (message) => {
  try {
    return JSON.parse(message);
  } catch (error) {
    return null;
  }
};

export async function downloadImage(imageSrc) {
  const image = await fetch(imageSrc);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = `output-${new Date().getMilliseconds()}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadObjectAsJson(exportObj, exportName) {
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}
