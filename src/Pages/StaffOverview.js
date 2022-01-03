import React from "react";
import "../CSS/Form.css";
import DashboardLeft1 from "../Components/StaffDashboardTop";
import DashboardLeft2 from "../Components/StaffDashboardBottom";
import StaffArt from "../Components/StaffFinishedArticles";
import JournalistSplit from "../Components/StaffJournalistSplit";
import PhotographerSplit from "../Components/StaffPhotographerSplit";
import AssistantSplit from "../Components/StaffAssistantSplit";
import StaffArtMissing from "../Components/StaffArticleAcceptanceMissing";
import HomeArt from "../Components/HomeTodaysArticles";

export default function StaffOverview() {
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
      <span className="staff--heading7">Journalist Acceptance Missing:</span>

      <div className="form-content-left-editor">
        <>
          <DashboardLeft1 Today={dateToday} />
          <DashboardLeft2 Today={dateToday} />
        </>
      </div>
      <div className="form-content-right-staff">
        <form className="form-split1">
          <StaffArt Today={dateToday} />
          <StaffArtMissing Today={dateToday} />
          <div className="form-inputs10">
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
}
