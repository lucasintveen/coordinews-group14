import { getArticle, getArticles } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import "../App.css";
import Popup from "./Popup";
import Parse from "parse";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../CSS/Form.css";

import { uploadArticle } from "../DatabaseInteraction/db";

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

  return (
    <form className="form">
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
            <label className="form-label">Sector</label>
            <input
              className="form-input"
              type="text"
              defaultValue={filteredArticles[0].Sector}
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
          <span style={{ color: "#D7BADD" }}>(Dummy)</span>
        </button>
        <button
          className="form-delete-btn-mes"
          type="submit"
          //   onClick={handleUpload}
        >
          Accept the tasks.
          <span style={{ color: "#D7BADD" }}>(Dummy)</span>
        </button>
      </div>
      {filteredArticles.slice(1).map((article) => (
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
      ))}
    </form>
  );
}
