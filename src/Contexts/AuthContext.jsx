// contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { auth } from "../firebase";
import { Home } from "../Components/Common/Icon";
import {}

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 예를 들어, 데이터를 비동기로 가져오는 부분
    setTimeout(() => {
      setLoading(false); // 일정 시간이 지난 후 로딩 상태 해제
    }, 2000); // 2초 후에 로딩 상태를 false로 설정 (예시)
  }, []);

  // 로딩 중일 때
  if (loading) {
    return <div>Loading...</div>;
  }

  // 로딩이 끝나면 Home 컴포넌트로 이동
  return <Home />;
};

export default App;