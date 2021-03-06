import LandingPageLogo from "../Images/Coordinews.png";
import "../CSS/App.css";

export default function LandingPage() {
  return (
    <div className="form-container1">
      <div className="splitScreenLanding">
        <img
          src={LandingPageLogo}
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
            With our End to End solution we offer a coordinative approach from
            the first idea to the finished article for your newspaper, blog or
            other publication.
          </h5>
        </div>
      </div>
    </div>
  );
}
