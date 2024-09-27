import React from "react";
import Nav from "../Components/Nav";
import { BellIcon, SendIcon } from "../Components/Common/Icon";

const Home = () => {
  return (
    <div>
      <Nav />

      <BellIcon width={"70"} fill={"#fff"} />
      <SendIcon width={"200"} fill={"#fff"} />
    </div>
  );
};

export default Home;
