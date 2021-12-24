import { getArticle, getArticles } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";

import Spinner from "react-bootstrap/Spinner";

import "../App.css";
import Parse from "parse";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../CSS/Form.css";

export default function DashboardLeft2(props) {
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
          Journalist: wrapper.attributes.Journalist,
          Photographer: wrapper.attributes.Photographer,
          Assistant: wrapper.attributes.Assistant,
          JournalistAcc: wrapper.attributes.JournalistAcc,
          PhotographerAcc: wrapper.attributes.PhotoAcc,
          AssistantAcc: wrapper.attributes.AssiAcc,
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
    if (
      article.JournalistAcc == true &&
      article.PhotographerAcc == true &&
      article.AssistantAcc == true
    ) {
      return article;
    }
  });

  console.log("Return Statement: ", filteredArticles);
  function sizeCalculation() {
    var articleSize = [];
    for (let i = 0; i < filteredArticles.length; i++) {
      articleSize.push(filteredArticles[i].Journalist);
      articleSize.push(filteredArticles[i].Photographer);
      articleSize.push(filteredArticles[i].Assistant);
    }
    return articleSize;
  }
  const employees = sizeCalculation();

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const uniqueEmployees = employees.filter(onlyUnique);
  const employeeTime = uniqueEmployees.length * 7.5;
  console.log("Unique Employees: ", uniqueEmployees);
  console.log("Employee Time: ", employeeTime);

  const completionRate = (employees / pagesNeeded) * 100;
  const completionRateRounded = Math.round(completionRate * 10) / 10;
  return (
    <div>
      <h1>Pages Needed: {pagesNeeded}</h1>
      <h1>Completion Rate: {completionRateRounded} %</h1>
    </div>
  );
}
