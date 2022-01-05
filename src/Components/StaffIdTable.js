import { getArticleExport } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "../CSS/App.css";
import Parse from "parse";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../CSS/Form.css";

export default function StaffIdTable(props) {
  const [Articles, setArticles] = useState();

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

  //filtering relevant and already accepted articles for the specific user logged in
  const filteredArticles = Object.values(Articles).filter((article) => {
    if (
      article.Journalist === props.username ||
      article.Photographer === props.username ||
      article.Assistant === props.username
    ) {
      console.log("Test fulfilled");
      return article;
    }
  });

  console.log("Article", Articles);
  console.log("filtered", filteredArticles);
  console.log("User: ", Parse.User.current().attributes.role);

  return (
    <table class="table-staff-id table-hover">
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
  );
}
