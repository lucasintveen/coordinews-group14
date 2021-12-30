import { getArticles, getArticleExport } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "../CSS/App.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../CSS/Form.css";

export default function StaffArticleAcceptanceMissing(props) {
  const [Articles, setArticles] = useState();

  async function getArticlesFromDb() {
    const Articles = await getArticleExport();
    setArticles(Articles.articlesMapped);
  }
  useEffect(() => {
    getArticlesFromDb();
  }, []);
  console.log("Articles: ", Articles);

  if (!Articles) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  const filteredArticles = Object.values(Articles).filter((article) => {
    if (article.JournalistAcc === false) {
      return article;
    }
  });
  console.log("Filtered: ", filteredArticles);
  filteredArticles.map((article) =>
    console.log("/articles/articleDetails/" + article.Details)
  );
  return (
    <>
      {/* <table class="table-staff table-hover">
        <tbody className="tbody-messages">
          {filteredArticles.slice(0, 2).map((article) => (
            <tr>
              <a href={"/#/articles/articleDetails/" + article.Details}>
                <button className="staff--btn">
                  {"\uD83D\uDD0D"} {article.Title}
                </button>
              </a>
            </tr>
          ))}
        </tbody>
      </table> */}
      <table class="table-staff1 table-hover">
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
    </>
  );
}
