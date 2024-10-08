import { useMediaQuery } from "react-responsive";
// import Sidebar from "../Components/Sidebar";
import Sidebar from "../Components/Sidebar";
import Insiteitem_de from "../Components/Login/Insiteitem_de"; // 추가된 부분

const Insites = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sidebar />
      <Insiteitem_de isSmallScreen={isSmallScreen} />
    </div>
  );
};

export default Insites;
