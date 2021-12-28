import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { NavigationBar } from "./Components/Navbar";
import Login from "./Components/Login";
import SignUp from "./Components/Signup";
import Ideas from "./Components/IdeaOverview";
import ArticleOverview from "./Pages/ArticleOverview";
import LandingPage from "./Components/LandingPage";
import Form from "./Components/Form";
import IdeaConverter from "./Components/IdeaConverter";
import Home from "./Components/Home";
import StaffOverview from "./Components/StaffOverview";
import FormSuccess from "./Components/FormSuccess";
import IdeaAdditionForm from "./Components/IdeaAdditionForm";

function App() {
  return (
    <div>
      <HashRouter basename="/">
        <NavigationBar />

        <Routes>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="ideas" element={<Ideas />} />
          <Route path="articles" element={<ArticleOverview />} />
          <Route path="staff" element={<StaffOverview />} />
          <Route path="addIdea" element={<IdeaAdditionForm />} />
          <Route
            path="/articles/articleDetails/:articleId"
            element={<Form />}
          />
          <Route
            path="/ideas/ideaDetails/:ideaId"
            element={<IdeaConverter />}
          />

          <Route path="landing" element={<LandingPage />} />
          <Route path="home" element={<Home />} />
          <Route path="deleted" element={<FormSuccess />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
