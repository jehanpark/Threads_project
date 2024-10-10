import React, { useState, useRef, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import { ThemeContext } from "../Contexts/ThemeContext";
import { auth } from "../firebase";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  ArrowIcon,
  EtcIcon,
  FixIcon,
  ThemeLightIcon,
  ThemeDarkIcon,
} from "./Common/Icon";
import { motion } from "framer-motion";

const Aside = styled.aside`
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    display: none; // 768px 이상의 화면에서는 숨기기
  }
`;

const SetBtn = styled.button`
  width: 60px;
  height: 60px;
  box-shadow: ${(props) => props.theme.bordershadow};
  border: 2px solid ${(props) => props.theme.borderstroke};
  border-radius: 50%;
  cursor: pointer;
  background-color: ${(props) => props.theme.bodyBg};
  color: ${(props) => props.theme.fontcolor};
  font-size: 0.6rem;
`;

const PinBtn = styled.button`
  width: 60px;
  height: 60px;
  box-shadow: ${(props) => props.theme.bordershadow};
  border: 2px solid ${(props) => props.theme.borderstroke};
  border-radius: 50%;
  cursor: pointer;
  background-color: ${(props) => props.theme.bodyBg};
  color: ${(props) => props.theme.fontcolor};
  font-size: 0.6rem;
`;

// 왼쪽에서 오른쪽으로 슬라이드 인
const slideInFromLeft = keyframes`
  from {
    transform: translateX(-15%);
    opacity: 0.7;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// 오른쪽에서 왼쪽으로 슬라이드 인
const slideInFromRight = keyframes`
  from {
    transform: translateX(-5%);
    opacity: 0.7;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// shouldForwardProp으로 isThemeModal 필터링
const ModalContainer = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    prop !== "isThemeModal" && prop !== "isBackClick",
})`
  position: absolute;
  bottom: 0px;
  left: 0px;
  padding: 10px;
  width: 258px;
  background-color: ${(props) => props.theme.borderColor};
  color: ${({ theme }) => theme.fontcolor};
  box-shadow: ${(props) => props.theme.bordershadow};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  z-index: 100;
  animation: ${(props) =>
      props.isThemeModal && !props.isBackClick
        ? slideInFromRight
        : slideInFromLeft}
    0.2s ease forwards;
`;

const Ul = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Li = styled.li`
  width: 218px;
  height: 57px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-radius: 16px;
  transition: background 0.4s;
  &:hover {
    background-color: ${({ theme }) => theme.mouseHoverBg};
    color: ${({ theme }) => theme.mouseHoverFontcolor};
    font-weight: 700;
  }
`;

const ArrowIconWrapper = styled.div`
  transform: rotate(-180deg);
  margin-bottom: 5px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.fontcolor};
  text-align: left;
  cursor: pointer;
  padding-top: 10px;
  margin-bottom: 30px;
`;

const ThemeToggleBtnWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  background-color: ${(props) => props.theme.themeIconBackground};
  justify-content: space-between;
  border-radius: 12px;
  align-items: center;
  cursor: pointer;
`;

const ThemeToggleBtnBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  height: 40px;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
`;

const ToggleBackground = styled(motion.div)`
  width: 100%;
  height: 100%;
  border: 2px solid ${(props) => props.theme.themeIconBackground};
  background-color: ${(props) => props.theme.mouseHoverBg};
  border-radius: 12px;
  box-shadow: ${(props) => props.theme.bordershadow};
  position: absolute;
  z-index: 1;
`;

const Sidebar_de = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const [clicked, setClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBackClick, setIsBackClick] = useState(false);
  const modalRef = useRef(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
    setIsThemeModalOpen(false);
    setIsBackClick(false);
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("isDarkMode");
    if (savedDarkMode !== null) {
      setClicked(JSON.parse(savedDarkMode));
    }
  }, []);

  const handleThemeToggle = async () => {
    await toggleTheme();
    setClicked((prev) => !prev);
    localStorage.setItem("isDarkMode", JSON.stringify(!clicked));
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsThemeModalOpen(false);
  };

  const handleBackClick = () => {
    setIsBackClick(true);
    setTimeout(() => {
      setIsThemeModalOpen(false);
    }, 0);
  };

  const handleThemeModalOpen = () => {
    setIsBackClick(false);
    setIsThemeModalOpen(true);
  };

  const onLogOut = async () => {
    const ok = confirm("정말 로그아웃 하시겠습니까?");
    if (ok) {
      await auth.signOut();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  // 로그인 상태에 따라 ModalLists를 다르게 설정
  const ModalLists = currentUser
    ? ["디자인", "인사이트", "설정", "문제신고", "로그아웃"]
    : ["디자인", "인사이트", "문제신고", "로그인"];

  return (
    <Aside>
      <BtnWrapper>
        <PinBtn>
          <FixIcon fill={"#bababa"} />
        </PinBtn>
        <SetBtn onClick={openModal}>
          <EtcIcon fill={"#bababa"} />
        </SetBtn>
      </BtnWrapper>

      {isOpen && !isThemeModalOpen && (
        <ModalContainer ref={modalRef} isThemeModal={false}>
          <Ul>
            {ModalLists.map((ModalList, index) => (
              <Li
                key={index}
                onClick={() => {
                  if (index === 0) {
                    handleThemeModalOpen(); // 첫 번째 메뉴 클릭 시 테마 모달로 전환
                  } else if (ModalList === "로그아웃" && currentUser) {
                    onLogOut();
                    closeModal();
                  } else if (ModalList === "로그인" && !currentUser) {
                    navigate("/login");
                    closeModal();
                  } else if (ModalList === "인사이트") {
                    console.log("인사이트 클릭됨"); // 이 줄 추가
                    navigate("/insites"); // 인사이트 클릭 시 /insites로 이동
                    closeModal();
                  } else {
                    closeModal();
                  }
                }}
              >
                {ModalList}
                {index === 0 && (
                  <ArrowIconWrapper>
                    <ArrowIcon width={"8px"} fill={"#bababa"} />
                  </ArrowIconWrapper>
                )}
              </Li>
            ))}
          </Ul>
        </ModalContainer>
      )}
    </Aside>
  );
};

export default Sidebar_de;

// import React, { useState, useRef, useEffect, useContext } from "react";
// import styled, { keyframes } from "styled-components";
// import { Link, useNavigate } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";
// import { ThemeContext } from "../Contexts/ThemeContext";
// import Logo from "./Logo";

// import { LogoWrapper } from "./Login/RecycleStyles/login_de";

// import {
//   MagnifyingGlassIcon,
//   PlusIcon,
//   HeartIcon,
//   UserIcon1,
// } from "./Common/Icon";

// // ********************************* 스타일 정의 시작!*********************************

// const Aside = styled.aside`
//   position: fixed;
//   height: 100vh;
//   width: 80px;
//   background: #f9f9f9;
//   padding: 0 15px;
// `;

// const IconWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   top: 50%;
//   transform: translateY(100%);
//   gap: 20px;
// `;

// const BtnWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   position: fixed;
//   bottom: 20px;
//   gap: 20px;
//   @media (max-width: 768px) {
//     display: none; // 768px 이상의 화면에서는 숨기기
//   }
// `;

// const SetBtn = styled.button`
//   width: 50px;
//   height: 50px;
//   box-shadow: ${(props) => props.theme.bordershadow};
//   border: 2px solid ${(props) => props.theme.borderstroke};
//   /* border-color: ${(props) => props.theme.borderstroke};
//   border-style: none;
//   border-width: 1px; */
//   border-radius: 50%;
//   cursor: pointer;
//   background-color: ${(props) => props.theme.bodyBg};
//   color: ${(props) => props.theme.fontcolor};
// `;

// const PinBtn = styled.button`
//   width: 50px;
//   height: 50px;
//   box-shadow: ${(props) => props.theme.bordershadow};
//   border: 2px solid ${(props) => props.theme.borderstroke};

//   /* border-color: ${(props) => props.theme.borderstroke};
//   border-style: none; */
//   border-radius: 50%;
//   cursor: pointer;
//   background-color: ${(props) => props.theme.bodyBg};
//   color: ${(props) => props.theme.fontcolor};
// `;

// // 왼쪽에서 오른쪽으로 슬라이드 인
// const slideInFromLeft = keyframes`
//   from {
//     transform: translateX(-15%);
//     opacity: 0.7;
//   }
//   to {
//     transform: translateX(0);
//     opacity: 1;
//   }
// `;

// // 오른쪽에서 왼쪽으로 슬라이드 인
// const slideInFromRight = keyframes`
//   from {
//     transform: translateX(-5%);
//     opacity: 0.7;
//   }
//   to {
//     transform: translateX(0);
//     opacity: 1;
//   }
// `;

// // shouldForwardProp으로 isThemeModal 필터링
// // shouldForwardProp으로 isThemeModal과 isBackClick을 필터링하여 DOM 전달 방지
// const ModalContainer = styled.div.withConfig({
//   shouldForwardProp: (prop) =>
//     prop !== "isThemeModal" && prop !== "isBackClick",
// })`
//   position: absolute;
//   bottom: 0px;
//   left: 0px;
//   padding: 10px;
//   width: 258px;

//   height: 298px;

//   background-color: ${(props) => props.theme.borderColor};
//   color: ${({ theme }) => theme.textColor};
//   box-shadow: ${(props) => props.theme.bordershadow};
//   /* color: ${(props) => props.theme.fontcolor}; */

//   height: ${(props) => (props.isThemeModal ? "220px" : "298px")};
//   background-color: ${(props) => props.theme.borderColor};
//   color: ${(props) => props.theme.fontcolor};

//   border-radius: 10px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   text-align: left;
//   z-index: 100;
//   animation: ${(props) =>
//       props.isThemeModal && !props.isBackClick
//         ? slideInFromRight
//         : slideInFromLeft}
//     0.2s ease forwards;
// `;

// const Ul = styled.ul`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `;

// const Li = styled.li`
//   width: 218px;
//   height: 57px;
//   padding-left: 20px;
//   padding-right: 20px;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   cursor: pointer;
//   border-radius: 16px;
//   transition: background 0.4s;
//   &:hover {
//     background-color: ${({ theme }) => theme.mouseHoverBg};
//     color: ${({ theme }) => theme.mouseHoverFontcolor};
//     font-weight: 700;
//   }
// `;

// const Icon = styled.i`
//   display: inline-block;
//   width: 6px;
//   height: 11px;
//   border: 1px solid skyblue;
// `;

// // ThemeToggleButton에서 isDarkMode 필터링
// const ThemeToggleButton = styled.button.withConfig({
//   shouldForwardProp: (prop) => prop !== "isDarkMode", // isDarkMode를 DOM에 전달하지 않음
// })`
//   width: 100px;
//   height: 40px;
//   border-radius: 20px;
//   background-color: ${(props) => (props.isDarkMode ? "#333" : "#fff")};
//   color: ${(props) => (props.isDarkMode ? "#fff" : "#000")};
//   border: 1px solid #ccc;
//   cursor: pointer;
// `;

// const BackButton = styled.button`
//   background: none;
//   border: none;
//   color: ${(props) => props.theme.fontcolor};
//   cursor: pointer;
// `;
// // ********************************* 스타일 정의 끝 *********************************

// // 여기부터 Sidebar_de 본문!
// const Sidebar_de = () => {
//   const { toggleTheme } = useContext(ThemeContext);
//   const navigate = useNavigate();
//   const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
//   const [isOpen, setIsOpen] = useState(false);
//   const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [isBackClick, setIsBackClick] = useState(false); // 뒤로 가기 애니메이션 상태
//   const modalRef = useRef(null);

//   const openModal = () => {
//     setIsOpen(true);
//     setIsThemeModalOpen(false);
//     setIsBackClick(false); // 모달이 열릴 때는 기본 상태로 초기화
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//     setIsThemeModalOpen(false);
//   };

//   const handleBackClick = () => {
//     setIsBackClick(true); // 뒤로 가기 슬라이드 인 적용
//     setTimeout(() => {
//       setIsThemeModalOpen(false); // 테마 모달 닫고 기본 모달로 복귀
//     }, 0); // 즉시 테마 모달 닫기
//   };

//   const handleThemeModalOpen = () => {
//     setIsBackClick(false); // 테마 모달로 가는 슬라이드 인 설정
//     setIsThemeModalOpen(true); // 테마 모달 열기
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (modalRef.current && !modalRef.current.contains(event.target)) {
//         closeModal();
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [modalRef]);

//   const ModalLists = ["디자인", "인사이트", "설정", "문제신고", "로그아웃"];
//   // ********************************* 리턴문 구조 시작! *********************************
//   return (
//     <Aside>
//       <LogoWrapper isSmallScreen={isSmallScreen}>
//         <Logo width={40} />
//       </LogoWrapper>
//       <IconWrapper>
//         <MagnifyingGlassIcon width={40} />
//         <PlusIcon width={40} />
//         <HeartIcon width={40} />
//         <UserIcon1 width={40} />
//       </IconWrapper>
//       <BtnWrapper>
//         <PinBtn>PIN</PinBtn>
//         <SetBtn onClick={openModal}>SET</SetBtn>
//       </BtnWrapper>

//       {isOpen && !isThemeModalOpen && (
//         <ModalContainer ref={modalRef} isThemeModal={false}>
//           <Ul>
//             {ModalLists.map((ModalList, index) => (
//               <Li
//                 key={index}
//                 onClick={() => {
//                   if (index === 0) {
//                     handleThemeModalOpen(); // 첫 번째 메뉴 클릭 시 테마 모달로 전환
//                   } else {
//                     closeModal();
//                   }
//                 }}
//               >
//                 {ModalList}
//                 {index === 0 && <Icon />}
//               </Li>
//             ))}
//           </Ul>
//         </ModalContainer>
//       )}

//       {/* 테마 변경 모달 */}
//       {isThemeModalOpen && (
//         <ModalContainer
//           ref={modalRef}
//           isThemeModal={true}
//           isBackClick={isBackClick} // 뒤로 가기 애니메이션 구분
//         >
//           <BackButton onClick={handleBackClick}>{"< 뒤로 가기"}</BackButton>
//           <p>모드 변경</p>
//           <ThemeToggleButton isDarkMode={isDarkMode} onClick={toggleTheme}>
//             {isDarkMode ? "모드 변경" : "모드 변경"}
//           </ThemeToggleButton>
//         </ModalContainer>
//       )}
//     </Aside>
//   );
// };

// export default Sidebar_de;
