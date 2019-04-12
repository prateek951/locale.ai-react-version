import React from 'react';
import Nav from "./Nav";
import styled from "styled-components";

//styled component styles for the Logo 

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-7deg);
  a {
    padding: 0.5rem 1rem;
    background: #0a12;
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
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
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
    border-bottom: 1px solid #012121;
  }
`;

const Navigation = props => {
  return (
    <StyledNavbar>
      <div className="bar">
        <Logo>
          <span>
            <a>Location Visualizer</a>
          </span>
        </Logo>
        <Nav />
      </div>
    </StyledNavbar>
  );
};

export default Navigation;
