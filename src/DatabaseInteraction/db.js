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

async function getArticleExport() {
  const Article = Parse.Object.extend("Article");
  const queryArticle = new Parse.Query(Article);
  const allArticles = await queryArticle.findAll();

  const articlesMapped = allArticles.map((article) => {
    const mappedArticle = {
      Details: article.id,
      Title: article.attributes.Title,
      Section: article.attributes.Section,
      State: article.attributes.State,
      Deadline: article.attributes.Deadline,
      Completion: article.attributes.Completion,
      Size: article.attributes.Size,
      Photographer: article.attributes.Photographer,
      Finished: article.attributes.Finished,
      Journalist: article.attributes.Journalist,
      Photographer: article.attributes.Photographer,
      Assistant: article.attributes.Assistant,
      JournalistAcc: article.attributes.JournalistAcc,
      PhotographerAcc: article.attributes.PhotoAcc,
      AssistantAcc: article.attributes.AssiAcc,
    };
    return mappedArticle;
  });

  console.log("Mapped Articles Database: ", articlesMapped);

  return {
    articlesMapped,
  };
}

async function getIdeas() {
  const Idea = Parse.Object.extend("Idea");
  const queryIdea = new Parse.Query(Idea);

  return await queryIdea.findAll();
}

async function getIdeasRefactored() {
  const Idea = Parse.Object.extend("Idea");
  const queryIdea = new Parse.Query(Idea);
  const allIdeas = await queryIdea.findAll();

  const ideasMapped = allIdeas.map((idea) => {
    const mappedIdea = {
      Details: idea.id,
      Title: idea.attributes.title,
      Section: idea.attributes.section,
      Source: idea.attributes.source,
      Potential: idea.attributes.potential,
      Expiration: idea.attributes.expiration,
    };
    return mappedIdea;
  });

  console.log("Mapped Articles Database: ", ideasMapped);

  return {
    ideasMapped,
  };
}

async function getArticle(articleId) {
  const query = new Parse.Query("Article");
  const article = await query.get(articleId);
  return {
    ArticleId: article.id,
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

async function getIdea(ideaId) {
  const query = new Parse.Query("Idea");
  const idea = await query.get(ideaId);
  console.log("Get Idea function: ", idea);
  return {
    IdeaId: idea.id,
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
        newArticle.set("Assistant", article.assistant);
        newArticle.set("State", article.state);
        newArticle.set("Size", article.size);
        newArticle.set("Deadline", article.deadline);
        newArticle.set("Comment", article.comment);
        newArticle.set("IdeaId", article.ideaId);

        return newArticle.save();
      } catch (error) {
        alert(error);
        return Promise.reject("something went wrong");
      }
    })
  );
}

async function uploadIdea(ideas) {
  return await Promise.all(
    ideas.map((idea) => {
      try {
        const Idea = Parse.Object.extend("Idea");
        const newIdea = new Idea();
        newIdea.set("title", idea.title);
        newIdea.set("section", idea.section);
        newIdea.set("source", idea.source);
        newIdea.set("expiration", idea.deadline);
        newIdea.set("comment", idea.comment);
        newIdea.set("potential", idea.potential);
        newIdea.set("article", idea.article);
        newIdea.set("visible", idea.visible);

        return newIdea.save();
      } catch (error) {
        alert(error);
        return Promise.reject("something went wrong");
      }
    })
  );
}

async function uploadDeletion(deletion) {
  console.log("Deletion Object: ", deletion);
  return await Promise.all(
    deletion.map((item) => {
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
  uploadIdea,
  getArticleExport,
  getIdeasRefactored,
};
