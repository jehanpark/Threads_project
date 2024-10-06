import React from "react";
import styled from "styled-components";
import ActivityMenu from "../Components/Activity/Activitymenu";

const Border = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 10px 10px 0 10px;
  width: 680px;
  height: 898px;
  border-radius: 40px 40px 0px 0px;
  border: #c9c9c9;
  background: #f5f5f5;
`;
const Activity = () => {
  return (
    <div>
      <ActivityMenu />
      <Border></Border>
    </div>
  );
};

export default Activity;
