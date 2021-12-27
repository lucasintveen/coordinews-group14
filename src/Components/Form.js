import React, { useState } from "react";
import "../CSS/Form.css";
import ArticleId from "./ArticleId";
import FormSuccess from "./FormSuccess";
import { FaTrash, FaShareAlt, FaArrowLeft } from "react-icons/fa";
import News from "../Images/News.png";
import FormDeletion from "./FormDeletion";

const Form = () => {
  const [isDeleter, setIsDeleter] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submit, setSubmit] = useState("");
  const [submitter, setSubmitter] = useState(false);
  const formTypeArticle = true;
  const submission = true;

  const [childData, setChildData] = useState("");
  const passedArticleId = childData[0];

  console.log("Deletion State:", isDeleter);
  console.log("Submission State: ", submitter);

  return (
    <>
      <div className="form-container">
        {!isSubmitted ? null : (
          <span className="trash-btn">
            <FaArrowLeft />
          </span>
        )}

        <span className="Id--expiration">Article ID: {passedArticleId}</span>
        <div className="form-content-left">
          <img className="form-img" src={News} alt="idea icon" />
        </div>
        {isDeleter ? (
          <FormDeletion
            formType={formTypeArticle}
            isSubmitter={setSubmitter}
            articleId={passedArticleId}
            isDeleter={setIsDeleter}
          />
        ) : submitter ? (
          <>
            <FormSuccess formType={formTypeArticle} isDeleter={setIsDeleter} />
            <ArticleId isSubmitter={submission} />
          </>
        ) : (
          <ArticleId
            passChildData={setChildData}
            isDeleter={setIsDeleter}
            isSubmitter={submitter}
          />
        )}
      </div>
    </>
  );
};

export default Form;
