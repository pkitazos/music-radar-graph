const slugify: (label: string) => string = (label) => {
  let route = label.replaceAll(" ", "-").toLowerCase();
  return `/${route}`;
};
export default slugify;
