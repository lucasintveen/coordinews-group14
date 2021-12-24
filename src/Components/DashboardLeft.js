import { getArticle, getArticles } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";

import Spinner from "react-bootstrap/Spinner";

import "../App.css";
import Parse from "parse";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../CSS/Form.css";

export default function DashboardLeft(props) {
  const [Articles, setArticles] = useState();
  const pagesNeeded = 6;
  useEffect(() => {
    getArticles().then((Articles) => {
      const articlesMapped = Articles.map((wrapper) => {
        const mappedArticle = {
          Details: wrapper.id,
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
  function sizeCalculation() {
    var articleSize = 0;
    for (let i = 0; i < filteredArticles.length; i++) {
      if (filteredArticles[i].Size === "L") {
        articleSize += 2;
      } else if (filteredArticles[i].Size === "M") {
        articleSize += 1;
      } else if (filteredArticles[i].Size === "S") {
        articleSize += 0.5;
      }
    }
    return articleSize;
  }
  const size = sizeCalculation();
  const completionRate = (size / pagesNeeded) * 100;
  const completionRateRounded = Math.round(completionRate * 10) / 10;
  return (
    <div>
      <h1>Pages Needed: {pagesNeeded}</h1>
      <h1>Completion Rate: {completionRateRounded} %</h1>
    </div>
  );
}
