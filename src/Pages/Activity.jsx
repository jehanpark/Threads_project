import React from "react";
import Border from "../Components/Common/Border";
import styled from "styled-components";

const Contain = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 39px;
`;

const MenuTitle = styled.p`
  font-weight: 800;
  font-size: 20px;
  margin-bottom: 25px;
`;

const Activity = () => {
  return (
    <Contain>
      <MenuTitle>활동</MenuTitle>
      <Border type="borderWrapper"></Border>
    </Contain>
  );
};

export default Activity;
