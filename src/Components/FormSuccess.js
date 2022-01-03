import React from "react";
import "../CSS/Form.css";
import { FaLongArrowAltLeft } from "react-icons/fa";

export default function FormSuccess(props) {
  function submit() {
    props.submit(false);
  }
  console.log("Props", props);
  console.log("Type:", props.formTypeIdea);
  var idea;
  if (props.state === "idea") {
    idea = true;
  }

  return (
    <>
      <div className="form-content-right">
        <a href="/#/ideas">
          <span className="arrow-btn" href="/">
            <FaLongArrowAltLeft onClick={submit} />
          </span>
        </a>
        {idea ? (
          <h1 className="form-success">
            You have successfully added the idea.
          </h1>
        ) : (
          <h1 className="form-success">TEST 123</h1>
        )}
      </div>
    </>
  );
}
