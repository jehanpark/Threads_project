import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import Sidebar from "../Components/Sidebar";
import Insiteitem_de from "../Components/Login/Insiteitem_de";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const Insites = () => {
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 769px) and (max-width: 1024px)",
  });

  const { currentUser } = useAuth(); // 현재 사용자 상태를 가져옴
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login"); // "예"를 누르면 로그인 페이지로 이동
    } else {
      // navigate("/"); // "예"를 누르면 로그인 페이지로 이동
    }
  }, [currentUser, navigate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sidebar />
      <Insiteitem_de isSmallScreen={isSmallScreen} isTablet={isTablet} />
    </div>
  );
};

export default Insites;
