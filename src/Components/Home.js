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
import HomeCloud from "./HomeCloud";
import HomeUpdate from "./HomeUpdate";

const Home = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  const [childData, setChildData] = useState("");
  console.log("Child Data: ", childData);
  console.log("Id: ", childData[0]);

  return (
    <>
      <div className="form-container-home">
        <span className="Id--expiration">
          Hey {Parse.User.current().attributes.username}, this is awaiting you
          today:
        </span>
        <div className="form-content-left-home">{/* <HomeUpdate /> */}</div>
        <div className="form-content-right-home">
          <h1>Hello</h1>
          {/* <HomeCloud /> */}
        </div>
      </div>
    </>
  );
};

export default Home;
