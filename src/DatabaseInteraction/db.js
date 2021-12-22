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

async function getArticle(articleId) {
  const query = new Parse.Query("Article");
  const article = await query.get(articleId);
  return {
    ArticleId: article.get("objectId"),
    Comment: article.get("Comment"),
    Title: article.get("Title"),
    Section: article.get("Section"),
    Journalist: article.get("Journalist"),
    Photographer: article.get("Photographer"),
    State: article.get("State"),
    Size: article.get("Size"),
    Deadline: article.get("Deadline"),
  };
}

async function getIdeas() {
  const Idea = Parse.Object.extend("Idea");
  const queryIdea = new Parse.Query(Idea);

  return await queryIdea.findAll();
}

async function getIdea(ideaId) {
  const query = new Parse.Query("Idea");
  const idea = await query.get(ideaId);
  return {
    IdeaId: idea.get("objectId"),
    Title: idea.get("title"),
    Comment: idea.get("comment"),
    Section: idea.get("section"),
    Source: idea.get("source"),
    Potential: idea.get("potential"),
    Expiration: idea.get("expiration"),
  };
}

async function getPhotographer() {
  const Photographer = Parse.Object.extend("Photographer");
  const queryPhotographer = new Parse.Query(Photographer);

  return await queryPhotographer.findAll();
}

async function getJournalist() {
  const Journalist = Parse.Object.extend("Journalist");
  const queryJournalist = new Parse.Query(Journalist);

  return await queryJournalist.findAll();
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
        newArticle.set("State", article.state);
        newArticle.set("Size", article.size);
        newArticle.set("Deadline", article.deadline);
        newArticle.set("Comment", article.comment);

        return newArticle.save();
      } catch (error) {
        alert(error);
        return Promise.reject("something went wrong");
      }
    })
  );
}

async function uploadDeletion(object) {
  return await Promise.all(
    object.map((item) => {
      try {
        const EditorCommunication = Parse.Object.extend("EditorCommunication");
        const newDeletion = new EditorCommunication();
        newDeletion.set("Type", item.type);
        newDeletion.set("Comment", item.comment);
        newDeletion.set("ArticleId", item.articleId);
        newDeletion.set("IdeaId", item.IdeaId);

        return newDeletion.save();
      } catch (error) {
        alert(error);
        return Promise.reject("something went wrong");
      }
    })
  );
}

export {
  getUsers,
  getArticles,
  getArticle,
  getIdeas,
  getIdea,
  getPhotographer,
  getJournalist,
  uploadArticle,
  uploadDeletion,
};
