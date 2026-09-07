export const getImageUrl = (path: string): string => {
  const fileName = path.split('/').pop();
  return new URL(`../given/assets/images/${fileName}`, import.meta.url).href;
};