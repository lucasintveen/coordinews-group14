import React from "react";
import "../CSS/Form.css";
import { useEffect, useState } from "react";
import Parse from "parse";
import HomeArt from "../Components/HomeTodaysArticles";
import NewsBBC from "../APIInteraction/APIBBC";
import NewsNYT from "../APIInteraction/APINewYorkTimes";
import BBCLogo from "../Images/BBC_News.svg.png";
import NYTLogo from "../Images/New York Times.png";
import HomeUserMessages from "../Components/HomeUserMessages";
import Spinner from "react-bootstrap/Spinner";

export default function Home() {
  var today = new Date();
  var month = today.getMonth() + 1;
  var dateToday1 = today.getDate() + "-" + month + "-" + today.getFullYear();
  console.log("User:", Parse.User.current());
  var User = Parse.User.current();

  if (User === null) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="form-container-home">
      <span className="staff--heading4">
        Hey {Parse.User.current().attributes.username}, these article await you
        today:
      </span>
      <span className="staff--heading1">Edition for the: {dateToday1}</span>
      <span className="staff--heading2">
        Furthermore, please respond to these task requests:
      </span>

      <span className="text-cloud-center">
        Stay up-to-date with the news of the day:
      </span>
      <img className="APILogo1" src={BBCLogo}></img>
      <img className="APILogo2" src={NYTLogo}></img>
      <div className="form-content-left-editor">
        <form className="form-split5">
          <HomeArt />
          <HomeUserMessages />
        </form>
      </div>
      <div className="form-content-right-home">
        <NewsBBC />
        <NewsNYT />
      </div>
    </div>
  );
}
