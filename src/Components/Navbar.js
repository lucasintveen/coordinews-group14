// import { Navbar, Container, Nav } from "react-bootstrap";
import Parse from "parse";
import { useNavigate } from "react-router-dom";
import NewsLogo from "../Images/Logo_TID.svg";

import { ContainerLogOut, Nav } from "./NavBarElements";
import { NavLink } from "./NavBarElements";
import { Bars } from "./NavBarElements";
import { NavMenu } from "./NavBarElements";
import { NavBtn } from "./NavBarElements";
import { NavBtnLink } from "./NavBarElements";

export function NavigationBar() {
  const navigate = useNavigate();

  function handleSignOut(e) {
    e.preventDefault();
    Parse.User.logOut().then(() => {
      navigate("/");
    });
  }

  return (
    <>
      <Nav activeKey={window.location.pathname}>
        <NavLink to="/home">
          <img src={NewsLogo} alt="logo" width="100" height="auto" />
        </NavLink>
        <Bars />

        {!Parse.User.current() && (
          <ContainerLogOut>
            <NavBtn>
              <NavBtnLink to="/signup">Sign Up</NavBtnLink>
            </NavBtn>
            <NavBtn>
              <NavBtnLink to="/login">Log In</NavBtnLink>
            </NavBtn>
          </ContainerLogOut>
        )}

        {Parse.User.current() && (
          <>
            <NavMenu>
              <NavLink to="/ideas" activeStyle>
                Ideas
              </NavLink>
              <NavLink to="/articles" activeStyle>
                Articles
              </NavLink>
              <NavLink to="/staff" activeStyle>
                Staff
              </NavLink>
            </NavMenu>
            <NavBtn>
              <NavBtnLink onClick={handleSignOut} to="/">
                Sign Out
              </NavBtnLink>
            </NavBtn>
          </>
        )}
      </Nav>
    </>
  );
}
