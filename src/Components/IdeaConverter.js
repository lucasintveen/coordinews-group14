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

const IdeaConverter = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  const [childData, setChildData] = useState("");
  console.log("Child Data: ", childData);
  console.log("Id: ", childData[0]);
  const submitter = childData[2];

  return (
    <>
      <div className="form-container">
        <span className="trash-btn">
          <FaTrash />
          <FaShareAlt />
        </span>
        <span className="Id--expiration">
          <span> (expires: {childData[1]})</span> Idea ID: {childData[0]}
        </span>
        <div className="form-content-left">
          <img className="form-img" src={News} alt="news icon" />
        </div>
        {!submitter ? <IdeaId passChildData={setChildData} /> : <FormSuccess />}
      </div>
    </>
  );
};

export default IdeaConverter;
