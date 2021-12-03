import Parse from "parse";

async function getUsers() {
  const User = Parse.Object.extend("User");
  const queryUser = new Parse.Query(User);

  return await queryUser.findAll();
}

async function getArticles() {
  const Article = Parse.Object.extend("Article");
  const queryArticle = new Parse.Query(Article);

  return await queryArticle.findAll();
}

async function getPhotographer() {
  const Photographer = Parse.Object.extend("Photographer");
  const queryPhotographer = new Parse.Query(Photographer);

  return await queryPhotographerfindAll();
}

async function getJournalist() {
  const Journalist = Parse.Object.extend("Journalist");
  const queryJournalist = new Parse.Query(Journalist);

  return await queryJournalistfindAll();
}


async function uploadArticle(articles) {
  return await Promise.all(
    articles.map((article) => {
      try {
        const Article = Parse.Object.extend("Article");
        const newArticle = new Article();
        newArticle.set("Title", article.title);
        newArticle.set("Section", article.section);
        newArticle.set("Journalist", article.journalist);
        newArticle.set("Photographer", article.photographer);

        return newArticle.save();
      } catch (error) {
        alert(error);
        return Promise.reject("something went wrong");
      }
    })
  );
}

export { getUsers, getArticles, getPhotographer, getJournalist, uploadArticle };