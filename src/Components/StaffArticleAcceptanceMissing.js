import { getArticles } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "../CSS/App.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../CSS/Form.css";

export default function StaffArticleAcceptanceMissing(props) {
  const [Articles, setArticles] = useState();
  useEffect(() => {
    getArticles().then((Articles) => {
      const articlesMapped = Articles.map((wrapper) => {
        const mappedArticle = {
          Details: wrapper.id,
          Title: wrapper.attributes.Title,
          Section: wrapper.attributes.Section,
          Finished: wrapper.attributes.Finished,
          Deadline: wrapper.attributes.Deadline,
          Size: wrapper.attributes.Size,
          JournalistAccepted: wrapper.attributes.JournalistAcc,
        };

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
  const filteredArticles = Object.values(Articles).filter((article) => {
    if (article.JournalistAccepted === false) {
      console.log("The article finisher");
      console.log("Return Statement Test: ", article);
      return article;
    }
  });
  return (
    <table class="table-staff table-hover">
      <tbody>
        <tr>
          {Object.keys(Articles[0])
            .slice(0, 3)
            .map((articleHeader) => (
              <th>{articleHeader} </th>
            ))}
        </tr>
        {filteredArticles.map((article) => (
          <tr>
            <td as={Link} to="/Add_Article">
              <Button
                variant="light"
                as={Link}
                to={"/articles/articleDetails/" + article.Details}
              >
                See more{"\uD83D\uDD0D"}
              </Button>
            </td>
            <td>{article.Title}</td>
            <td>{article.Section}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
