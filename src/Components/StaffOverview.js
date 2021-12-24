import React, { useState } from "react";
import "../CSS/Form.css";
import { getArticles } from "../DatabaseInteraction/db";
import AddIdea from "./AddArticle";
import ArticleId from "./ArticleId";
import IdeaId from "./IdeaId";
import FormSuccess from "./FormSuccess";
import News from "../Images/News.png";
import "../CSS/Form.css";
import { FaTrash, FaShareAlt } from "react-icons/fa";
import Parse from "parse";
import HomeArt from "./HomeArt";
import HomeMes from "./HomeMes";
import BBCAPI from "./BBCAPI";
import SecondAPI from "./SecondAPI";
import DashboardLeft from "./DashboardLeft";

const StaffOverview = () => {
  var today = new Date();
  var dateToday =
    today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();

  return (
    <>
      <div className="form-container-home">
        <span className="Id--expiration">Newspaper for the {dateToday}</span>

        <div className="form-content-left-editor">
          {
            <>
              <DashboardLeft Today={dateToday} />
            </>
          }
        </div>
        <div className="form-content-right-editor"></div>
      </div>
    </>
  );
};

export default StaffOverview;
