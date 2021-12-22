import React, { useState } from "react";
import "../CSS/Form.css";
import { getArticles } from "../DatabaseInteraction/db";
import AddIdea from "./AddArticle";
import ArticleId from "./ArticleId";
import FormSuccess from "./FormSuccess";
import Idea from "../Images/Bulb.png";
import { FaTrash, FaShareAlt, FaArrowLeft } from "react-icons/fa";
import News from "../Images/News.png";
import FormDeletion from "./FormDeletion";

const Form = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  function deleteArticle() {
    setIsDeleted(!isDeleted);
  }

  const formTypeArticle = true;

  const [childData, setChildData] = useState("");
  const passedArticleId = childData[0];

  console.log("Deletion State:", isDeleted);
  console.log("Submission State: ", isSubmitted);

  return (
    <>
      <div className="form-container">
        {!isSubmitted ? (
          <span className="trash-btn">
            <FaTrash />
            <FaShareAlt />
          </span>
        ) : (
          <span className="trash-btn">
            <FaArrowLeft />
          </span>
        )}

        <span className="Id--expiration">Article ID: {passedArticleId}</span>
        <div className="form-content-left">
          <img className="form-img" src={News} alt="idea icon" />
        </div>
        {isDeleted ? (
          <FormDeletion
            formType={formTypeArticle}
            submitForm={submitForm}
            articleId={passedArticleId}
            deleteArticle={deleteArticle}
          />
        ) : !isSubmitted ? (
          <ArticleId
            passChildData={setChildData}
            deleteArticle={deleteArticle}
          />
        ) : (
          <FormSuccess formType={formTypeArticle} />
        )}
      </div>
    </>
  );
};

export default Form;
