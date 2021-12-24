import React, { useState } from "react";
import "../CSS/Form.css";

import "../CSS/Form.css";
import { FaTrash, FaShareAlt } from "react-icons/fa";
import Parse from "parse";

import SecondAPI from "./SecondAPI";
import DashboardLeft1 from "./DashboardLeft1";
import DashboardLeft2 from "./DashboardLeft2";
import StaffArt from "./StaffArt";
import JournalistSplit from "./JournalistSplit";

const StaffOverview = () => {
  var today = new Date();
  var dateToday =
    today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();

  return (
    <>
      <div className="form-container-home">
        <span className="Id--expiration">Newspaper for the {dateToday}</span>

        <div className="form-content-left-editor">
          {
            <>
              <DashboardLeft1 Today={dateToday} />
              <DashboardLeft2 Today={dateToday} />
            </>
          }
        </div>
        <div className="form-content-right-editor">
          <StaffArt Today={dateToday} />

          <JournalistSplit Today={dateToday} />
        </div>
      </div>
    </>
  );
};

export default StaffOverview;
