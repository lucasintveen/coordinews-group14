import { getArticleExport } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "../CSS/App.css";
import "../CSS/Form.css";

export default function StaffPhotographerSplit(props) {
  const [Articles, setArticles] = useState();
  const workTimeDay = 7.5;
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
    if (article.PhotographerAcc === true) {
      return article;
    }
  });

  function employeesSelector() {
    var employeeSelection = [];
    for (let i = 0; i < filteredArticles.length; i++) {
      employeeSelection.push(filteredArticles[i].Photographer);
    }
    return employeeSelection;
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const employees = employeesSelector();
  const uniqueEmployees = employees.filter(onlyUnique);

  function workSizeCalculation() {
    var articleWork = 0;
    var Counter = [];
    for (let j = 0; j < uniqueEmployees.length; j++) {
      for (let i = 0; i < filteredArticles.length; i++) {
        if (filteredArticles[i].Photographer === uniqueEmployees[j]) {
          if (filteredArticles[i].Size === "L") {
            articleWork += 8;
          } else if (filteredArticles[i].Size === "M") {
            articleWork += 4;
          } else if (filteredArticles[i].Size === "S") {
            articleWork += 2;
          }
        }
      }
      Counter.push(articleWork);
      articleWork = 0;
    }
    return Counter;
  }
  const workSizePerEmp = workSizeCalculation();

  return (
    <>
      <table class="table-staff table-hover">
        <thead>
          <br></br>
          <tr>
            <th className="th-messages">Photogr. Occupation</th>
          </tr>
        </thead>
        <tbody className="tbody-messages">
          {Array.from({ length: uniqueEmployees.length }).map((_, index) => (
            <tr>
              <button variant="light" className="staff--btn">
                {uniqueEmployees[index]} : {workSizePerEmp[index]} /{" "}
                {workTimeDay}
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
