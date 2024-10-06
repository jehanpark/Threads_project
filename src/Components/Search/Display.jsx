import React, { useEffect, useState } from "react";
import Post from "../Post";
import styled from "styled-components";
import GlobalStyles, {
  lightTheme,
  darkTheme,
} from "../../styles/GlobalStyles.styles";
import { db } from "../../firebase";

const Display = () => {
  return (
    <div>
      <Post />
    </div>
  );
};

export default Display;
