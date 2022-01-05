export default function ideaSearch(ideas, search, section, date) {
  const filteredIdeas = Object.values(ideas).filter((idea) => {
    if (
      section.section === undefined &&
      section.Source === undefined &&
      date === undefined
    ) {
      return idea.Title.includes(search);
    } else if (section.Source === undefined && section.section === undefined) {
      return idea.Title.includes(search) && idea.Expiration.includes(date);
    } else if (section.section === undefined && date === undefined) {
      return (
        idea.Title.includes(search) && idea.Source.includes(section.Source)
      );
    } else if (section.Source === undefined && date === undefined) {
      return (
        idea.Title.includes(search) && idea.Section.includes(section.section)
      );
    } else if (section.section === undefined) {
      idea.Title.includes(search) &&
        idea.Source.includes(section.Source) &&
        idea.Expiration.includes(date);
    } else if (section.Source === undefined) {
      idea.Title.includes(search) &&
        idea.Section.includes(section.section) &&
        idea.Expiration.includes(date);
    } else if (
      section.section !== undefined &&
      section.Source !== undefined &&
      date !== undefined
    ) {
      return (
        idea.Title.includes(search) &&
        idea.Section.includes(section.section) &&
        idea.Source.includes(section.Source) &&
        idea.Expiration.includes(date)
      );
    } else {
      return [];
    }
  });
  return filteredIdeas;
}
