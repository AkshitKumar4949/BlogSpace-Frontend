export function getImageUrl(imagePath, backendUrl) {
  if (!imagePath) return "";
  if (/^https?:\/\//i.test(imagePath)) return imagePath;
  return `${backendUrl}${imagePath}`;
}
