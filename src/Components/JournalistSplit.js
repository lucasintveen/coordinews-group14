import { getArticle, getArticles } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "../App.css";
import Parse from "parse";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "../CSS/Form.css";

export default function JournalistSplit(props) {
  const [Articles, setArticles] = useState();
  const workTimeDay = 7.5;
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
    if (article.JournalistAcc == true) {
      return article;
    }
  });

  console.log("article fil: ", filteredArticles);

  function employeesSelector() {
    var employeeSelection = [];
    for (let i = 0; i < filteredArticles.length; i++) {
      employeeSelection.push(filteredArticles[i].Journalist);
    }
    return employeeSelection;
  }
  const employees = employeesSelector();
  console.log("Employees: ", employees);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const uniqueEmployees = employees.filter(onlyUnique);
  console.log("Journalists: ", uniqueEmployees);
  console.log(
    "Loop Test: ",
    filteredArticles[0].Journalist === uniqueEmployees[0]
  );

  const rowLength = filteredArticles.length;

  function workSizeCalculation() {
    var articleWork = 0;
    var Counter = [];
    for (let j = 0; j < uniqueEmployees.length; j++) {
      for (let i = 0; i < filteredArticles.length; i++) {
        if (filteredArticles[i].Journalist === uniqueEmployees[j]) {
          if (filteredArticles[i].Size === "L") {
            articleWork += 8;
          } else if (filteredArticles[i].Size === "M") {
            articleWork += 4;
          } else if (filteredArticles[i].Size === "S") {
            articleWork += 2;

            console.log(uniqueEmployees[j]);
          }
        }
      }

      console.log("Pusher", articleWork);
      Counter.push(articleWork);
      articleWork = 0;
      console.log("Counter: ", Counter);
    }
    return Counter;
  }
  console.log("Filtered Art: ", filteredArticles);
  const workSizePerEmp = workSizeCalculation();
  console.log("worksize: ", workSizePerEmp);
  console.log("Employees: ", uniqueEmployees);

  return (
    <>
      <table class="table-staff table-hover">
        <thead>
          <br></br>
          <tr>
            <th className="th-messages">Journalist Occupation</th>
          </tr>
        </thead>
        <tbody className="tbody-messages">
          {Array.from({ length: uniqueEmployees.length }).map((_, index) => (
            <tr>
              <td className="td-messages">
                {uniqueEmployees[index]} : {workSizePerEmp[index]} /{" "}
                {workTimeDay}
              </td>
            </tr>
          ))}
          <tr>Hallo</tr>
        </tbody>
      </table>
    </>
  );
}
