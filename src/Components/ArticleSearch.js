export default function articleSearch(articles, search, section, date) {
  const filteredArticles = Object.values(articles).filter((article) => {
    if (
      section.section === undefined &&
      section.journalist === undefined &&
      date === undefined
    ) {
      return article.Title.includes(search);
    } else if (
      section.journalist === undefined &&
      section.section === undefined
    ) {
      return article.Title.includes(search) && article.Deadline.includes(date);
    } else if (section.section === undefined && date === undefined) {
      return (
        article.Title.includes(search) &&
        article.Journalist.includes(section.journalist)
      );
    } else if (section.journalist === undefined && date === undefined) {
      return (
        article.Title.includes(search) &&
        article.Section.includes(section.section)
      );
    } else if (section.section === undefined) {
      article.Title.includes(search) &&
        article.Journalist.includes(section.journalist) &&
        article.Deadline.includes(date);
    } else if (section.journalist === undefined) {
      article.Title.includes(search) &&
        article.Section.includes(section.section) &&
        article.Deadline.includes(date);
    } else if (
      section.section !== undefined &&
      section.journalist !== undefined &&
      date !== undefined
    ) {
      return (
        article.Title.includes(search) &&
        article.Section.includes(section.section) &&
        article.Journalist.includes(section.journalist) &&
        article.Deadline.includes(date)
      );
    } else {
      return [];
    }
  });
  return filteredArticles;
}
