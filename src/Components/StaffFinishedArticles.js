import { getArticleExport } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "../CSS/App.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../CSS/Form.css";

export default function StaffFinishedArticles(props) {
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
  console.log("Article Check: ", Articles);
  const filteredArticles = Object.values(Articles).filter((article) => {
    if (article.Finished === true) {
      console.log("The article finisher");
      console.log(
        "Return Statement Test: ",
        props.Today,
        article.Deadline.includes(props.Today)
      );
      return article.Deadline.includes(props.Today);
    }
  });

  filteredArticles.map((article) => console.log("mapping: ", article.Title));
  console.log("Filtered Art: ", filteredArticles);
  return (
    <table class="table-staff table-hover">
      <tbody className="tbody--staff">
        <tr>
          {Object.keys(Articles[0])
            .slice(0, 3)
            .map((articleHeader) => (
              <th>{articleHeader} </th>
            ))}
        </tr>
        {filteredArticles.map((article) => (
          <tr>
            <td>
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
