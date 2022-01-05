import { treemapSquarify } from "d3";
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
      Decline: article.attributes.Decline,
    };
    return mappedArticle;
  });

  console.log("Mapped Articles Database: ", articlesMapped);

  return {
    articlesMapped,
  };
}

async function getUserInformation() {
  const User = Parse.Object.extend("User");
  const queryUser = new Parse.Query(User);
  const allUsers = await queryUser.findAll();
  const usersMapped = allUsers.map((user) => {
    const mappedUser = {
      Details: user.id,
      Title: user.attributes.username,
      Role: user.attributes.role,
    };
    return mappedUser;
  });

  console.log("Mapped Users Database: ", usersMapped);

  return {
    usersMapped,
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

async function getStaff(staffId) {
  console.log("Passed Staff Id:", staffId);
  const query = new Parse.Query("User");
  console.log("Query Staff: ", query);
  const user = await query.get(staffId);
  console.log("User", user);
  return {
    Details: user.id,
    Created:
      user.createdAt.toString().substring(8, 11) +
      user.createdAt.toString().substring(4, 8) +
      user.createdAt.toString().substring(11, 15),
    Title: user.attributes.username,
    Role: user.attributes.role,
    Image: user.attributes.Image,
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

async function editArticle(articles) {
  console.log("DB Articles:", articles);
  return await Promise.all(
    articles.map((article) => {
      try {
        const Article = new Parse.Object("Article");
        Article.set("objectId", article.ArticleId);
        Article.set("Title", article.Title);
        Article.set("Section", article.Section);
        Article.set("Journalist", article.Journalist);
        Article.set("Photographer", article.Photographer);
        Article.set("Assistant", article.Assistant);
        Article.set("State", article.State);
        Article.set("Size", article.Size);
        Article.set("Deadline", article.Deadline);
        Article.set("Comment", article.Comment);
        Article.set("IdeaId", article.IdeaId);

        return Article.save();
      } catch (error) {
        alert(error);
        return Promise.reject("something went wrong");
      }
    })
  );
}

async function submitArticle(article) {
  console.log("article received:", article);
  var journalist = true;
  var photo = true;
  var assistant = true;

  return await Promise.all(
    article.map((article) => {
      try {
        console.log("Gelaufen");
        const Article = new Parse.Object("Article");
        Article.set("objectId", article.ArticleId);
        Article.set("Title", article.Title);
        Article.set("Completion", article.Completion);
        Article.set("Section", article.Section);
        Article.set("Journalist", article.Journalist);
        Article.set("Photographer", article.Photographer);
        Article.set("Deadline", "8");
        if (article.Decline === false) {
          if (Parse.User.current().attributes.role === "Journalist") {
            journalist = true;
          } else if (Parse.User.current().attributes.role === "Editor") {
            Article.set("JournalistAcc", journalist);
            console.log("If Statement", journalist);
          } else if (Parse.User.current().attributes.role === "Photographer") {
            Article.set("PhotoAcc", photo);
          } else if (Parse.User.current().attributes.role === "Assistant") {
            Article.set("AssiAcc", assistant);
          }
        }
        Article.set("Decline", article.Decline);
        return Article.save();
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
        newIdea.set("sourcecomment", idea.sourcecomment);

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

async function uploadDecline(decline) {
  console.log("Decline Object: ", decline);
  return await Promise.all(
    decline.map((item) => {
      try {
        const EditorCommunication = Parse.Object.extend("EditorCommunication");
        const newDecline = new EditorCommunication();
        newDecline.set("Type", "Article Decline");
        newDecline.set("ArticleId", item.ArticleId);
        console.log("ArticleId", item.ArticleId);

        return newDecline.save();
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
  getStaff,
  getPhotographer,
  getJournalist,
  uploadArticle,
  uploadDeletion,
  uploadIdea,
  uploadDecline,
  getArticleExport,
  getIdeasRefactored,
  editArticle,
  submitArticle,
  getUserInformation,
};
