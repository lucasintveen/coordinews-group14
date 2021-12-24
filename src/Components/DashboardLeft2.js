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

  function workSizeCalculation() {
    var articleWork = 0;
    for (let i = 0; i < filteredArticles.length; i++) {
      if (filteredArticles[i].Size === "L") {
        articleWork += 8;
      } else if (filteredArticles[i].Size === "M") {
        articleWork += 4;
      } else if (filteredArticles[i].Size === "S") {
        articleWork += 2;
      }
    }
    return articleWork;
  }
  console.log("Filtered Art: ", filteredArticles);
  const workSize = workSizeCalculation();
  console.log("worksize: ", workSize);

  console.log("Return Statement: ", filteredArticles);
  function employeesSelector() {
    var employeeSelection = [];
    for (let i = 0; i < filteredArticles.length; i++) {
      employeeSelection.push(filteredArticles[i].Journalist);
      employeeSelection.push(filteredArticles[i].Photographer);
      employeeSelection.push(filteredArticles[i].Assistant);
    }
    return employeeSelection;
  }
  const employees = employeesSelector();

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const uniqueEmployees = employees.filter(onlyUnique);
  const employeeTime = uniqueEmployees.length * 7.5;
  console.log("Unique Employees: ", uniqueEmployees);
  console.log("Employee Time: ", employeeTime);

  const occupationRate = (workSize / employeeTime) * 100;
  const occupationRateRounded = Math.round(occupationRate * 10) / 10;
  return (
    <div>
      <h1>This week's available work time: {employeeTime}</h1>
      <h1>Occupation Rate: {occupationRateRounded} %</h1>
    </div>
  );
}
