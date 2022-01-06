import "./CSS/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { NavigationBar } from "./Components/NavigationBar";
import Login from "./Components/Login";
import SignUp from "./Components/Signup";
import Ideas from "./Pages/IdeaOverview";
import ArticleOverview from "./Pages/ArticleOverview";
import LandingPage from "./Pages/LandingPage";
import Form from "./Components/ArticleForm";
import IdeaConverter from "./Components/IdeaToArticleConversion";
import Home from "./Pages/Home";
import StaffOverview from "./Pages/StaffOverview";
import FormSuccess from "./Components/FormSuccess";
import IdeaAdditionForm from "./Components/IdeaAdditionForm";
import StaffIdForm from "./Components/StaffIdForm";

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
          <Route
            path="/staff/staffDetails/:staffId"
            element={<StaffIdForm />}
          />

          <Route path="/" element={<LandingPage />} />
          <Route path="landing" element={<LandingPage />} />
          <Route path="home" element={<Home />} />
          <Route path="deleted" element={<FormSuccess />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
