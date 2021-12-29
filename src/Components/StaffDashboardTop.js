import { getArticleExport } from "../DatabaseInteraction/db";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import "../CSS/App.css";
import "../CSS/Form.css";
import StaffDashboardGauge from "./StaffDashboardGauge";

export default function StaffDashboardTop(props) {
  const [Articles, setArticles] = useState();
  const pagesToFillNeeded = 6; //Self-determinated as no further information was given
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
  const completionRate = (size / pagesToFillNeeded) * 100;
  const completionRateRounded = Math.round(completionRate * 10) / 10; //Rounding to once decimal

  // Information for Gauge
  const label = "Completion Rate";
  const Min = 0;
  const Max = 100;
  const pointerColor = "normal";

  return (
    <>
      <form className="form-staff1">
        <div className="form-inputs">
          <div className="form-inputs1">
            <p style={{ fontSize: "20px", color: "#5a535c" }}>Pages Needed:</p>
            <button className="staff--btn1">{pagesToFillNeeded}</button>
          </div>
        </div>
      </form>
      <StaffDashboardGauge
        Label={label}
        Value={completionRateRounded}
        Min={Min}
        Max={Max}
        PointerColor={pointerColor}
      />
    </>
  );
}
