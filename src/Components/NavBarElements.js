import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Navigation = styled.nav`
  background: #8d519a;
  height: 128px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;

  font-size: 18px;
`;

export const NavigationLink = styled(Link)`
  color: #f5f4f5;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    font-weight: bold;
    text-decoration: underline;
    text-underline-offset: 0.6em;
  }
  &:hover {
    transition: all 0.2s ease-in-out;
    color: #4a1256;
    border-radius: 4px;
  }
`;

export const NavigationMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavigationBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const LogOutContainer = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  justify-content: flex-end;
  width: 100vw;
`;

export const NavigationBtnLink1 = styled(Link)`
  border-radius: 10px;
  background: #f5f4f5;
  padding: 10px 22px;
  color: #8d519a;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #4a1256;
    color: #f5f4f5;
  }
`;

export const NavigationBtnLink2 = styled(Link)`
  border-radius: 4px;
  background: #4a1256;
  padding: 10px 22px;
  color: #f5f4f5;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #f5f4f5;
    color: #8d519a;
  }
`;
