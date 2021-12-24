import { getArticle, getArticles } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "../App.css";
import Parse from "parse";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../CSS/Form.css";

export default function StaffArt(props) {
  const [Articles, setArticles] = useState();
  const pagesNeeded = 6;
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
    if (article.Finished == true) {
      console.log("The article finisher");
      console.log(
        "Return Statement Test: ",
        article.Deadline.includes(props.Today)
      );
      return article.Deadline.includes(props.Today);
    }
  });

  const rowLength = filteredArticles.length;
  return (
    <table class="table-messages table-hover">
      <thead>
        <br></br>
        <tr>
          {Object.keys(Articles[0])
            .slice(0, 3)
            .map((articleHeader) => (
              <th key={articleHeader} className="th-messages">
                {articleHeader}{" "}
              </th>
            ))}
        </tr>
      </thead>
      <tbody className="tbody-messages">
        {filteredArticles.map((article) => (
          <tr>
            <td as={Link} to="/Add_Article" className="td-messages">
              <Button
                variant="light"
                as={Link}
                to={"/articles/articleDetails/" + article.Details}
              >
                See more{"\uD83D\uDD0D"}
              </Button>
            </td>
            <td className="td-messages">{article.Title}</td>
            <td className="td-messages">{article.Section}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
