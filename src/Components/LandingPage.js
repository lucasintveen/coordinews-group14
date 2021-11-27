import Parse from "parse";
import { useNavigate } from "react-router-dom";
import LandingPageLogo from "../Images/Coordinews.png";
import "../App.css";
import { Container } from "react-bootstrap";

export default function LandingPage() {
  const navigate = useNavigate();

  if (Parse.User.current()) {
    navigate("/ideas");
  }

  return (
    <div className="splitScreenLanding">
      <img
        src={LandingPageLogo}
        width="auto"
        height="auto"
        alt="Coordinews-Logo"
        className="leftPaneLanding"
      />

      <div className="rightPaneLanding">
        <h3>
          Cooperate like never before - concentrate on the things that really
          matter to you
        </h3>
        <h5>
          The software solution for your newspaper is here. Coordinews ensures
          planning reliability for you and your team from the very first step.
          With our End to End solution we offer a coordinative approach from the
          first idea to the finished article for your newspaper, blog or other
          publication.
        </h5>
      </div>
    </div>
  );
}
