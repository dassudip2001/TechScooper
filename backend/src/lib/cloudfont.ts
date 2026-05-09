export const getImageUrl = (key: string) => {
  return `${process.env.AWS_CLOUD_FOND}/${key}`;
};
