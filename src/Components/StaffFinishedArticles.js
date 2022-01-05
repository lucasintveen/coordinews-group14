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
  const filteredArticles = Object.values(Articles).filter((article) => {
    if (article.Completion === "Yes") {
      var currentDate = props.Today.length;
      var today = props.Today;
      if (currentDate < 10) {
        today = new Date();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        if (month.toString().length === 1) {
          month = "0" + month;
        }
        if (day.toString().length === 1) {
          day = "0" + day;
        }
        today = today.getFullYear() + "-" + month + "-" + day;
      }
      return article.Deadline.includes(today);
    }
  });
  console.log("Dashboard filter", filteredArticles);

  return (
    <>
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
    </>
  );
}
