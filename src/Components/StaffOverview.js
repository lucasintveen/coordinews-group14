import React from "react";
import "../CSS/Form.css";
import "../CSS/Form.css";
import DashboardLeft1 from "./DashboardLeft1";
import DashboardLeft2 from "./DashboardLeft2";
import StaffArt from "./StaffArt";
import JournalistSplit from "./JournalistSplit";
import PhotographerSplit from "./PhotographerSplit";
import AssistantSplit from "./AssistantSplit";
import StaffArtMissing from "./StaffArtMissing";

const StaffOverview = () => {
  var today = new Date();
  var month = today.getMonth() + 1;
  var dateToday = today.getFullYear() + "-" + month + "-" + today.getDate();
  var dateToday1 = today.getDate() + "-" + month + "-" + today.getFullYear();
  return (
    <div className="form-container-home">
      <span className="staff--heading1">Edition for the: {dateToday1}</span>
      <span className="staff--heading2">General Employee Status Overview:</span>
      <span className="staff--heading3">Specific Employee Overview:</span>
      <span className="staff--heading4">Newspaper Status Overview:</span>
      <span className="staff--heading6">
        Finished Article for the Current Edition:
      </span>
      <span className="staff--heading7">Journalist Acceptance Missing:</span>

      <div className="form-content-left-editor">
        {
          <>
            <DashboardLeft1 Today={dateToday} />
            <DashboardLeft2 Today={dateToday} />
          </>
        }
      </div>
      <div className="form-content-right-staff">
        <form className="form-table">
          <StaffArt Today={dateToday} />
        </form>
        <form className="form-table2">
          <StaffArtMissing Today={dateToday} />
        </form>
        <form className="form-split">
          <div className="form-inputs">
            <div className="form-inputs1">
              <JournalistSplit Today={dateToday} />
              <PhotographerSplit Today={dateToday} />
              <AssistantSplit Today={dateToday} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default StaffOverview;
