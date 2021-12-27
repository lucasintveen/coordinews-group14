import { getArticles } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "../App.css";
import Parse from "parse";
import "../CSS/Form.css";

export default function HomeMes(props) {
  const [Articles, setArticles] = useState();

  useEffect(() => {
    getArticles().then((Articles) => {
      const articlesMapped = Articles.map((wrapper) => {
        const mappedArticle = {
          Details: wrapper.id,
          Title: wrapper.attributes.Title,
          Section: wrapper.attributes.Section,
          Journalist: wrapper.attributes.Journalist,
          Photographer: wrapper.attributes.Photographer,
          State: wrapper.attributes.State,
          Size: wrapper.attributes.Size,
          Deadline: wrapper.attributes.Deadline,
          JournalistAcceptance: wrapper.attributes.JournalistAcc,
          PhotograpberAcceptance: wrapper.attributes.PhotoAcc,
          AssistantAcceptance: wrapper.attributes.AssiAcc,
        };
        /** Add Article is not connected to database anymore .toString().slice(4, 15) */

        return mappedArticle;
      });

      setArticles(articlesMapped);
    });
  }, []);

  if (!Articles) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  console.log("article messages: ", Articles);

  const filteredArticles = Object.values(Articles).filter((article) => {
    if (
      Parse.User.current().attributes.Role === "Journalist" &&
      article.JournalistAcceptance == false
    ) {
      return article.Journalist.includes(
        Parse.User.current().attributes.username
      );
    } else if (
      Parse.User.current().attributes.Role === "Photographer" &&
      article.PhotographerAcceptance == false
    ) {
      return article.Photographer.includes(
        Parse.User.current().attributes.username
      );
    } else if (
      Parse.User.current().attributes.Role === "Assistant" &&
      article.AssistanceAcceptance == false
    ) {
      return article.Assistant.includes(
        Parse.User.current().attributes.username
      );
    } else if (Parse.User.current().attributes.Role === "Editor") {
      return article.Assistant.includes(
        Parse.User.current().attributes.username
      );
    }
  });
  const rowLength = filteredArticles.length;
  console.log("Landing Page Messages: ", filteredArticles);
  const iterationCount = 0;

  async function artAccept(i) {
    const Article = new Parse.Object("Article");
    console.log("I format: ", i);
    if (i === 0) {
      const articleset = Article[i];
      if (Parse.User.current().attributes.Role === "Journalist") {
        articleset.set("JournalistAcc", true);
      } else if (Parse.User.current().attributes.Role === "Photographer") {
        articleset.set("PhotoAcc", true);
      } else if (Parse.User.current().attributes.Role === "Assistant") {
        articleset.set("AssiAcc", true);
      }
    }
  }

  return (
    <form className="form-mes">
      <div className="form-inputs">
        <div className="form-inputs1">
          <div className="form-inputs">
            <label className="form-label">Title</label>
            <input
              className="form-input"
              type="text"
              defaultValue={filteredArticles[0].Title}
            />
          </div>

          <div className="form-inputs">
            <label className="form-label">Section</label>
            <input
              className="form-input"
              type="text"
              defaultValue={filteredArticles[0].Section}
            />
          </div>

          <div className="form-inputs">
            <label className="form-label">State</label>
            <input
              className="form-input"
              type="text"
              defaultValue={filteredArticles[0].State}
            />
          </div>
        </div>
      </div>
      <div className="form-inputs2">
        <button className="form-decline-btn-mes" type="submit">
          Decline!
        </button>
        <button
          className="form-delete-btn-mes"
          type="submit"
          onClick={artAccept(2)}
        >
          Accept the task
        </button>
      </div>

      {filteredArticles.slice(1).map((article) => (
        <>
          <div className="form-inputs">
            <div className="form-inputs1">
              <div className="form-inputs">
                <input
                  className="form-input"
                  type="text"
                  defaultValue={article.Title}
                />
              </div>

              <div className="form-inputs">
                <input
                  className="form-input"
                  type="text"
                  defaultValue={article.Section}
                />
              </div>

              <div className="form-inputs">
                <input
                  className="form-input"
                  type="text"
                  defaultValue={article.State}
                />
              </div>
            </div>
          </div>

          <div className="form-inputs2">
            <button className="form-decline-btn-mes" type="submit">
              Decline!
            </button>
            <button
              className="form-delete-btn-mes"
              type="submit"
              onClick={artAccept(3)}
            >
              Accept the task
            </button>
          </div>
        </>
      ))}
    </form>
  );
}
