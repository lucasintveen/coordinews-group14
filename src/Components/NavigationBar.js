import Parse from "parse";
import { useNavigate } from "react-router-dom";
import NewsLogo from "../Images/Logo_TID.svg";
import {
  Navigation,
  NavigationLink,
  NavigationMenu,
  NavigationBtn,
  NavigationBtnLink1,
  LogOutContainer,
} from "./NavBarElements";

export function NavigationBar() {
  const navigate = useNavigate();
  function handleSignOut(e) {
    e.preventDefault();
    Parse.User.logOut().then(navigate("/landing"));
  }

  return (
    <>
      <Navigation activeKey={window.location.pathname}>
        <NavigationLink to="/home">
          <img src={NewsLogo} alt="logo" width="100" height="auto" />
        </NavigationLink>

        {!Parse.User.current() && (
          <LogOutContainer>
            <NavigationBtn>
              <NavigationBtnLink1 to="/signup">Sign Up</NavigationBtnLink1>
            </NavigationBtn>
            <NavigationBtn>
              <NavigationBtnLink1 to="/login">Log In</NavigationBtnLink1>
            </NavigationBtn>
          </LogOutContainer>
        )}

        {Parse.User.current() && (
          <>
            <NavigationMenu>
              <NavigationLink to="/ideas" activeStyle>
                Ideas
              </NavigationLink>
              <NavigationLink to="/articles" activeStyle>
                Articles
              </NavigationLink>
              <NavigationLink to="/staff" activeStyle>
                Staff
              </NavigationLink>
            </NavigationMenu>
            <NavigationBtn>
              <NavigationBtnLink1 onClick={handleSignOut} to="/landing">
                Sign Out
              </NavigationBtnLink1>
            </NavigationBtn>
          </>
        )}
      </Navigation>
    </>
  );
}
