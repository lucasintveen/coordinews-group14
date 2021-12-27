import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { NavigationBar } from "./Components/Navbar";
import Login from "./Components/Login";
import SignUp from "./Components/Signup";
import Ideas from "./Components/Ideas";
import Articles from "./Components/Articles";
import LandingPage from "./Components/LandingPage";
import Form from "./Components/Form";
import IdeaConverter from "./Components/IdeaConverter";
import Home from "./Components/Home";
import StaffOverview from "./Components/StaffOverview";
import InitalIdeaAddition from "./Components/InitialIdeaAddition";
import FormSuccess from "./Components/FormSuccess";

function App() {
  return (
    <div>
      <HashRouter basename="/">
        <NavigationBar />

        <Routes>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="ideas" element={<Ideas />} />
          <Route path="articles" element={<Articles />} />
          <Route path="staff" element={<StaffOverview />} />
          <Route path="addIdea" element={<InitalIdeaAddition />} />
          <Route
            path="/articles/articleDetails/:articleId"
            element={<Form />}
          />
          <Route
            path="/ideas/ideaDetails/:ideaId"
            element={<IdeaConverter />}
          />

          <Route path="/Landing" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="deleted" element={<FormSuccess />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
