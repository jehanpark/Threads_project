import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { CloseIcon } from "../Common/Icon";
import { FixIcon } from "../Common/Icon";

const Box = styled(motion.div)`
  z-index: 100;
  background: ${({ background }) => background || "rgba(255, 255, 255, 0.3)"};
  position: absolute;
  top: 0px;
  left: 0px;
  backdrop-filter: blur(13px); /* 배경 흐림 효과 추가 */
  /* filter: brightness(0.7) contrast(0.5) grayscale(0.1); */
`;

const CloseBtnWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseBtn = styled.div`
  width: 40px;
  height: 40px;
  position: absolute;
  left: 20px;
  top: 20px;
  border: 1px solid #ccc;
  border-radius: 50%;
  background-color: #f5f5f5;
`;

const ReportContents = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const TextAreaWrapper = styled.div`
  width: 370px;
  height: 220px;
  /* background-color: ${(props) => props.theme.btnBgColor}; */
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border-radius: 12px;
  /* border: 2px solid ${(props) => props.theme.borderstroke}; */
  border: 2px solid #e9e9e9;
  /* box-shadow: ${(props) => props.theme.bordershadow}; */
  box-shadow: 0 0 15px #c9c9c9;
  /* border: 1px solid skyblue; */
  padding: 5% 5%;
`;

const TextAreaTitle = styled.h1`
  text-align: center;
`;

const TextAreaForm = styled.form`
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
`;

const TextArea = styled.textarea`
  resize: none;
  outline: none;
  border: none;
  width: 100%;
  height: 80%;
  &:focus {
    outline: none;
  }
`;

const SubmitArea = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  label {
  }
`;

const SubmitAreaFile = styled.input`
  display: none;
`;

const SubmitAreaFileBtn = styled.span`
  background-color: transparent;
  cursor: pointer;
  /* border: 1px solid skyblue; */
`;

const SubmitAreaBtn = styled.input`
  background: none;
  cursor: pointer;
`;

const defaultVariants = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
    // rotateZ: 360,
  },
  leaving: {
    opacity: 0,
    y: 20,
  },
};

const ReportModal = ({
  width = "500px",
  height = "500px",
  background,
  borderRadius,
  variants = defaultVariants,
  initial = "initial",
  animate = "visible",
  exit = "leaving",
  isVisible = true,
  setShowing,
}) => {
  const placeholderText = "내용을 최대한 상세히 적어주세요.";
  const [placeholder, setPlaceholder] = useState(placeholderText);

  const stopPropGationFuc = (e, customFuc) => {
    e.stopPropagation();
    if (customFuc) {
      e.stopPropagation();
      customFuc();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <Box
          style={{ width, height }}
          background={background}
          borderRadius={borderRadius}
          variants={variants}
          initial={initial}
          animate={animate}
          exit={exit}
          onClick={() => {
            setShowing(false);
            setPlaceholder(placeholderText);
          }}
        >
          <CloseBtn
            onClick={() => {
              setShowing((current) => !current);
              setPlaceholder(placeholderText);
            }}
          >
            <CloseBtnWrapper>
              <CloseIcon fill={"#bababa"} />
            </CloseBtnWrapper>
          </CloseBtn>
          <ReportContents>
            <TextAreaTitle>문제 신고</TextAreaTitle>
            <TextAreaWrapper>
              <TextAreaForm onClick={(e) => stopPropGationFuc(e)}>
                <TextArea
                  placeholder={placeholder}
                  onClick={(e) => stopPropGationFuc(e)}
                ></TextArea>
                <SubmitArea>
                  <label>
                    <SubmitAreaFileBtn onClick={(e) => stopPropGationFuc(e)}>
                      <FixIcon width={"20px"} fill={"#bababa"} />
                    </SubmitAreaFileBtn>
                    <SubmitAreaFile
                      type="file"
                      onClick={(e) => stopPropGationFuc(e)}
                    />
                  </label>
                  <label>
                    <SubmitAreaBtn type="submit" />
                  </label>
                </SubmitArea>
              </TextAreaForm>
            </TextAreaWrapper>
          </ReportContents>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default ReportModal;
