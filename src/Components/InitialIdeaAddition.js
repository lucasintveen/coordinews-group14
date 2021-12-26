import React, { useState } from "react";
import "../CSS/Form.css";
import FormSuccess from "./FormSuccess";
import News from "../Images/News.png";
import "../CSS/Form.css";
import AddIdea from "./AddIdea";

const InitalIdeaAddition = () => {
  const [childData, setChildData] = useState("");
  const submitter = childData;

  return (
    <>
      <div className="form-container">
        <div className="form-content-left">
          <img className="form-img" src={News} alt="news icon" />
        </div>
        {!submitter ? (
          <AddIdea passChildData={setChildData} />
        ) : (
          <FormSuccess />
        )}
      </div>
    </>
  );
};

export default InitalIdeaAddition;
