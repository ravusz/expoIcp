type SearchData = {
  name: string;
  description: string;
};

export const filterProjects = <T extends SearchData>(
  search: string | undefined,
  data: T[] | undefined,
): T[] => {
  if (!data) return [];

  return search
    ? data.filter(
        ({ name, description }) =>
          name.toLowerCase().includes(search.toLowerCase()) ||
          description.toLowerCase().includes(search.toLowerCase()),
      )
    : [...data];
};

export const groupBy = (items: any[], key: string) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {},
  );
