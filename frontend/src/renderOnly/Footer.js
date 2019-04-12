import React from "react";
import styled from "styled-components";

const Logo = styled.h1`
  font-size: 2rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: ${props => props.theme.black};
    color: white;
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

// styled component styles for the navigation bar
const StyledNavbar = styled.header`
  .bar {
    border-bottom: 10px solid black;
    display: grid;
    text-align: center;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid grey;
  }
`;

const Footer = () => {
  return (
    <StyledNavbar>
      <Logo>
        <div className="bar footer-copyright text-center py-3">
          &copy; {new Date().getFullYear()} Copyright: Made by Prateek Madaan
        </div>
      </Logo>
    </StyledNavbar>
  );
};

export default Footer;
