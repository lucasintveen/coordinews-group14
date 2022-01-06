import {
  getArticleExport,
  getUserInformation,
} from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "../CSS/App.css";
import "../CSS/Form.css";

export default function StaffAssistantSplit(props) {
  const [articles, setArticles] = useState();
  const [users, setUsers] = useState();
  const workTimeDay = 7.5;
  var filteredUsersID = [];
  async function getArticlesFromDb() {
    const Articles = await getArticleExport();
    setArticles(Articles.articlesMapped);
  }
  async function getUsersFromDb() {
    const Users = await getUserInformation();
    setUsers(Users.usersMapped);
  }

  useEffect(() => {
    getArticlesFromDb();
    getUsersFromDb();
  }, []);
  if (!articles || !users) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  const filteredArticles = Object.values(articles).filter((article) => {
    if (article.AssistantAcc === true) {
      return article;
    }
  });

  function employeesSelector() {
    var employeeSelection = [];
    for (let i = 0; i < filteredArticles.length; i++) {
      if (filteredArticles[i].Assistant !== undefined) {
        employeeSelection.push(filteredArticles[i].Assistant);
      }
    }
    return employeeSelection;
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const employees = employeesSelector();
  const uniqueEmployees = employees.filter(onlyUnique);

  var today = new Date();
  var dateToday =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var currentDate = dateToday.length;
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
    dateToday = today.getFullYear() + "-" + month + "-" + day;
  }

  function workSizeCalculation() {
    var articleWork = 0;
    var Counter = [];
    for (let j = 0; j < uniqueEmployees.length; j++) {
      for (let i = 0; i < filteredArticles.length; i++) {
        if (
          filteredArticles[i].Assistant === uniqueEmployees[j] &&
          filteredArticles[i].Deadline === dateToday
        ) {
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

  function filterUsers() {
    for (let i = 0; i < uniqueEmployees.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (uniqueEmployees[i] === users[j].Title) {
          filteredUsersID.push(users[j].Details);
        }
      }
    }
    return filteredUsersID;
  }

  return (
    <>
      <table class="table-staff table-hover">
        <thead>
          <br></br>
          <tr>
            <th className="th-messages">Assistant Occupation</th>
          </tr>
        </thead>
        <tbody className="tbody-messages">
          {Array.from({ length: uniqueEmployees.slice(0, 3).length }).map(
            (_, index) => (
              <tr>
                <a href={"/#/staff/staffDetails/" + filteredUsersID[index]}>
                  <button variant="light" className="staff--btn">
                    {uniqueEmployees[index]} : {workSizePerEmp[index]} /{" "}
                    {workTimeDay}
                  </button>
                </a>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
}
