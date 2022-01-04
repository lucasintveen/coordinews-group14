import {
  getArticleExport,
  getUserInformation,
} from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "../CSS/App.css";
import "../CSS/Form.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

// Staff Components are handled seperately, as the calculations differ significantly
export default function StaffJournalistSplit(props) {
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
    console.log("Users: ", Users);
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
    if (article.JournalistAcc == true) {
      return article;
    }
  });

  function employeesSelector() {
    var employeeSelection = [];
    for (let i = 0; i < filteredArticles.length; i++) {
      employeeSelection.push(filteredArticles[i].Journalist);
    }
    return employeeSelection;
  }

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const employees = employeesSelector();
  const uniqueEmployees = employees.filter(onlyUnique);
  console.log("Unique Employees:", uniqueEmployees);

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
  console.log("User filter:", filterUsers());
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
          {Array.from({ length: uniqueEmployees.slice(0, 3).length }).map(
            (_, index) => (
              <tr>
                <a href={"/#/staff/staffDetails/" + filteredUsersID[index]}>
                  <button className="staff--btn">
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
