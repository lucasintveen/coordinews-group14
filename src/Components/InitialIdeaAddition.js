import React, { useState } from "react";
import "../CSS/Form.css";
import IdeaId from "./IdeaId";
import FormSuccess from "./FormSuccess";
import News from "../Images/News.png";
import "../CSS/Form.css";
import { FaTrash, FaShareAlt } from "react-icons/fa";
import AddIdea from "./AddIdea";

const InitalIdeaAddition = () => {
  const [childData, setChildData] = useState("");
  console.log("Child Data: ", childData);
  console.log("Id: ", childData[0]);
  const submitter = childData[2];

  return (
    <>
      <div className="form-container">
        <div className="form-content-left">
          <img className="form-img" src={News} alt="news icon" />
        </div>
        {!submitter ? <AddIdea /> : <FormSuccess />}
      </div>
    </>
  );
};

export default InitalIdeaAddition;
