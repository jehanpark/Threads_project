import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";

const Box = styled(motion.div)`
  background: ${({ background }) => background || "rgba(255, 255, 255, 0.9)"};
  position: absolute;
  top: 0px;
  left: 0px;
  backdrop-filter: blur(13px); /* 배경 흐림 효과 추가 */
  /* filter: brightness(0.7) contrast(0.5) grayscale(0.1); */
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
}) => {
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
        />
      )}
    </AnimatePresence>
  );
};

export default ReportModal;
