import { getArticleExport } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "../CSS/App.css";
import "../CSS/Form.css";
import StaffDashboardGauge from "./StaffDashboardGauge";

/*Chose to use a seperate component for the second dashboard, as the calculations differ significantly. 
Hence using one dashboard component wouldn't have simplified the implementation necessarily. 
Further simplification might be possible through factoring the calculations out*/
export default function StaffDashboardBottom(props) {
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
    if (
      article.JournalistAcc === true &&
      article.PhotographerAcc === true &&
      article.AssistantAcc === true
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
  const workSize = workSizeCalculation();

  function employeesSelector() {
    var employeeSelection = [];
    for (let i = 0; i < Articles.length; i++) {
      employeeSelection.push(Articles[i].Journalist);
      employeeSelection.push(Articles[i].Photographer);
      employeeSelection.push(Articles[i].Assistant);
    }
    return employeeSelection;
  }
  const employees = employeesSelector();

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const uniqueEmployees = employees.filter(onlyUnique);
  const employeeTime = uniqueEmployees.length * 7.5;
  const occupationRate = (workSize / employeeTime) * 100;
  const occupationRateRounded = Math.round(occupationRate * 10) / 10; // Rounding to one decimal

  //Information for Gauge
  const label = "Occupation Rate";
  const Min = 100;
  const Max = 0;
  const pointerColor = "twisted";
  return (
    <>
      <form className="form-staff2">
        <div className="form-inputs">
          <div className="form-inputs1">
            <p style={{ fontSize: "20px", color: "#5a535c" }}>
              Available time per Week:{" "}
            </p>
            <button variant="light" className="staff--btn2">
              {employeeTime}
            </button>
          </div>
        </div>
      </form>
      <StaffDashboardGauge
        Label={label}
        Value={occupationRateRounded}
        Min={Min}
        Max={Max}
        PointerColor={pointerColor}
      />
    </>
  );
}
