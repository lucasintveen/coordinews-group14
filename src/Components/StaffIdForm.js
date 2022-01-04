import React, { useState } from "react";
import "../CSS/Form.css";
import StaffID from "./StaffId";

export default function StaffIdForm() {
  const [childData, setChildData] = useState("");
  const passedStaffId = childData[0];

  return (
    <>
      <div className="form-container">
        <span className="Id--expiration">
          Staff ID: {passedStaffId} <br />
        </span>
        <StaffID passChildData={setChildData} />
      </div>
    </>
  );
}
