const slugify: (label: string) => string = (label) => {
  const route = label.replaceAll(" ", "-").toLowerCase();
  return `/${route}`;
};
export default slugify;
