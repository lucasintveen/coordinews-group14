import { getArticleExport } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "../CSS/App.css";
import Parse from "parse";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../CSS/Form.css";

export default function HomeTodaysArticles(props) {
  const [Articles, setArticles] = useState();
  const missingArticles = [
    {
      Title: "No Articles",
      Section: "To",
      State: "Display",
    },
    {
      Title: "Contact",
      Section: "the",
      State: "Editor",
    },
  ];

  async function getArticlesFromDb() {
    const Articles = await getArticleExport();
    setArticles(Articles.articlesMapped);
  }
  useEffect(() => {
    getArticlesFromDb();
  }, []);

  if (!Articles) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  // filtering relevant and already accepted articles for the specific user logged in
  const filteredArticles = Object.values(Articles).filter((article) => {
    if (
      Parse.User.current().attributes.role === "Journalist" &&
      article.JournalistAcc === true &&
      article.Completion === "No"
    ) {
      return article.Journalist.includes(
        Parse.User.current().attributes.username
      );
    } else if (
      Parse.User.current().attributes.role === "Photographer" &&
      article.PhotographerAcc === true
    ) {
      return article.Photographer.includes(
        Parse.User.current().attributes.username
      );
    } else if (
      Parse.User.current().attributes.role === "Assistant" &&
      article.AssistantAcc === true
    ) {
      return article.Assistant.includes(
        Parse.User.current().attributes.username
      );
    } else if (Parse.User.current().attributes.Role === "Editor") {
      return article.Assistant.includes(
        Parse.User.current().attributes.username
      );
    } else {
      return missingArticles;
    }
  });

  return (
    <>
      <table className="table-home">
        <tbody className="tbody--home">
          <tr>
            {Object.keys(Articles[0])
              .slice(0, 4)
              .map((articleHeader) => (
                <th key={articleHeader} className="th-messages">
                  {articleHeader}{" "}
                </th>
              ))}
          </tr>
          {filteredArticles.map((article) => (
            <tr>
              <Button
                variant="light"
                as={Link}
                to={"/articles/articleDetails/" + article.Details}
              >
                See more{"\uD83D\uDD0D"}
              </Button>
              <td className="td-messages">{article.Title}</td>
              <td className="td-messages">{article.Section}</td>
              <td className="td-messages">{article.State}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
