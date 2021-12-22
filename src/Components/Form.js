import React, { useState } from "react";
import "../CSS/Form.css";
import { getArticles } from "../DatabaseInteraction/db";
import AddIdea from "./AddArticle";
import ArticleId from "./ArticleId";
import FormSuccess from "./FormSuccess";
import Idea from "../Images/Bulb.png";
import { FaTrash, FaShareAlt } from "react-icons/fa";
import News from "../Images/News.png";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  const formTypeArticle = true;

  const [childData, setChildData] = useState("");
  console.log("Child Data: ", childData);
  console.log("Id: ", childData[0]);
  return (
    <>
      <div className="form-container">
        <span className="trash-btn">
          <FaTrash />
          <FaShareAlt />
        </span>
        <span className="Id--expiration">Article ID: {childData[0]}</span>
        <div className="form-content-left">
          <img className="form-img" src={News} alt="idea icon" />
        </div>
        {!isSubmitted ? (
          <ArticleId submitForm={submitForm} passChildData={setChildData} />
        ) : (
          <FormSuccess />
        )}
      </div>
    </>
  );
};

export default Form;
